analytics = require './analytics'
Promise = require 'broken'

class Cart
  waits:    0
  queue:    null

  # referential tree with
  # order
  # user
  # payment
  # taxRates
  data:     null

  # hanzo.js client
  client:   null

  promise:  null
  reject:   null
  resolve:  null

  constructor: (@client, @data)->
    @queue  = []

  set: (id, quantity, locked=false)->
    @queue.push [id, quantity, locked]

    if @queue.length == 1
      @promise = new Promise (resolve, reject)=>
        @resolve = resolve
        @reject = reject
      @_set()

    return @promise

  _set: ->
    items = @data.get 'order.items'

    if @queue.length == 0
      @invoice()
      @resolve items if @resolve?
      return

    [id, quantity, locked] = @queue[0]

    # delete item
    if quantity == 0
      for item, i in items
        break if item.productId == id || item.productSlug == id || item.id == id

      if i < items.length
        items.splice i, 1

        analytics.track 'Removed Product',
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: item.quantity
          price: parseFloat(item.price / 100)

        @onUpdate item

      @queue.shift()
      @_set()
      return

    # try and update item quantity
    for item, i in items
      continue if item.id != id && item.productId != id && item.productSlug != id

      item.quantity = quantity
      item.locked = locked

      oldValue = item.quantity
      newValue = quantity

      deltaQuantity = newValue - oldValue
      if deltaQuantity > 0
        analytics.track 'Added Product',
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: deltaQuantity
          price: parseFloat(item.price / 100)
      else if deltaQuantity < 0
        analytics.track 'Removed Product',
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: deltaQuantity
          price: parseFloat(item.price / 100)

      @onUpdate item
      @queue.shift()
      @_set()
      return

    # Fetch up to date information at time of checkout openning
    # TODO: Think about revising so we don't report old prices if they changed after checkout is open

    items.push
      id:         id
      quantity:   quantity
      locked:     locked

    # waiting for response so don't update
    @waits++

    @load id

  load: (id) ->
    items = @data.get 'order.items'

    client.product.get id
      .then (product) =>
        @waits--
        for item, i in items
          if product.id == item.id || product.slug == item.id
            analytics.track 'Added Product',
              id: product.id
              sku: product.slug
              name: product.name
              quantity: item.quantity
              price: parseFloat(product.price / 100)

            @update product, item
            break
        @queue.shift()
        @_set()
      .catch (err) =>
        @waits--
        console.log "setItem Error: #{err}"
        @queue.shift()
        @_set()

  update: (product, item) ->
    delete item.id
    item.productId      = product.id
    item.productSlug    = product.slug
    item.productName    = product.name
    item.price          = product.price
    item.listPrice      = product.listPrice
    @onUpdate item

  # overwrite to add some behavior
  onUpdate: (item)->
    # mediator.trigger Events.UpdateItems
    # riot.update()

  # set / get a coupon
  promoCode: (promoCode) ->
    if promoCode?
      @invoice()

      return @client.coupon.get(promoCode).then (coupon)=>
        if coupon.enabled
          @data.set 'order.coupon', coupon
          @data.set 'order.couponCodes', [promoCode]
          if coupon.freeProductId != "" && coupon.freeQuantity > 0
            return @client.product.get(coupon.freeProductId).then((freeProduct)=>
              @invoice()
            ).catch (err)->
              throw new Error 'This coupon is invalid.'
          else
            @invoice()
            return
        else
          throw new Error 'This code is expired.'

    return @data.get 'order.promoCode'

  taxRates: (taxRates)->
    if taxRates?
      @data.set 'taxRates', taxRates
      @invoice()

    return @data.get 'taxRates'

  # update properties on data related to invoicing
  invoice: ()->
    items = @data.get 'order.items'
    # store.set 'items', items

    discount = 0
    coupon = @data.get 'order.coupon'

    if coupon?
      switch coupon.type
        when 'flat'
          if !coupon.productId? || coupon.productId == ''
            discount = (coupon.amount || 0)
          else
            for item in @data.get 'order.items'
              if item.productId == coupon.productId
                discount += (coupon.amount || 0) * item.quantity

        when 'percent'
          if !coupon.productId? || coupon.productId == ''
            for item in @data.get 'order.items'
              discount += (coupon.amount || 0) * item.price * item.quantity * 0.01
          else
            for item in @data.get 'order.items'
              if item.productId == coupon.productId
                discount += (coupon.amount || 0) * item.price * item.quantity * 0.01
          discount = Math.floor discount

    @data.set 'order.discount', discount

    items    =    @data.get 'order.items'
    subtotal =    -discount

    for item in items
      subtotal += item.price * item.quantity

    @data.set 'order.subtotal', subtotal

    taxRates = @data.get 'taxRates'
    if taxRates?
      for taxRateFilter in taxRates
        city = @data.get 'order.shippingAddress.city'
        if !city || (taxRateFilter.city? && taxRateFilter.city.toLowerCase() != city.toLowerCase())
          continue

        state = @data.get 'order.shippingAddress.state'
        if !state || (taxRateFilter.state? && taxRateFilter.state.toLowerCase() != state.toLowerCase())
          continue

        country = @data.get 'order.shippingAddress.country'
        if !country || (taxRateFilter.country? && taxRateFilter.country.toLowerCase() != country.toLowerCase())
          continue

        @data.set 'order.taxRate', taxRateFilter.taxRate
        break

    taxRate   = (@data.get 'order.taxRate') ? 0
    tax       = Math.ceil (taxRate ? 0) * subtotal

    shippingRate = (@data.get 'order.shippingRate') ? 0
    shipping = shippingRate

    @data.set 'order.shipping', shipping
    @data.set 'order.tax', tax
    @data.set 'order.total', subtotal + shipping + tax

  checkout: ()->
    # just to be sure
    @invoice()

    data =
      user:     @data.get 'user'
      order:    @data.get 'order'
      payment:  @data.get 'payment'

    return @client.checkout.authorize(data).then (order)=>
      @data.set 'coupon', @data.get('order.coupon') || {}
      @data.set 'order', order

      referralProgram = @data.get 'referralProgram'

      if referralProgram?
        @client.referrer.create(
          userId: data.order.userId
          orderId: data.order.orderId
          program: referralProgram
        ).then((referrer)=>
          @data.set 'referrerId', referrer.id
        ).catch (err)->
          window?.Raven?.captureException err
          console.log "new referralProgram Error: #{err}"

      p = @client.checkout.capture(order.id).then((order)=>
        @data.set 'order', order

        return order
      ).catch (err)->
        window?.Raven?.captureException err

      return { p: p }

module.exports = Cart


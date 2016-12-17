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

  cartPromise: null

  promise:  null
  reject:   null
  resolve:  null

  # function for calculating shipping
  shippingFn: ->

  constructor: (@client, @data, @shippingFn)->
    @queue = []
    @invoice()

  initCart: ->
    cartId = @data.get 'order.cartId'
    if !cartId and @client.cart?
      @client.cart.create().then (cart) =>
        @data.set 'order.cartId', cart.id

        items = @data.get 'order.items'

        for item, i in items
          @_cartSet item.productId, item.quantity

        @onCart cart.id
    else
      @onCart cartId

      items = @data.get 'order.items'

      for item, i in items
        @_cartSet item.productId, item.quantity
      @onCart cartId

  # fired when cart id is obtained
  onCart: (cartId) ->

  _cartSet: (id, quantity) ->
    cartId = @data.get 'order.cartId'
    if cartId && @client.cart?
      @client.cart.set
        id:           cartId
        productId:    id
        quantity:     quantity

  _cartUpdate: (cart) ->
    cartId = @data.get 'order.cartId'
    if cartId && @client.cart?
      cart.id = cartId
      @client.cart.update cart

  set: (id, quantity, locked=false) ->
    @queue.push [id, quantity, locked]

    if @queue.length == 1
      @promise = new Promise (resolve, reject) =>
        @resolve = resolve
        @reject = reject

      @_set()

    return @promise

  get: (id) ->
    items = @data.get 'order.items'
    for item, i in items
      continue if item.id != id && item.productId != id && item.productSlug != id
      return item

    for item, i in @queue
      continue if item[0] != id

      return {
        id: item[0]
        quantity: item[2]
        locked: item[3]
      }

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
        @data.set 'order.items', []
        items.splice i, 1
        @onUpdate()

        analytics.track 'Removed Product',
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: item.quantity
          price: parseFloat(item.price / 100)

        @data.set 'order.items', items
        @_cartSet item.productId, 0

        @onUpdate item

      @queue.shift()
      @_set()
      return

    # try and update item quantity
    for item, i in items
      continue if item.id != id && item.productId != id && item.productSlug != id

      oldValue = item.quantity

      item.quantity = quantity
      item.locked = locked

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

      @data.set 'order.items.' + i + '.quantity', quantity
      @data.set 'order.items.' + i + '.locked', locked
      @_cartSet item.productId, quantity

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
    @client.product.get id
      .then (product) =>
        @waits--

        items = @data.get 'order.items'

        for item, i in items
          if product.id == item.id || product.slug == item.id
            analytics.track 'Added Product',
              id: product.id
              sku: product.slug
              name: product.name
              quantity: item.quantity
              price: parseFloat(product.price / 100)

            @update product, item
            @data.set 'order.items.' + i, item
            @_cartSet product.id, item.quantity

            break
        @queue.shift()
        @_set()
      .catch (err) =>
        @waits--
        console.log "setItem Error: #{err.stack}"

        items = @data.get 'order.items'

        for item, i in items
          if item.id == id
            items.splice i, 1
            @data.set 'order.items', items
            break

        @queue.shift()
        @_set()

  refresh: (id)->
    items = @data.get 'order.items'

    @client.product.get id
      .then (product) =>
        @waits--
        for item, i in items
          if product.id == item.productId || product.slug == item.productSlug
            @update product, item
            break

        return items
      .catch (err) ->
        console.log "setItem Error: #{err}"

  update: (product, item) ->
    delete item.id
    item.productId      = product.id
    item.productSlug    = product.slug
    item.productName    = product.name
    item.price          = product.price
    item.listPrice      = product.listPrice
    item.description    = product.description

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
          @_cartUpdate
            coupon:         coupon
            couponCodes:    [promoCode]

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

  shippingRates: (shippingRates)->
    if shippingRates?
      @data.set 'shippingRates', shippingRates
      @invoice()

    return @data.get 'shippingRates'

  # update properties on data related to invoicing
  invoice: ()->
    items = @data.get 'order.items'

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
                quantity = item.quantity
                if coupon.once
                  quantity = 1
                discount += (coupon.amount || 0) * quantity

        when 'percent'
          if !coupon.productId? || coupon.productId == ''
            for item in @data.get 'order.items'
              quantity = item.quantity
              if coupon.once
                quantity = 1
              discount += (coupon.amount || 0) * item.price * quantity * 0.01
          else
            for item in @data.get 'order.items'
              if item.productId == coupon.productId
                quantity = item.quantity
                if coupon.once
                  quantity = 1
                discount += (coupon.amount || 0) * item.price * quantity * 0.01
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

    shippingRates = @data.get 'shippingRates'
    if shippingRates?
      for shippingRateFilter in shippingRates
        city = @data.get 'order.shippingAddress.city'
        if !city || (shippingRateFilter.city? && shippingRateFilter.city.toLowerCase() != city.toLowerCase())
          continue

        state = @data.get 'order.shippingAddress.state'
        if !state || (shippingRateFilter.state? && shippingRateFilter.state.toLowerCase() != state.toLowerCase())
          continue

        country = @data.get 'order.shippingAddress.country'
        if !country || (shippingRateFilter.country? && shippingRateFilter.country.toLowerCase() != country.toLowerCase())
          continue

        @data.set 'order.shippingRate', shippingRateFilter.shippingRate
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

      # capture
      p = @client.checkout.capture(order.id).then((order)=>
        @data.set 'order', order
        return order
      ).catch (err)->
        window?.Raven?.captureException err
        console.log "capture Error: #{err}"

      # create referrer token
      referralProgram = @data.get 'referralProgram'

      if referralProgram?
        p2 = @client.referrer.create(
          userId: data.order.userId
          orderId: data.order.orderId
          program: referralProgram
          programId: @data.get 'referralProgram.id'
        ).catch (err)->
          window?.Raven?.captureException err
          console.log "new referralProgram Error: #{err}"

        p = Promise.settle([p, p2]
        ).then((pis)=>
          order = pis[0].value
          referrer = pis[1].value
          @data.set 'referrerId', referrer.id
          return order
        ).catch (err)->
          window?.Raven?.captureException err
          console.log "order/referralProgram Error: #{err}"

      # fire off analytics
      options =
        orderId:  @data.get 'order.id'
        total:    parseFloat(@data.get('order.total') /100),
        # revenue: parseFloat(order.total/100),
        shipping: parseFloat(@data.get('order.shipping') /100),
        tax:      parseFloat(@data.get('order.tax') /100),
        discount: parseFloat(@data.get('order.discount') /100),
        coupon:   @data.get('order.couponCodes.0') || '',
        currency: @data.get('order.currency'),
        products: []

      for item, i in @data.get 'order.items'
        options.products[i] =
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: item.quantity
          price: parseFloat(item.price / 100)

      analytics.track 'Completed Order', options

      return { p: p }

module.exports = Cart


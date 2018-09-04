import analytics from './analytics'
import Promise   from 'broken'

import { closestGeoRate } from './util'

class Cart
  waits: 0
  queue: null

  # referential tree with
  # order
  # user
  # payment
  # taxRates
  data:    null

  # hanzo.js client
  client:  null

  promise: null
  reject:  null
  resolve: null

  opts: {
    # analyticsProductTransform: Takes analytics product info and transforms it.
    # storeId: ''
  }

  constructor: (@client, @data, @opts={})->
    @queue = []

    @data.on 'set', (name)=>
      switch name
        when 'order.mode'
          if @inItemlessMode()
            @clear()

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

      @data.on 'set', (name)=>
        switch name
          when 'order.storeId'
            @_cartSyncStore()

    else if @client.cart?
      @onCart cartId

      items = @data.get 'order.items'

      for item, i in items
        @_cartSet item.productId, item.quantity
      @onCart cartId

      @data.on 'set', (name)=>
        @_cartSyncStore() if name == 'order.storeId'
        @_cartSyncName() if name == 'user.firstName'
        @_cartSyncName() if name == 'user.lastName'

  inItemlessMode: ()->
    mode = @data.get('order.mode')
    return mode == 'deposit' || mode == 'contribution'

  # fired when cart id is obtained
  onCart: (cartId) ->

  _cartSet: (id, quantity) ->
    cartId = @data.get 'order.cartId'
    if cartId && @client.cart?
      @client.cart.set
        id:           cartId
        productId:    id
        quantity:     quantity
        storeId:      @data.get 'order.storeId'

  _cartUpdate: (cart) ->
    cartId = @data.get 'order.cartId'
    if cartId && @client.cart?
      cart.id = cartId
      @client.cart.update cart

  _cartSyncStore: ()->
    cartId = @data.get 'order.cartId'
    if cartId && @client.cart?
      @client.cart.update
        id:      cartId
        storeId: @data.get 'order.storeId'

  clear: ()->
    @queue.length = 0
    items = @data.get 'order.items'
    for item in items
      @set item.productId, 0
    return @data.get 'order.items'

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
      @resolve items ? [] if @resolve?
      return

    [id, quantity, locked] = @queue[0]

    if @inItemlessMode() && quantity > 0
      @invoice()
      @resolve items ? [] if @resolve?
      return

    # handle negative quantities.
    if quantity < 0
      quantity = 0

    # delete item
    if quantity == 0
      for item, i in items
        break if item.productId == id || item.productSlug == id || item.id == id

      if i < items.length
        @data.set 'order.items', []
        items.splice i, 1
        @onUpdate()

        a =
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: item.quantity
          price: parseFloat(item.price / 100)

        a = @opts.analyticsProductTransform(a) if @opts.analyticsProductTransform?
        analytics.track 'Removed Product', a

        @data.set 'order.items', items
        @_cartSet item.productId, 0

        item.quantity = 0
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
        a =
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: deltaQuantity
          price: parseFloat(item.price / 100)
        a = @opts.analyticsProductTransform(a) if @opts.analyticsProductTransform?
        analytics.track 'Added Product', a
      else if deltaQuantity < 0
        a =
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: deltaQuantity
          price: parseFloat(item.price / 100)
        a = @opts.analyticsProductTransform(a) if @opts.analyticsProductTransform?
        analytics.track 'Removed Product', a

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
            a =
              id: product.id
              sku: product.slug
              name: product.name
              quantity: item.quantity
              price: parseFloat(product.price / 100)
              isSubscribeable: item.isSubscribeable
              interval: item.interval
              intervalCount: item.IntervalCount

            a = @opts.analyticsProductTransform(a) if @opts.analyticsProductTransform?
            analytics.track 'Added Product', a

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

  refresh: (id) ->
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
  onUpdate: (item) ->
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

  taxRates: (taxRates) ->
    if taxRates?
      @data.set 'taxRates', taxRates
      @invoice()

    return @data.get 'taxRates'

  shippingRates: (shippingRates) ->
    if shippingRates?
      @data.set 'shippingRates', shippingRates
      @invoice()

    return @data.get 'shippingRates'

  # update properties on data related to invoicing
  invoice: ->
    # handle deposit and contribution mode which ignore items
    if @inItemlessMode()
      subtotal = @data.get('order.subtotal') ? 0
      @data.set 'order.subtotal', subtotal
      @data.set 'order.total', subtotal
      return

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
    rate = @data.get 'order.taxRate'
    if !rate?
      rate = { percent: 0, cost: 0 }
      @data.set 'order.taxRate', rate

    if taxRates?
      country = @data.get 'order.shippingAddress.country'
      state = @data.get 'order.shippingAddress.state'
      city = @data.get 'order.shippingAddress.city'
      postalCode = @data.get 'order.shippingAddress.postalCode'

      [gr, l, i] = closestGeoRate(taxRates.geoRates, country, state, city, postalCode)
      if !gr?
        gr = rate
      @data.set 'order.taxRate', gr

    shippingRates = @data.get 'shippingRates'
    rate = @data.get 'order.shippingRate'
    if !rate?
      rate = { percent: 0, cost: 0 }
      @data.set 'order.shippingRate', rate

    if shippingRates?
      country = @data.get 'order.shippingAddress.country'
      state = @data.get 'order.shippingAddress.state'
      city = @data.get 'order.shippingAddress.city'
      postalCode = @data.get 'order.shippingAddress.postalCode'

      [gr, l, i] = closestGeoRate(shippingRates.geoRates, country, state, city, postalCode)
      if !gr?
        gr = rate
      @data.set 'order.shippingRate', gr

    taxRate   = (@data.get 'order.taxRate') ? { percent: 0, cost: 0 }
    tax       = Math.ceil (taxRate.percent ? 0) * subtotal + (taxRate.cost ? 0)

    shippingRate    = (@data.get 'order.shippingRate') ? { percent: 0, cost: 0 }
    shipping        = Math.ceil (shippingRate.percent ? 0) * subtotal + (shippingRate.cost ? 0)

    @data.set 'order.shipping', shipping
    @data.set 'order.tax', tax
    @data.set 'order.total', subtotal + shipping + tax

  checkout: ->
    # just to be sure
    @invoice()

    data =
      user:     @data.get 'user'
      order:    @data.get 'order'
      payment:  @data.get 'payment'

    return @client.checkout.authorize(data).then (order)=>
      @data.set 'coupon', @data.get('order.coupon') || {}
      # save items because descriptions and metadata are stored on them
      items = (@data.get('order.items') ? []).slice(0)

      @data.set 'order', order

      # ensure descriptions are preserved
      @data.set 'order.items', items

      if order.type == 'ethereum' || order.type == 'bitcoin'
        # ignore checkout
        p = new Promise (resolve)->
          resolve(order)
      else
        # capture
        p = @client.checkout.capture(order.id).then((order)=>
          # save items because descriptions and metadata are stored on them
          items = @data.get('order.items').slice(0)

          @data.set 'order', order

          # ensure descriptions are preserved
          @data.set 'order.items', items
          @invoice()
          return order
        ).catch (err)->
          window?.Raven?.captureException err
          console.log "capture Error: #{err}"

      # create referrer token
      referralProgram = @data.get 'referralProgram'

      if referralProgram?
        p2 = @client.referrer.create(
          userId: @data.get 'order.userId'
          orderId: @data.get 'order.id'
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
        a =
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: item.quantity
          price: parseFloat(item.price / 100)

        a = @opts.analyticsProductTransform(a) if @opts.analyticsProductTransform?
        options.products[i] = a
      analytics.track 'Completed Order', options

      return { p: p }

export default Cart

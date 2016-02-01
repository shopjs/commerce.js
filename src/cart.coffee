class Cart
  @waits: 0
  queue: null

  # referential tree for an order
  @data: null

  constructor: (@data)->
    @queue  = []

  set: (id, quantity, locked=false)->
    @queue.push [id, quantity, locked]

    if @queue.length == 1
      @_set()

  _set: ->
    items = @data.get 'items'

    if @queue.length == 0
      return

    [id, quantity, locked] = @queue.shift()

    # delete item
    if quantity == 0
      for item, i in items
        break if item.productId == id || item.productSlug == id || item.id == id

      if i < items.length
        # Do this until there is a riot version that fixes loops and riot.upate
        items[i].quantity = 0
        #items.splice i, 1

        analytics.track 'Removed Product',
          id: item.productId
          sku: item.productSlug
          name: item.productName
          quantity: item.quantity
          price: parseFloat(item.price / 100)

        @onUpdate item
      @set()
      return

    # try and update item quantity
    for item, i in items
      continue if item.productId != id && item.productSlug != id

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
      @set()
      return

    # Fetch up to date information at time of checkout openning
    # TODO: Think about revising so we don't report old prices if they changed after checkout is open

    items.push
      id:         id
      quantity:   quantity
      locked:     locked

    # waiting for response so don't update
    @waits++

    @reload id

  reload: (id) ->
    items = @data.get 'items'

    client.product.get id
      .then (product) ->
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
        @set()
      .catch (err) ->
        @waits--
        console.log "setItem Error: #{err}"
        @set()

  update: (product, item) ->
    item.id             = undefined
    item.productId      = product.id
    item.productSlug    = product.slug
    item.productName    = product.name
    item.price          = product.price
    item.listPrice      = product.listPrice
    @onUpdate item

  # overwrite
  onUpdate: (item)->
    # @mediator.trigger Events.UpdateItems
    # riot.update()

  invoice: ()->
    items = @data.get 'items'
    # store.set 'items', items

    discount = 0
    coupon = @data.get 'coupon'

    if coupon?
      switch coupon.type
        when 'flat'
          if !coupon.productId? || coupon.productId == ''
            discount = (coupon.amount || 0)
          else
            for item in @data.get 'items'
              if item.productId == coupon.productId
                discount += (coupon.amount || 0) * item.quantity

        when 'percent'
          if !coupon.productId? || coupon.productId == ''
            for item in @data.get 'items'
              discount += (coupon.amount || 0) * item.price * item.quantity * 0.01
          else
            for item in @data.get 'items'
              if item.productId == coupon.productId
                discount += (coupon.amount || 0) * item.price * item.quantity * 0.01
          discount = Math.floor discount

    @data.set 'discount', discount

    items    =    @data.get 'items'
    subtotal =    -discount

    for item in items
      subtotal += item.price * item.quantity

    @data.set 'subtotal', subtotal

    for taxRateFilter in @data.get 'taxRates'
      city = @data.get 'shippingAddress.city'
      if !city || (taxRateFilter.city? && taxRateFilter.city.toLowerCase() != city.toLowerCase())
        continue

      state = @data.get 'shippingAddress.state'
      if !state || (taxRateFilter.state? && taxRateFilter.state.toLowerCase() != state.toLowerCase())
        continue

      country = @data.get 'shippingAddress.country'
      if !country || (taxRateFilter.country? && taxRateFilter.country.toLowerCase() != country.toLowerCase())
        continue

      @data.set 'taxRate', taxRateFilter.taxRate
      break

    taxRate   = (@data.get 'taxRate') ? 0
    tax       = Math.ceil (taxRate ? 0) * subtotal

    shippingRate = (@data.get 'shippingRate') ? 0
    shipping = shippingRate

    @data.set 'shipping', shipping
    @data.set 'tax', tax
    @data.set 'total', subtotal + shipping + tax

module.exports = Cart


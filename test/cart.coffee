refer = require 'referential'
Cart = require '../lib/cart'
{expect} = require 'chai'

describe 'Cart', ->
  @timeout 45000
  describe 'constructor', ->
    it 'should construct', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      cart.client.should.eql client
      cart.data.should.eql data

  describe 'set', ->
    it 'should set an item by id', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      items = yield cart.set 'dZc6BopOFA5Xvd', 1
      items.length.should.eq 1
      item = items[0]
      item.productId.should.eq 'dZc6BopOFA5Xvd'
      item.productSlug.should.eq 'sad-keanu-shirt'
      item.quantity.should.eq 1

      order = data.get 'order'
      order.total.should.eq item.price * item.quantity

    it 'should set an item by slug', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      items.length.should.eq 1
      item = items[0]
      item.productId.should.eq 'dZc6BopOFA5Xvd'
      item.productSlug.should.eq 'sad-keanu-shirt'
      item.quantity.should.eq 1

      order = data.get 'order'
      order.total.should.eq item.price * item.quantity

    it 'should overwrite an existing item', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      cart.set 'sad-keanu-shirt', 1
      items = yield cart.set 'sad-keanu-shirt', 2

      items.length.should.eq 1
      item = items[0]
      item.productId.should.eq 'dZc6BopOFA5Xvd'
      item.productSlug.should.eq 'sad-keanu-shirt'
      item.quantity.should.eq 2

      order = data.get 'order'
      order.total.should.eq item.price * item.quantity

    # exclusively for testing internal set implementation
    it 'should handle executing multiple yielded sets', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      items.length.should.eq 1
      item = items[0]
      item.productId.should.eq 'dZc6BopOFA5Xvd'
      item.productSlug.should.eq 'sad-keanu-shirt'
      item.quantity.should.eq 1

      items = yield cart.set 'sad-keanu-shirt', 2
      items.length.should.eq 1
      item = items[0]
      item.productId.should.eq 'dZc6BopOFA5Xvd'
      item.productSlug.should.eq 'sad-keanu-shirt'
      item.quantity.should.eq 2

      order = data.get 'order'
      order.total.should.eq item.price * item.quantity

    it 'should delete an existing item by setting quantity to 0', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data
      cart.set 'sad-keanu-shirt', 1
      items = yield cart.set 'sad-keanu-shirt', 0

      items.length.should.eq 0

      order = data.get 'order'
      order.total.should.eq 0

  # invoice is updated whenever anything changes
  describe 'invoice & taxRates', ->
    it 'should use order.taxRate', ->
      data = refer
        order:
          currency: 'usd'
          items: []
          taxRate: 1

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      order = data.get 'order'
      order.total.should.eq item.price * item.quantity + order.taxRate * item.price

    it 'should use taxRates filter with shippingAddress with correct city', ->
      data = refer
        order:
          currency: 'usd'
          items: []
          shippingAddress:
            city:       'san francisco'
            state:      'ca'
            country:    'us'
        taxRates: [
          {
            city:       'san francisco'
            state:      'ca'
            country:    'us'
            taxRate:    .0875
          }
          {
            state:      'ca'
            country:    'us'
            taxRate:    .075
          }
          {
            country:    'us'
            taxRate:    1
          }
        ]

      cart = new Cart client, data
      cart.shippingAddress

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      order = data.get 'order'
      order.total.should.eq Math.ceil(item.price * item.quantity + .0875 * item.price)

    it 'should use taxRates filter with shippingAddress with correct state', ->
      data = refer
        order:
          currency: 'usd'
          items: []
          shippingAddress:
            city:       'sacramento'
            state:      'ca'
            country:    'us'
        taxRates: [
          {
            city:       'san francisco'
            state:      'ca'
            country:    'us'
            taxRate:    .08750
          }
          {
            state:      'ca'
            country:    'us'
            taxRate:    .075
          }
          {
            country:    'us'
            taxRate:    1
          }
        ]

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      order = data.get 'order'
      order.total.should.eq Math.ceil(item.price * item.quantity + .075 * item.price)

    it 'should use taxRates filter with shippingAddress with correct state', ->
      data = refer
        order:
          currency: 'usd'
          items: []
          shippingAddress:
            city:       'kansas city'
            state:      'mo'
            country:    'us'
        taxRates: [
          {
            city:       'san francisco'
            state:      'ca'
            country:    'us'
            taxRate:    .08750
          }
          {
            state:      'ca'
            country:    'us'
            taxRate:    .075
          }
          {
            country:    'us'
            taxRate:    1
          }
        ]

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      order = data.get 'order'
      order.total.should.eq Math.ceil(item.price * item.quantity + 1 * item.price)

  # invoice is updated whenever anything changes
  describe 'invoice & promoCode', ->
    it 'should use coupon codes', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      yield cart.promoCode 'SAD-COUPON'

      order = data.get 'order'
      order.total.should.eq Math.ceil item.price * item.quantity - 500

    it 'should not use invalid coupon codes', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      failed = false
      yield cart.promoCode('BAD-COUPON').catch ()->
        failed = true

      failed.should.be.true

  describe 'checkout', ->
    it 'should checkout an order', ->
      data = refer
        user:
          email:        'test@hanzo.io'
          firstName:    'test'
          lastName:     'test'
        order:
          currency: 'usd'
          items: []
          shippingAddress:
            line1:      'somewhere'
            city:       'kansas city'
            state:      'mo'
            postalCode: '64081'
            country:    'us'
        payment:
          account:
            number: '4242424242424242'
            cvc:    '424'
            month:  '1'
            year:   '2020'

      cart = new Cart client, data

      items = yield cart.set 'sad-keanu-shirt', 1
      item = items[0]
      item.quantity.should.eq 1

      checkoutPRef = yield cart.checkout()
      order = yield checkoutPRef.p
      expect(order.id).to.exist

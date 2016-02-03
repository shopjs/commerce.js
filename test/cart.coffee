refer = require 'referential'
Cart = require '../lib/cart'

describe 'Cart', ->
  @timeout 2000
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

    it 'should delete an existing item by setting quantity to 0', ->
      data = refer
        order:
          currency: 'usd'
          items: []

      cart = new Cart client, data
      cart.set 'sad-keanu-shirt', 1
      items = yield cart.set 'sad-keanu-shirt', 0

      items.length.should.eq 0

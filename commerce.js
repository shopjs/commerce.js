(function (global) {
  var process = {
    title: 'browser',
    browser: true,
    env: {},
    argv: [],
    nextTick: function (fn) {
      setTimeout(fn, 0)
    },
    cwd: function () {
      return '/'
    },
    chdir: function () {
    }
  };
  // Require module
  function require(file, cb) {
    if ({}.hasOwnProperty.call(require.cache, file))
      return require.cache[file];
    // Handle async require
    if (typeof cb == 'function') {
      require.load(file, cb);
      return
    }
    var resolved = require.resolve(file);
    if (!resolved)
      throw new Error('Failed to resolve module ' + file);
    var module$ = {
      id: file,
      require: require,
      filename: file,
      exports: {},
      loaded: false,
      parent: null,
      children: []
    };
    var dirname = file.slice(0, file.lastIndexOf('/') + 1);
    require.cache[file] = module$.exports;
    resolved.call(module$.exports, module$, module$.exports, dirname, file);
    module$.loaded = true;
    return require.cache[file] = module$.exports
  }
  require.modules = {};
  require.cache = {};
  require.resolve = function (file) {
    return {}.hasOwnProperty.call(require.modules, file) ? require.modules[file] : void 0
  };
  // define normal static module
  require.define = function (file, fn) {
    require.modules[file] = fn
  };
  require.waiting = {};
  // define async module
  require.async = function (url, fn) {
    require.modules[url] = fn;
    var cb;
    while (cb = require.waiting[url].shift())
      cb(require(url))
  };
  // Load module async module
  require.load = function (url, cb) {
    var script = document.createElement('script'), existing = document.getElementsByTagName('script')[0], callbacks = require.waiting[url] = require.waiting[url] || [];
    // We'll be called when async module is defined.
    callbacks.push(cb);
    // Load module
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    existing.parentNode.insertBefore(script, existing)
  };
  // source: src/cart.coffee
  require.define('./cart', function (module, exports, __dirname, __filename) {
    var Cart, Promise, analytics;
    analytics = require('./analytics');
    Promise = require('broken/lib');
    Cart = function () {
      Cart.prototype.waits = 0;
      Cart.prototype.queue = null;
      Cart.prototype.data = null;
      Cart.prototype.client = null;
      Cart.prototype.promise = null;
      Cart.prototype.reject = null;
      Cart.prototype.resolve = null;
      function Cart(client1, data1) {
        this.client = client1;
        this.data = data1;
        this.queue = [];
        this.invoice()
      }
      Cart.prototype.set = function (id, quantity, locked) {
        if (locked == null) {
          locked = false
        }
        this.queue.push([
          id,
          quantity,
          locked
        ]);
        if (this.queue.length === 1) {
          this.promise = new Promise(function (_this) {
            return function (resolve, reject) {
              _this.resolve = resolve;
              return _this.reject = reject
            }
          }(this));
          this._set()
        }
        return this.promise
      };
      Cart.prototype._set = function () {
        var deltaQuantity, i, id, item, items, j, k, len, len1, locked, newValue, oldValue, quantity, ref;
        items = this.data.get('order.items');
        if (this.queue.length === 0) {
          this.invoice();
          if (this.resolve != null) {
            this.resolve(items)
          }
          return
        }
        ref = this.queue[0], id = ref[0], quantity = ref[1], locked = ref[2];
        if (quantity === 0) {
          for (i = j = 0, len = items.length; j < len; i = ++j) {
            item = items[i];
            if (item.productId === id || item.productSlug === id || item.id === id) {
              break
            }
          }
          if (i < items.length) {
            items.splice(i, 1);
            analytics.track('Removed Product', {
              id: item.productId,
              sku: item.productSlug,
              name: item.productName,
              quantity: item.quantity,
              price: parseFloat(item.price / 100)
            });
            this.onUpdate(item)
          }
          this.queue.shift();
          this._set();
          return
        }
        for (i = k = 0, len1 = items.length; k < len1; i = ++k) {
          item = items[i];
          if (item.id !== id && item.productId !== id && item.productSlug !== id) {
            continue
          }
          oldValue = item.quantity;
          item.quantity = quantity;
          item.locked = locked;
          newValue = quantity;
          deltaQuantity = newValue - oldValue;
          if (deltaQuantity > 0) {
            analytics.track('Added Product', {
              id: item.productId,
              sku: item.productSlug,
              name: item.productName,
              quantity: deltaQuantity,
              price: parseFloat(item.price / 100)
            })
          } else if (deltaQuantity < 0) {
            analytics.track('Removed Product', {
              id: item.productId,
              sku: item.productSlug,
              name: item.productName,
              quantity: deltaQuantity,
              price: parseFloat(item.price / 100)
            })
          }
          this.onUpdate(item);
          this.queue.shift();
          this._set();
          return
        }
        items.push({
          id: id,
          quantity: quantity,
          locked: locked
        });
        this.waits++;
        return this.load(id)
      };
      Cart.prototype.load = function (id) {
        var items;
        items = this.data.get('order.items');
        return client.product.get(id).then(function (_this) {
          return function (product) {
            var i, item, j, len;
            _this.waits--;
            for (i = j = 0, len = items.length; j < len; i = ++j) {
              item = items[i];
              if (product.id === item.id || product.slug === item.id) {
                analytics.track('Added Product', {
                  id: product.id,
                  sku: product.slug,
                  name: product.name,
                  quantity: item.quantity,
                  price: parseFloat(product.price / 100)
                });
                _this.update(product, item);
                break
              }
            }
            _this.queue.shift();
            return _this._set()
          }
        }(this))['catch'](function (_this) {
          return function (err) {
            _this.waits--;
            void 0;
            _this.queue.shift();
            return _this._set()
          }
        }(this))
      };
      Cart.prototype.update = function (product, item) {
        delete item.id;
        item.productId = product.id;
        item.productSlug = product.slug;
        item.productName = product.name;
        item.price = product.price;
        item.listPrice = product.listPrice;
        return this.onUpdate(item)
      };
      Cart.prototype.onUpdate = function (item) {
      };
      Cart.prototype.promoCode = function (promoCode) {
        if (promoCode != null) {
          this.invoice();
          return this.client.coupon.get(promoCode).then(function (_this) {
            return function (coupon) {
              if (coupon.enabled) {
                _this.data.set('order.coupon', coupon);
                _this.data.set('order.couponCodes', [promoCode]);
                if (coupon.freeProductId !== '' && coupon.freeQuantity > 0) {
                  return _this.client.product.get(coupon.freeProductId).then(function (freeProduct) {
                    return _this.invoice()
                  })['catch'](function (err) {
                    throw new Error('This coupon is invalid.')
                  })
                } else {
                  _this.invoice()
                }
              } else {
                throw new Error('This code is expired.')
              }
            }
          }(this))
        }
        return this.data.get('order.promoCode')
      };
      Cart.prototype.taxRates = function (taxRates) {
        if (taxRates != null) {
          this.data.set('taxRates', taxRates);
          this.invoice()
        }
        return this.data.get('taxRates')
      };
      Cart.prototype.invoice = function () {
        var city, country, coupon, discount, item, items, j, k, l, len, len1, len2, len3, len4, m, n, ref, ref1, ref2, ref3, ref4, shipping, shippingRate, state, subtotal, tax, taxRate, taxRateFilter, taxRates;
        items = this.data.get('order.items');
        discount = 0;
        coupon = this.data.get('order.coupon');
        if (coupon != null) {
          switch (coupon.type) {
          case 'flat':
            if (coupon.productId == null || coupon.productId === '') {
              discount = coupon.amount || 0
            } else {
              ref = this.data.get('order.items');
              for (j = 0, len = ref.length; j < len; j++) {
                item = ref[j];
                if (item.productId === coupon.productId) {
                  discount += (coupon.amount || 0) * item.quantity
                }
              }
            }
            break;
          case 'percent':
            if (coupon.productId == null || coupon.productId === '') {
              ref1 = this.data.get('order.items');
              for (k = 0, len1 = ref1.length; k < len1; k++) {
                item = ref1[k];
                discount += (coupon.amount || 0) * item.price * item.quantity * 0.01
              }
            } else {
              ref2 = this.data.get('order.items');
              for (l = 0, len2 = ref2.length; l < len2; l++) {
                item = ref2[l];
                if (item.productId === coupon.productId) {
                  discount += (coupon.amount || 0) * item.price * item.quantity * 0.01
                }
              }
            }
            discount = Math.floor(discount)
          }
        }
        this.data.set('order.discount', discount);
        items = this.data.get('order.items');
        subtotal = -discount;
        for (m = 0, len3 = items.length; m < len3; m++) {
          item = items[m];
          subtotal += item.price * item.quantity
        }
        this.data.set('order.subtotal', subtotal);
        taxRates = this.data.get('taxRates');
        if (taxRates != null) {
          for (n = 0, len4 = taxRates.length; n < len4; n++) {
            taxRateFilter = taxRates[n];
            city = this.data.get('order.shippingAddress.city');
            if (!city || taxRateFilter.city != null && taxRateFilter.city.toLowerCase() !== city.toLowerCase()) {
              continue
            }
            state = this.data.get('order.shippingAddress.state');
            if (!state || taxRateFilter.state != null && taxRateFilter.state.toLowerCase() !== state.toLowerCase()) {
              continue
            }
            country = this.data.get('order.shippingAddress.country');
            if (!country || taxRateFilter.country != null && taxRateFilter.country.toLowerCase() !== country.toLowerCase()) {
              continue
            }
            this.data.set('order.taxRate', taxRateFilter.taxRate);
            break
          }
        }
        taxRate = (ref3 = this.data.get('order.taxRate')) != null ? ref3 : 0;
        tax = Math.ceil((taxRate != null ? taxRate : 0) * subtotal);
        shippingRate = (ref4 = this.data.get('order.shippingRate')) != null ? ref4 : 0;
        shipping = shippingRate;
        this.data.set('order.shipping', shipping);
        this.data.set('order.tax', tax);
        return this.data.set('order.total', subtotal + shipping + tax)
      };
      Cart.prototype.checkout = function () {
        var data;
        this.invoice();
        data = {
          user: this.data.get('user'),
          order: this.data.get('order'),
          payment: this.data.get('payment')
        };
        return this.client.checkout.authorize(data).then(function (_this) {
          return function (order) {
            var i, item, j, len, options, p, ref, referralProgram;
            _this.data.set('coupon', _this.data.get('order.coupon') || {});
            _this.data.set('order', order);
            p = _this.client.checkout.capture(order.id).then(function (order) {
              _this.data.set('order', order);
              return order
            })['catch'](function (err) {
              var ref;
              if (typeof window !== 'undefined' && window !== null) {
                if ((ref = window.Raven) != null) {
                  ref.captureException(err)
                }
              }
              return void 0
            });
            referralProgram = _this.data.get('referralProgram');
            if (referralProgram != null) {
              _this.client.referrer.create({
                userId: data.order.userId,
                orderId: data.order.orderId,
                program: referralProgram
              }).then(function (referrer) {
                return _this.data.set('referrerId', referrer.id)
              })['catch'](function (err) {
                var ref;
                if (typeof window !== 'undefined' && window !== null) {
                  if ((ref = window.Raven) != null) {
                    ref.captureException(err)
                  }
                }
                return void 0
              })
            }
            options = {
              orderId: _this.data.get('order.id'),
              total: parseFloat(_this.data.get('order.total') / 100),
              shipping: parseFloat(_this.data.get('order.shipping') / 100),
              tax: parseFloat(_this.data.get('order.tax') / 100),
              discount: parseFloat(_this.data.get('order.discount') / 100),
              coupon: _this.data.get('order.couponCodes.0') || '',
              currency: _this.data.get('order.currency'),
              products: []
            };
            ref = _this.data.get('order.items');
            for (i = j = 0, len = ref.length; j < len; i = ++j) {
              item = ref[i];
              options.products[i] = {
                id: item.productId,
                sku: item.productSlug,
                name: item.productName,
                quantity: item.quantity,
                price: parseFloat(item.price / 100)
              }
            }
            analytics.track('Completed Order', options);
            return { p: p }
          }
        }(this))
      };
      return Cart
    }();
    module.exports = Cart
  });
  // source: src/analytics.coffee
  require.define('./analytics', function (module, exports, __dirname, __filename) {
    module.exports = {
      track: function (event, data) {
        var err, error;
        if ((typeof window !== 'undefined' && window !== null ? window.analytics : void 0) != null) {
          try {
            return window.analytics.track(event, data)
          } catch (error) {
            err = error;
            return void 0
          }
        }
      }
    }
  });
  // source: node_modules/broken/lib/index.js
  require.define('broken/lib', function (module, exports, __dirname, __filename) {
    // Generated by CoffeeScript 1.10.0
    var Promise, PromiseInspection;
    Promise = require('zousan/zousan-min');
    Promise.suppressUncaughtRejectionError = false;
    PromiseInspection = function () {
      function PromiseInspection(arg) {
        this.state = arg.state, this.value = arg.value, this.reason = arg.reason
      }
      PromiseInspection.prototype.isFulfilled = function () {
        return this.state === 'fulfilled'
      };
      PromiseInspection.prototype.isRejected = function () {
        return this.state === 'rejected'
      };
      return PromiseInspection
    }();
    Promise.reflect = function (promise) {
      return new Promise(function (resolve, reject) {
        return promise.then(function (value) {
          return resolve(new PromiseInspection({
            state: 'fulfilled',
            value: value
          }))
        })['catch'](function (err) {
          return resolve(new PromiseInspection({
            state: 'rejected',
            reason: err
          }))
        })
      })
    };
    Promise.settle = function (promises) {
      return Promise.all(promises.map(Promise.reflect))
    };
    Promise.prototype.callback = function (cb) {
      if (typeof cb === 'function') {
        this.then(function (value) {
          return cb(null, value)
        });
        this['catch'](function (error) {
          return cb(error, null)
        })
      }
      return this
    };
    module.exports = Promise  //# sourceMappingURL=index.js.map
  });
  // source: node_modules/zousan/zousan-min.js
  require.define('zousan/zousan-min', function (module, exports, __dirname, __filename) {
    !function (t) {
      'use strict';
      function e(t) {
        if (t) {
          var e = this;
          t(function (t) {
            e.resolve(t)
          }, function (t) {
            e.reject(t)
          })
        }
      }
      function n(t, e) {
        if ('function' == typeof t.y)
          try {
            var n = t.y.call(i, e);
            t.p.resolve(n)
          } catch (o) {
            t.p.reject(o)
          }
        else
          t.p.resolve(e)
      }
      function o(t, e) {
        if ('function' == typeof t.n)
          try {
            var n = t.n.call(i, e);
            t.p.resolve(n)
          } catch (o) {
            t.p.reject(o)
          }
        else
          t.p.reject(e)
      }
      var r, i, c = 'fulfilled', u = 'rejected', s = 'undefined', f = function () {
          function t() {
            for (; e.length - n;)
              e[n](), e[n++] = i, n == o && (e.splice(0, o), n = 0)
          }
          var e = [], n = 0, o = 1024, r = function () {
              if (typeof MutationObserver !== s) {
                var e = document.createElement('div'), n = new MutationObserver(t);
                return n.observe(e, { attributes: !0 }), function () {
                  e.setAttribute('a', 0)
                }
              }
              return typeof setImmediate !== s ? function () {
                setImmediate(t)
              } : function () {
                setTimeout(t, 0)
              }
            }();
          return function (t) {
            e.push(t), e.length - n == 1 && r()
          }
        }();
      e.prototype = {
        resolve: function (t) {
          if (this.state === r) {
            if (t === this)
              return this.reject(new TypeError('Attempt to resolve promise with self'));
            var e = this;
            if (t && ('function' == typeof t || 'object' == typeof t))
              try {
                var o = !0, i = t.then;
                if ('function' == typeof i)
                  return void i.call(t, function (t) {
                    o && (o = !1, e.resolve(t))
                  }, function (t) {
                    o && (o = !1, e.reject(t))
                  })
              } catch (u) {
                return void (o && this.reject(u))
              }
            this.state = c, this.v = t, e.c && f(function () {
              for (var o = 0, r = e.c.length; r > o; o++)
                n(e.c[o], t)
            })
          }
        },
        reject: function (t) {
          if (this.state === r) {
            this.state = u, this.v = t;
            var n = this.c;
            n ? f(function () {
              for (var e = 0, r = n.length; r > e; e++)
                o(n[e], t)
            }) : e.suppressUncaughtRejectionError || void 0
          }
        },
        then: function (t, i) {
          var u = new e, s = {
              y: t,
              n: i,
              p: u
            };
          if (this.state === r)
            this.c ? this.c.push(s) : this.c = [s];
          else {
            var l = this.state, a = this.v;
            f(function () {
              l === c ? n(s, a) : o(s, a)
            })
          }
          return u
        },
        'catch': function (t) {
          return this.then(null, t)
        },
        'finally': function (t) {
          return this.then(t, t)
        },
        timeout: function (t, n) {
          n = n || 'Timeout';
          var o = this;
          return new e(function (e, r) {
            setTimeout(function () {
              r(Error(n))
            }, t), o.then(function (t) {
              e(t)
            }, function (t) {
              r(t)
            })
          })
        }
      }, e.resolve = function (t) {
        var n = new e;
        return n.resolve(t), n
      }, e.reject = function (t) {
        var n = new e;
        return n.reject(t), n
      }, e.all = function (t) {
        function n(n, c) {
          'function' != typeof n.then && (n = e.resolve(n)), n.then(function (e) {
            o[c] = e, r++, r == t.length && i.resolve(o)
          }, function (t) {
            i.reject(t)
          })
        }
        for (var o = [], r = 0, i = new e, c = 0; c < t.length; c++)
          n(t[c], c);
        return t.length || i.resolve(o), i
      }, typeof module != s && module.exports && (module.exports = e), t.Zousan = e, e.soon = f
    }('undefined' != typeof global ? global : this)
  });
  // source: src/index.coffee
  require.define('./index', function (module, exports, __dirname, __filename) {
    module.exports = { Cart: require('./cart') }
  });
  require('./index')
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuY29mZmVlIiwiYW5hbHl0aWNzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm9rZW4vbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3pvdXNhbi96b3VzYW4tbWluLmpzIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbIkNhcnQiLCJQcm9taXNlIiwiYW5hbHl0aWNzIiwicmVxdWlyZSIsInByb3RvdHlwZSIsIndhaXRzIiwicXVldWUiLCJkYXRhIiwiY2xpZW50IiwicHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJjbGllbnQxIiwiZGF0YTEiLCJpbnZvaWNlIiwic2V0IiwiaWQiLCJxdWFudGl0eSIsImxvY2tlZCIsInB1c2giLCJsZW5ndGgiLCJfdGhpcyIsIl9zZXQiLCJkZWx0YVF1YW50aXR5IiwiaSIsIml0ZW0iLCJpdGVtcyIsImoiLCJrIiwibGVuIiwibGVuMSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJyZWYiLCJnZXQiLCJwcm9kdWN0SWQiLCJwcm9kdWN0U2x1ZyIsInNwbGljZSIsInRyYWNrIiwic2t1IiwibmFtZSIsInByb2R1Y3ROYW1lIiwicHJpY2UiLCJwYXJzZUZsb2F0Iiwib25VcGRhdGUiLCJzaGlmdCIsImxvYWQiLCJwcm9kdWN0IiwidGhlbiIsInNsdWciLCJ1cGRhdGUiLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibGlzdFByaWNlIiwicHJvbW9Db2RlIiwiY291cG9uIiwiZW5hYmxlZCIsImZyZWVQcm9kdWN0SWQiLCJmcmVlUXVhbnRpdHkiLCJmcmVlUHJvZHVjdCIsIkVycm9yIiwidGF4UmF0ZXMiLCJjaXR5IiwiY291bnRyeSIsImRpc2NvdW50IiwibCIsImxlbjIiLCJsZW4zIiwibGVuNCIsIm0iLCJuIiwicmVmMSIsInJlZjIiLCJyZWYzIiwicmVmNCIsInNoaXBwaW5nIiwic2hpcHBpbmdSYXRlIiwic3RhdGUiLCJzdWJ0b3RhbCIsInRheCIsInRheFJhdGUiLCJ0YXhSYXRlRmlsdGVyIiwidHlwZSIsImFtb3VudCIsIk1hdGgiLCJmbG9vciIsInRvTG93ZXJDYXNlIiwiY2VpbCIsImNoZWNrb3V0IiwidXNlciIsIm9yZGVyIiwicGF5bWVudCIsImF1dGhvcml6ZSIsIm9wdGlvbnMiLCJwIiwicmVmZXJyYWxQcm9ncmFtIiwiY2FwdHVyZSIsIndpbmRvdyIsIlJhdmVuIiwiY2FwdHVyZUV4Y2VwdGlvbiIsInJlZmVycmVyIiwiY3JlYXRlIiwidXNlcklkIiwib3JkZXJJZCIsInByb2dyYW0iLCJ0b3RhbCIsImN1cnJlbmN5IiwicHJvZHVjdHMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZXZlbnQiLCJlcnJvciIsIlByb21pc2VJbnNwZWN0aW9uIiwic3VwcHJlc3NVbmNhdWdodFJlamVjdGlvbkVycm9yIiwiYXJnIiwidmFsdWUiLCJyZWFzb24iLCJpc0Z1bGZpbGxlZCIsImlzUmVqZWN0ZWQiLCJyZWZsZWN0Iiwic2V0dGxlIiwicHJvbWlzZXMiLCJhbGwiLCJtYXAiLCJjYWxsYmFjayIsImNiIiwidCIsImUiLCJ5IiwiY2FsbCIsIm8iLCJyIiwiYyIsInUiLCJzIiwiZiIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZSIsInNldEltbWVkaWF0ZSIsInNldFRpbWVvdXQiLCJUeXBlRXJyb3IiLCJ2Iiwic3RhY2siLCJhIiwidGltZW91dCIsIlpvdXNhbiIsInNvb24iLCJnbG9iYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLElBQUlBLElBQUosRUFBVUMsT0FBVixFQUFtQkMsU0FBbkIsQztJQUVBQSxTQUFBLEdBQVlDLE9BQUEsQ0FBUSxhQUFSLENBQVosQztJQUVBRixPQUFBLEdBQVVFLE9BQUEsQ0FBUSxZQUFSLENBQVYsQztJQUVBSCxJQUFBLEdBQVEsWUFBVztBQUFBLE1BQ2pCQSxJ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LENBQWIsRUFBZTtBQUFBLFVBQUMsY0FBWSxPQUFPOUQsQ0FBQSxDQUFFdkIsSUFBckIsSUFBNEIsQ0FBQXVCLENBQUEsR0FBRXlELENBQUEsQ0FBRXJILE9BQUYsQ0FBVTRELENBQVYsQ0FBRixDQUE1QixFQUE0Q0EsQ0FBQSxDQUFFdkIsSUFBRixDQUFPLFVBQVNnRixDQUFULEVBQVc7QUFBQSxZQUFDRyxDQUFBLENBQUVFLENBQUYsSUFBS0wsQ0FBTCxFQUFPSSxDQUFBLEVBQVAsRUFBV0EsQ0FBQSxJQUFHTCxDQUFBLENBQUUzRyxNQUFMLElBQWFJLENBQUEsQ0FBRWIsT0FBRixDQUFVd0gsQ0FBVixDQUF6QjtBQUFBLFdBQWxCLEVBQXlELFVBQVNKLENBQVQsRUFBVztBQUFBLFlBQUN2RyxDQUFBLENBQUVkLE1BQUYsQ0FBU3FILENBQVQsQ0FBRDtBQUFBLFdBQXBFLENBQTdDO0FBQUEsU0FBaEI7QUFBQSxRQUFnSixLQUFJLElBQUlJLENBQUEsR0FBRSxFQUFOLEVBQVNDLENBQUEsR0FBRSxDQUFYLEVBQWE1RyxDQUFBLEdBQUUsSUFBSXdHLENBQW5CLEVBQXFCSyxDQUFBLEdBQUUsQ0FBdkIsQ0FBSixDQUE2QkEsQ0FBQSxHQUFFTixDQUFBLENBQUUzRyxNQUFqQyxFQUF3Q2lILENBQUEsRUFBeEM7QUFBQSxVQUE0QzlELENBQUEsQ0FBRXdELENBQUEsQ0FBRU0sQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBNUw7QUFBQSxRQUFzTSxPQUFPTixDQUFBLENBQUUzRyxNQUFGLElBQVVJLENBQUEsQ0FBRWIsT0FBRixDQUFVd0gsQ0FBVixDQUFWLEVBQXVCM0csQ0FBcE87QUFBQSxPQUF6dUMsRUFBZzlDLE9BQU9xRixNQUFQLElBQWUwQixDQUFmLElBQWtCMUIsTUFBQSxDQUFPQyxPQUF6QixJQUFtQyxDQUFBRCxNQUFBLENBQU9DLE9BQVAsR0FBZWtCLENBQWYsQ0FBbi9DLEVBQXFnREQsQ0FBQSxDQUFFdUIsTUFBRixHQUFTdEIsQ0FBOWdELEVBQWdoREEsQ0FBQSxDQUFFdUIsSUFBRixHQUFPZixDQUEzMEU7QUFBQSxLQUFYLENBQXkxRSxlQUFhLE9BQU9nQixNQUFwQixHQUEyQkEsTUFBM0IsR0FBa0MsSUFBMzNFLEM7Ozs7SUNBRDNDLE1BQUEsQ0FBT0MsT0FBUCxHQUNFLEVBQUE5RyxJQUFBLEVBQU1HLE9BQUEsQ0FBUSxRQUFSLENBQU4sRSIsInNvdXJjZVJvb3QiOiIvc3JjIn0=
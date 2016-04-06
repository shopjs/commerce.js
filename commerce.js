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
      function Cart(client, data1) {
        this.client = client;
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
      Cart.prototype.get = function (id) {
        var i, item, items, j, k, len, len1, ref;
        items = this.data.get('order.items');
        for (i = j = 0, len = items.length; j < len; i = ++j) {
          item = items[i];
          if (item.id !== id && item.productId !== id && item.productSlug !== id) {
            continue
          }
          return item
        }
        ref = this.queue;
        for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
          item = ref[i];
          if (item[0] !== id) {
            continue
          }
          return {
            id: item[0],
            quantity: item[2],
            locked: item[3]
          }
        }
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
            this.data.set('order.items', []);
            items.splice(i, 1);
            this.onUpdate();
            analytics.track('Removed Product', {
              id: item.productId,
              sku: item.productSlug,
              name: item.productName,
              quantity: item.quantity,
              price: parseFloat(item.price / 100)
            });
            this.data.set('order.items', items);
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
          this.data.set('order.items.' + i + '.quantity', quantity);
          this.data.set('order.items.' + i + '.locked', locked);
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
        return this.client.product.get(id).then(function (_this) {
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
                _this.data.set('order.items.' + i, item);
                break
              }
            }
            _this.queue.shift();
            return _this._set()
          }
        }(this))['catch'](function (_this) {
          return function (err) {
            var i, item, j, len;
            _this.waits--;
            void 0;
            for (i = j = 0, len = items.length; j < len; i = ++j) {
              item = items[i];
              if (item.id === id) {
                items.splice(i, 1);
                _this.data.set('order.items', items);
                break
              }
            }
            _this.queue.shift();
            return _this._set()
          }
        }(this))
      };
      Cart.prototype.refresh = function (id) {
        var items;
        items = this.data.get('order.items');
        return this.client.product.get(id).then(function (_this) {
          return function (product) {
            var i, item, j, len;
            _this.waits--;
            for (i = j = 0, len = items.length; j < len; i = ++j) {
              item = items[i];
              if (product.id === item.productId || product.slug === item.productSlug) {
                _this.update(product, item);
                break
              }
            }
            return items
          }
        }(this))['catch'](function (err) {
          return void 0
        })
      };
      Cart.prototype.update = function (product, item) {
        delete item.id;
        item.productId = product.id;
        item.productSlug = product.slug;
        item.productName = product.name;
        item.price = product.price;
        item.listPrice = product.listPrice;
        item.description = product.description;
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
}.call(this, this))//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuY29mZmVlIiwiYW5hbHl0aWNzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm9rZW4vbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3pvdXNhbi96b3VzYW4tbWluLmpzIiwiaW5kZXguY29mZmVlIl0sIm5hbWVzIjpbIkNhcnQiLCJQcm9taXNlIiwiYW5hbHl0aWNzIiwicmVxdWlyZSIsInByb3RvdHlwZSIsIndhaXRzIiwicXVldWUiLCJkYXRhIiwiY2xpZW50IiwicHJvbWlzZSIsInJlamVjdCIsInJlc29sdmUiLCJkYXRhMSIsImludm9pY2UiLCJzZXQiLCJpZCIsInF1YW50aXR5IiwibG9ja2VkIiwicHVzaCIsImxlbmd0aCIsIl90aGlzIiwiX3NldCIsImdldCIsImkiLCJpdGVtIiwiaXRlbXMiLCJqIiwiayIsImxlbiIsImxlbjEiLCJyZWYiLCJwcm9kdWN0SWQiLCJwcm9kdWN0U2x1ZyIsImRlbHRhUXVhbnRpdHkiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwic3BsaWNlIiwib25VcGRhdGUiLCJ0cmFjayIsInNrdSIsIm5hbWUiLCJwcm9kdWN0TmFtZSIsInByaWNlIiwicGFyc2VGbG9hdCIsInNoaWZ0IiwibG9hZCIsInByb2R1Y3QiLCJ0aGVuIiwic2x1ZyIsInVwZGF0ZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoIiwibGlzdFByaWNlIiwiZGVzY3JpcHRpb24iLCJwcm9tb0NvZGUiLCJjb3Vwb24iLCJlbmFibGVkIiwiZnJlZVByb2R1Y3RJZCIsImZyZWVRdWFudGl0eSIsImZyZWVQcm9kdWN0IiwiRXJyb3IiLCJ0YXhSYXRlcyIsImNpdHkiLCJjb3VudHJ5IiwiZGlzY291bnQiLCJsIiwibGVuMiIsImxlbjMiLCJsZW40IiwibSIsIm4iLCJyZWYxIiwicmVmMiIsInJlZjMiLCJyZWY0Iiwic2hpcHBpbmciLCJzaGlwcGluZ1JhdGUiLCJzdGF0ZSIsInN1YnRvdGFsIiwidGF4IiwidGF4UmF0ZSIsInRheFJhdGVGaWx0ZXIiLCJ0eXBlIiwiYW1vdW50IiwiTWF0aCIsImZsb29yIiwidG9Mb3dlckNhc2UiLCJjZWlsIiwiY2hlY2tvdXQiLCJ1c2VyIiwib3JkZXIiLCJwYXltZW50IiwiYXV0aG9yaXplIiwib3B0aW9ucyIsInAiLCJyZWZlcnJhbFByb2dyYW0iLCJjYXB0dXJlIiwid2luZG93IiwiUmF2ZW4iLCJjYXB0dXJlRXhjZXB0aW9uIiwicmVmZXJyZXIiLCJjcmVhdGUiLCJ1c2VySWQiLCJvcmRlcklkIiwicHJvZ3JhbSIsInRvdGFsIiwiY3VycmVuY3kiLCJwcm9kdWN0cyIsIm1vZHVsZSIsImV4cG9ydHMiLCJldmVudCIsImVycm9yIiwiUHJvbWlzZUluc3BlY3Rpb24iLCJzdXBwcmVzc1VuY2F1Z2h0UmVqZWN0aW9uRXJyb3IiLCJhcmciLCJ2YWx1ZSIsInJlYXNvbiIsImlzRnVsZmlsbGVkIiwiaXNSZWplY3RlZCIsInJlZmxlY3QiLCJzZXR0bGUiLCJwcm9taXNlcyIsImFsbCIsIm1hcCIsImNhbGxiYWNrIiwiY2IiLCJ0IiwiZSIsInkiLCJjYWxsIiwibyIsInIiLCJjIiwidSIsInMiLCJmIiwiTXV0YXRpb25PYnNlcnZlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlIiwic2V0SW1tZWRpYXRlIiwic2V0VGltZW91dCIsIlR5cGVFcnJvciIsInYiLCJzdGFjayIsImEiLCJ0aW1lb3V0IiwiWm91c2FuIiwic29vbiIsImdsb2JhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsSUFBSUEsSUFBSixFQUFVQyxPQUFWLEVBQW1CQyxTQUFuQixDO0lBRUFBLFNBQUEsR0FBWUMsT0FBQSxDQUFRLGFBQVIsQ0FBWixDO0lBRUFGLE9BQUEsR0FBVUUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDO0lBRUFILElBQUEsR0FBUSxZQUFX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
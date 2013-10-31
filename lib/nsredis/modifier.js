/**
 * Key modifier.
 *
 * @param {String} namespace
 * @constructor
 */

function Modifier(namespace) {
  this.sep = ':';
  this.ns = namespace;
  this.nss = this.ns + this.sep;
}

/**
 * Modify given arguments.
 *
 * @param {String} type
 * @param {Array} arguments
 * @returns {Array}
 * @api public
 */

Modifier.prototype.modify = function(type, args) {
  if (type === Modifier.NONE) return args;
  if (!this[type]) throw new Error('Invalid modifier – ' + type);
  return this[type](args);
};

/**
 * Add a namespace to `key`.
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Modifier.prototype.add = function(key) {
  return this.nss + key;
};

/**
 * Remove a namespace from `key`.
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Modifier.prototype.remove = function(key) {
  return key.replace(new RegExp('^' + this.nss), '');
};

/**
 * @param {Array} arguments
 * @returns {Array}
 * @api private
 */

Modifier.prototype.first = function(args) {
  if (args[0]) args[0] = this.add(args[0]);
  return args;
};

/**
 * @param {Array} arguments
 * @returns {Array}
 * @api private
 */

Modifier.prototype.all = function(args) {
  return map(args, function(arg) {
    return this.add(arg);
  }, this);
};

/**
 * @param {Array} arguments
 * @returns {Array}
 * @api private
 */

Modifier.prototype.excludeFirst = function(args) {
  return map(args, function(arg, i) {
    if (i === 0) return arg;
    return this.add(arg);
  }, this);
};

/**
 * @param {Array} arguments
 * @returns {Array}
 * @api private
 */

Modifier.prototype.excludeLast = function(args) {
  var lastIndex = args.length - 1;

  if ('function' === typeof args[lastIndex]) {
    --lastIndex;
  }

  return map(args, function(arg, i) {
    if (i === lastIndex) return arg;
    return this.add(arg);
  }, this);
};

/**
 * None type. Use when you don't want to
 * modify the arguments.
 */

Modifier.NONE = 'none';

/**
 * "All" type.
 */

Modifier.ALL = 'all';

/**
 * "First" type.
 */

Modifier.FIRST = 'first';

/**
 * "Exclude first" type.
 */

Modifier.EXCLUDE_FIRST = 'excludeFirst';

/**
 * "Exclude last" type.
 */

Modifier.EXCLUDE_LAST = 'excludeLast';

/**
 * Execute `fn` with every string in `args`.
 *
 * @param {Object} array
 * @param {Function} fn
 * @param {Object} context
 * @returns {Array}
 * @api private
 */

function map(arr, fn, ctx) {
  return arr.map(function(arg, i) {
    if ('string' !== typeof arg) return arg;
    return fn.call(ctx, arg, i);
  });
}

/**
 * Primary export.
 */

module.exports = Modifier;

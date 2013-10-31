/**
 * Namespace proxy.
 *
 * @param {Redis.Client} client
 * @param {String} namespace
 * @constructor
 */

function Namespace(client, ns) {
  if (!(this instanceof Namespace)) return new Namespace(client, ns);
  this.client = client;
  this.ns = ns;
  this.sep = ':';
}

/**
 * Namespace a given `key`.
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Namespace.prototype.namespace = function(key) {
  return this.ns + this.sep + key;
};

/**
 * Primary export.
 */

module.exports = Namespace;

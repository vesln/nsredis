/**
 * Internal dependencies.
 */

var commands = require('./commands');
var Modifier = require('./modifier');

/**
 * Noop.
 */

var noop = function() {};

/**
 * Array#slice.
 */

var slice = Array.prototype.slice;

/**
 * Redis proxy.
 *
 * @param {Redis.Client} client
 * @param {String} namespace
 * @param {String} [separator]
 * @constructor
 */

function Proxy(client, ns, sep) {
  if (!(this instanceof Proxy)) return new Proxy(client, ns, sep);
  this.modifier = new Modifier(ns, sep);
  this._client = client;
}

/**
 * Namespace a given `key`.
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Proxy.prototype.addNamespace = function(key) {
  return this.modifier.add(key);
};

/**
 * Remove a namespace from the given `key`
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Proxy.prototype.removeNamespace = function(key) {
  return this.modifier.remove(key);
};

/**
 * Return the Redis client.
 *
 * @returns {Redis.Client}
 * @api public
 */

Proxy.prototype.client = function() {
  return this._client;
};

/**
 * Execute a given command.
 *
 * @param {Command} command
 * @param {Array} arguments
 * @api private
 */

Proxy.prototype.exec = function(command, args) {
  var params = this.modifier.modify(command.strategy, args);
  return this._client.send_command(command.name, params);
};

/**
 * Append all commands.
 */

Object.keys(commands).forEach(function(key) {
  Proxy.prototype[key] = function() {
    return this.exec(commands[key], slice.call(arguments));
  };

  Proxy.prototype[key.toUpperCase()] = Proxy.prototype[key];
});

/**
 * Primary export.
 */

module.exports = Proxy;

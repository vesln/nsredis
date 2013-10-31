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
 * Namespace proxy.
 *
 * @param {Redis.Client} client
 * @param {String} namespace
 * @constructor
 */

function Namespace(client, ns) {
  if (!(this instanceof Namespace)) return new Namespace(client, ns);
  this.modifier = new Modifier(ns);
  this._client = client;
}

/**
 * Namespace a given `key`.
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Namespace.prototype.addNamespace = function(key) {
  return this.modifier.add(key);
};

/**
 * Remove a namespace from the given `key`
 *
 * @param {String} key
 * @returns {String}
 * @api public
 */

Namespace.prototype.removeNamespace = function(key) {
  return this.modifier.remove(key);
};

/**
 * Return the Redis client.
 *
 * @returns {Redis.Client}
 * @api public
 */

Namespace.prototype.client = function() {
  return this._client;
};

/**
 * Execute a given command.
 *
 * @param {Command} command
 * @param {Array} arguments
 * @api private
 */

Namespace.prototype.exec = function(command, args) {
  var name = command.name();
  var modifier = command.modifier();
  var params = this.modifier.modify(modifier, args);
  return this._client.send_command(name, params);
};

/**
 * Append all commands.
 */

Object.keys(commands).forEach(function(key) {
  Namespace.prototype[key] = function() {
    return this.exec(commands[key], slice.call(arguments));
  };

  Namespace.prototype[key.toUpperCase()] = Namespace.prototype[key];
});

/**
 * Primary export.
 */

module.exports = Namespace;

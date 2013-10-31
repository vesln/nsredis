/**
 * Array#slice.
 */

var slice = Array.prototype.slice;

/**
 * Fake client.
 *
 * @constructor
 */

function FakeClient() {
  this.resetCalls();
}

/**
 * Send command.
 *
 * @api public
 */

FakeClient.prototype.send_command = function(command, args) {
  this.calls.push({ command: command, args: args });
};

/**
 * Reset the calls storage.
 *
 * @api public
 */

FakeClient.prototype.resetCalls = function() {
  this.calls = [];
};

/**
 * Return the last method call.
 *
 * @returns {Array|null}
 * @api public
 */

FakeClient.prototype.lastCall = function() {
  return this.calls[this.calls.length - 1];
};

/**
 * Primary export.
 */

module.exports = FakeClient;

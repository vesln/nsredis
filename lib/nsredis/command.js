/**
 * A Redis command.
 *
 * @param {String} command
 * @param {String} args modifier
 * @constructor
 */

function Command(cmd, modifier) {
  this.cmd = cmd;
  this._modifier = modifier;
}

/**
 * Return command.
 *
 * @returns {String}
 * @api public
 */

Command.prototype.name = function() {
  return this.cmd;
};

/**
 * Return command modifier.
 *
 * @returns {String}
 * @api public
 */

Command.prototype.modifier = function() {
  return this._modifier;
};

/**
 * Primary export.
 */

module.exports = Command;

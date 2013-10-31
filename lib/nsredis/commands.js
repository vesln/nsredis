/**
 * Internal dependencies.
 */

var Modifier = require('./modifier');

/**
 * Command factory.
 *
 * @param {String} redis command
 * @param {String} strategy
 * @returns {Object}
 * @api private
 */

function command(cmd, strategy) {
  return { name: cmd, strategy: strategy };
}

/**
 * Export all commands.
 */

module.exports = {
  set:    command('set', Modifier.FIRST),
  rename: command('rename', Modifier.ALL),
  object: command('object', Modifier.EXCLUDE_FIRST),
  smove:  command('smove', Modifier.EXCLUDE_LAST),
  mset:   command('mset', Modifier.ALTERNATE),
};

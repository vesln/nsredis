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
  append:       command('append', Modifier.FIRST),
  auth:         command('auth'),
  bgrewriteaof: command('bgrewriteaof'),
  bgsave:       command('bgsave'),
  bitcount:     command('bitcount', Modifier.FIRST),
  bitop:        command('bitop', Modifier.EXCLUDE_FIRST),
  blpop:        command('blpop', Modifier.EXCLUDE_LAST),
  brpop:        command('brpop', Modifier.EXCLUDE_LAST),
  brpoplpush:   command('brpoplpush', Modifier.EXCLUDE_LAST),
  set:          command('set', Modifier.FIRST),
  rename:       command('rename', Modifier.ALL),
  object:       command('object', Modifier.EXCLUDE_FIRST),
  smove:        command('smove', Modifier.EXCLUDE_LAST),
  mset:         command('mset', Modifier.ALTERNATE),
};

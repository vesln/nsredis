/**
 * Internal dependencies.
 */

var Command = require('./command');
var Modifier = require('./modifier');

/**
 * Export all commands.
 */

module.exports = {
  set:    new Command('set',    Modifier.FIRST),
  rename: new Command('rename', Modifier.ALL),
  object: new Command('object', Modifier.EXCLUDE_FIRST),
  smove:  new Command('smove',  Modifier.EXCLUDE_LAST),
};

/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

var nsredis = require('../..');
var FakeClient = require('../doubles/fake-client');

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Create a global instance for DRY tests.
 */

global.nsr = nsredis(new FakeClient, 'test');

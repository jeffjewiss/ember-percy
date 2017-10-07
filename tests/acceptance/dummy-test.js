import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { currentURL, visit } from 'ember-native-dom-helpers';
import { percySnapshot } from 'ember-percy';

moduleForAcceptance('Acceptance | dummy');

test('visiting /', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');
  percySnapshot('dummy homepage test');
});

test('duplicate snapshots are skipped', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');
  percySnapshot('dupe test');
  // Test duplicate name (should log warning and skip this snapshot):
  percySnapshot('dupe test');
});

test('name is autogenerated if given a QUnit assert object', function(assert) {
  assert.expect(0);
  percySnapshot(assert);
});

test('name is autogenerated if given a Mocha test object', function(assert) {
  assert.expect(0);
  var mochaTestDouble = {
    fullTitle: function() {
      return 'acceptance test - mocked fullTitle for Mocha tests';
    },
  };
  percySnapshot(mochaTestDouble);
});

test('enableJavaScript option can pass through', async function(assert) {
  await visit('/');
  assert.equal(currentURL(), '/');
  percySnapshot(assert, {enableJavaScript: true});
});

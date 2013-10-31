var noop = function() {};

describe('modifiers', function() {
  beforeEach(function() {
    nsr.client().resetCalls();
  });

  describe('#first', function() {
    it('prepends a namespace to the first argument', function() {
      nsr.set('user', 3);
      nsr.client().lastCall().args.should.eql(['test:user', 3]);
    });
  });

  describe('#all', function() {
    it('prepends a namespace to all arguments except non-strings', function() {
      nsr.rename('user', 'person', noop);
      nsr.client().lastCall().args.should.eql([
        'test:user',
        'test:person',
        noop
      ]);
    });
  });

  describe('#excludeFirst', function() {
    it('prepends a namespace to all arguments except the first one and non-strings', function() {
      nsr.object('refcount', 'people', noop);
      nsr.client().lastCall().args.should.eql([
        'refcount',
        'test:people',
        noop
      ]);
    });
  });

  describe('#excludeLast', function() {
    it('prepends a namespace to all arguments except the last one and non-strings', function() {
      nsr.smove('first', 'second', 'foo', noop);
      nsr.client().lastCall().args.should.eql([
        'test:first',
        'test:second',
        'foo',
        noop
      ]);
    });
  });
});

describe('nsredis#namespace', function() {
  it('inserts a namespace for a given key', function() {
    nsr.namespace('users').should.eq('test:users');
  });
});

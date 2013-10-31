describe('nsredis#removeNamespace', function() {
  it('inserts a namespace for a given key', function() {
    nsr.removeNamespace('test:users').should.eq('users');
  });
});

describe('nsredis#stripNamespace', function() {
  it('inserts a namespace for a given key', function() {
    nsr.stripNamespace('test:users').should.eq('users');
  });
});

describe('nsredis#addNamespace', function() {
  it('inserts a namespace for a given key', function() {
    nsr.addNamespace('users').should.eq('test:users');
  });
});

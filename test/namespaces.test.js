describe('Manual namespace managment', function() {
  describe('Namespace#addNamespace', function() {
    it('inserts a namespace for a given key', function() {
      nsr.addNamespace('users').should.eq('test:users');
    });
  });

  describe('Namespace#removeNamespace', function() {
    it('removes a namespace for a given key', function() {
      nsr.removeNamespace('test:users').should.eq('users');
    });
  });
});

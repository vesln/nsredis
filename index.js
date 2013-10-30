module.exports = process.env.NSREDIS_COV
  ? require('./lib-cov/nsredis')
  : require('./lib/nsredis');

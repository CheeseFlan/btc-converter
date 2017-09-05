const program = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .description('Convert Bitcoin to any currency provided.')
  .parse(process.argv)

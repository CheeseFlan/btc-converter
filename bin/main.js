'use strict';

var program = require('commander');
var pkg = require('../package.json');

program.version(pkg.version).description('Convert Bitcoin to any currency provided.').parse(process.argv);
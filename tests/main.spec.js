const expect = require('chai').expect;

const exec = require('child_process').exec;

const path = require('path');
const root = path.resolve('.');

const btcConverter = path.join(root, 'src', 'main.js');
const pkg = require('../package.json');

describe('Main CLI', () => {
  it('should return version of btc-converter', (done) => {
    exec(`node ${btcConverter} --version`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('should return the description when btc-converter --help', (done) => {
    exec(`node ${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.includes('Convert Bitcoin to any currency provided.')).to.be.true;
      done();
    });
  });

  it('should return the currency option when btc-converter --help', (done) => {
    exec(`node ${btcConverter} --help`, (err, stdout, stderr) => {
      expect(stdout.includes('--currency')).to.be.true;
      done();
    });
  });

  it('should return the amount option when btc-converter --help', (done) => {
    exec(`node ${btcConverter} --help`, (err, stdout, stderr) => {
      expect(stdout.includes('--amount')).to.be.true;
      done();
    });
  });
});

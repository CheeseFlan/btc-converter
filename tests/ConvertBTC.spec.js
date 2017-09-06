const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;
chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC');

describe('ConvertBTC', () => {

  let consoleStub;

  const responseMock = {
      "time": "2017-09-06 18:21:08",
      "success": true,
      "price": 4654.13
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('should use currency USD and 1 as amount default', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to USD = 4654.13');
      done();
    }, 300)
  });

  it('should use currency USD and 10 as amount', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

     convertBTC('USD', 10);
     setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('10 BTC to USD = 4654.13');
      done();
    }, 300)
  });

  it('should use currency BRL and 1 as amount default', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

     convertBTC('BRL');
     setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('1 BTC to BRL = 4654.13');
      done();
    }, 300)
  });

  it('should message user when api reply with error', (done) => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

     convertBTC('BRL');
     setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith('Something went wrong in the API. Try in a few minutes.');
      done();
    }, 300)
  });
});

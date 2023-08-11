const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const supertest = require('supertest');

const app = require('../index');
const transactionsDb = require('../models/transactionsModel');

const sandbox = sinon.createSandbox();

describe('fetch transactions test', () => {
    let request;

    before(() => {
        request = supertest(app);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should add a new transaction', async () => {
        const newTransactionData = {
            userId: 'user111',
            amount: 50,
            totalAmount: 100,
            quantity: 2,
            status: 1,
        };

        const response = await request.post('/transactions/add_transaction').send(newTransactionData);

        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.false;
        expect(response.body.addedData).to.deep.include(newTransactionData);
    });

    it('should fetch transactions with valid parameters', async () => {

        const aggregateStub = sandbox.stub(transactionsDb, 'aggregate').resolves([
            {
                totalData: { count: 0 },
                transactionsData: [],
            },
        ]);

        aggregateStub().then(data => console.log(data))

        const response = await request.get('/transactions/fetch_transactions');

        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.false;
        expect(response.body).to.deep.keys('error', 'totalData', 'message', 'transactionsData');
        expect(aggregateStub.calledOnce).to.be.true;
    });
});

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const supertest = require('supertest');

const app = require('../index');
const usersDb = require('../models/usersModel');

const sandbox = sinon.createSandbox();

describe('fetch users test', () => {
    let request;

    before(() => {
        request = supertest(app);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should add a new users', async () => {
        const newUsersData = {
            userId: 'user1114',
            name: 'test name',
            mobile: '7728282992',
        };

        const response = await request.post('/users/add_users').send(newUsersData);

        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.false;
        expect(response.body.addedData).to.deep.include(newUsersData);
    });

    it('should fetch users with valid parameters', async () => {

        const aggregateStub = sandbox.stub(usersDb, 'aggregate').resolves([
            {
                totalData: { count: 0 },
                usersData: [],
            },
        ]);

        // aggregateStub().then(data => console.log(data))

        const response = await request.get('/users/fetch_users');

        expect(response.status).to.equal(200);
        expect(response.body.error).to.be.false;
        expect(response.body).to.deep.keys('error', 'totalData', 'message', 'usersData');
        expect(aggregateStub.calledOnce).to.be.true;
    });
});

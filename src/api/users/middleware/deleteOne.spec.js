import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import usersServices from '../../../modules/users/services';
import deleteOne from './deleteOne';

chai.use(sinonChai);

describe('api > users > middleware > deleteOne', () => {
  let usersServicesDeleteOneStub;

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    usersServicesDeleteOneStub = sinon.stub(usersServices, 'deleteOne');
  });

  it('should be a function', () => {
    expect(deleteOne).to.be.a('function');
  });

  it('should call deleteOne service with req.params.userEmail and call res.send', () => {
    const response = {
      data: true,
    };
    const req = {
      params: {
        userEmail: 'john.doe@gmail.com',
      },
    };
    const res = {
      send: sinon.spy(),
    };
    const next = sinon.spy();

    usersServicesDeleteOneStub.resolves(response);

    return deleteOne(req, res, next).then(() => {
      expect(res.send).to.have.been.called;
      expect(next).not.to.have.been.called;
      expect(usersServicesDeleteOneStub).to.have.been.called;
    });
  });

  it('should call deleteOne service with req.params.userEmail and call next if error', () => {
    const req = {
      params: {
        userEmail: 'j@gmail.com',
      },
    };
    const res = {
      send: sinon.spy(),
    };
    const next = sinon.spy();
    usersServicesDeleteOneStub.rejects();

    return deleteOne(req, res, next).then(() => {
      expect(res.send).not.to.have.been.called;
      expect(next).to.have.been.called;
      expect(usersServicesDeleteOneStub).to.have.been.called;
    });
  });
});

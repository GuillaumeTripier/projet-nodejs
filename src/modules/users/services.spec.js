import sinon from 'sinon';
import { expect } from 'chai';
import services from './services';
import clients from '../../clients';

describe('modules > Users > services', () => {
  let mongodbSpy;
  const db = {
    collection: sinon.spy(() => db),
    insertOne: sinon.spy(() => ({
      ops: [
        {
          todo: true,
        },
      ],
    })),
  };


  beforeEach(() => {
    mongodbSpy = sinon.stub(clients, 'mongodb').resolves(db);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should works createOne', () => {
    const data = {
      firstName: 'john',
      userEmail: 'john.doe@gmail.com',
      password: '$2b$10$wn4y4.gwrayJiiKwxITgROWumJHBvXV6UgfFaA02F9FmGxZkc2Tpa',
    };
    return services.createOne(data).then((result) => {
      expect(result.todo).to.equal(true);

      expect(db.collection.callCount).to.equal(1);
      expect(db.insertOne.callCount).to.equal(1);
      expect(mongodbSpy.callCount).to.equal(1);
    });
  });
});

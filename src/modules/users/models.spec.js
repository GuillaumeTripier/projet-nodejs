import joi from 'joi';
import { expect } from 'chai';
import model from './models';

describe('modules > Users > model', () => {
  const validData = {
    firstName: 'john',
    userEmail: 'john.doe@gmail.com',
    password: 'password',
  };

  const unvalidData = {
    anotherKey: '12345',
  };

  it('should be a joi schema', () => {
    expect(model).to.be.an('object');
  });

  it('should not works', (done) => {
    joi.validate(unvalidData, model).catch(() => {
      done();
    });
  });

  it('should works', () => joi.validate(validData, model));
});

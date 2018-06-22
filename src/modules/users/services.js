import joi from 'joi';
import bcrypt from 'bcrypt';
import clients from '../../clients';
import model, { modelForUpdate } from './models';
import errors from '../../enums/errors';

class UsersServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  createOne(data) {
    const passwordData = {
      ...data,
      password: bcrypt.hashSync(data.password, 10),
    };
    return joi.validate(passwordData, model).then(validatedData => clients.mongodb()
      .then(db => db.collection(this.COLLECTION_NAME).insertOne(validatedData))
      .then(response => response.ops[0]));
  }

  deleteOne(userEmail) {
    return joi.validate(userEmail, joi.string().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ userEmail }))
      .then((response) => {
        if (response.deletedCount === 0) throw errors.notFound();

        return response;
      });
  }

  find(first = 20, offset = 0, term) {
    return clients.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find(term ? { $text: { $search: term } } : null)
          .skip(offset)
          .limit(first)
          .toArray();
      });
  }

  findOne(userEmail) {
    return joi.validate(userEmail, joi.string().email().required())
      .then(() => clients.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ userEmail }))
      .then((list) => {
        if (!list) throw errors.notFound();
        return list;
      });
  }

  updateOne(userEmail, data) {
    return joi.validate(userEmail, joi.string().email().required())
      .then(() => joi.validate(data, modelForUpdate))
      .then((validatedData) => {
        return clients.mongodb()
          .then(db => db
            .collection(this.COLLECTION_NAME)
            .updateOne(
              { userEmail },
              { $set: validatedData },
            ));
      })
      .then((response) => {
        if (response.matchedCount === 0) throw errors.notFound();

        return response;
      })
      .then(() => this.findOne(userEmail));
  }
}

export default new UsersServices('users');

'use strict';
const connectToDatabase = require('./db');
const Food = require('./models/Food');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Food.create(JSON.parse(event.body))
        .then(food => callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Created Food under the ID' + food._id
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the food.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Food.findById(event.pathParameters.id)
        .then(food => callback(null, {
          statusCode: 200,
          body: JSON.stringify(food)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the food.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Food.find({})
        .then(foods => {
          callback(null, {
          statusCode: 200,
          body: JSON.stringify(foods)
        })
      })
        .catch(err => {
          callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the foods.'
        })
      })
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Food.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body))
        .then(food => callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Food updated: ' + food._id
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not update the foods.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Food.findByIdAndRemove(event.pathParameters.id)
        .then(food => callback(null, {
          statusCode: 200,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Removed food with id: ' + food._id
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the foods.'
        }));
    });
};
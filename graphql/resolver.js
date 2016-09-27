'use strict';
require('dotenv').config();

const BasecampClient = require('../lib/basecamp-client.js');

class Resolver {
  constructor(authToken) {
    this.basecampClient = new BasecampClient(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      authToken,
      'Basecamp 3 GraphQL wrapper (oriol@codegram.com)');
  }

  people() {
    return this.basecampClient.getPeople().then(people => people);
  }

  person(id) {
    return this.basecampClient.getPerson(id).then(person => person);
  }

  basecamps() {
    return this.basecampClient.getBasecamps().then(basecamps => basecamps);
  }

  basecamp(id) {
    return this.basecampClient.getBasecamp(id).then(basecamp => basecamp);
  }

  recordings(type) {
    return this.basecampClient.getRecordings(type).then(recordings => recordings);
  }

  messages(basecamp) {
    var message_board = basecamp.dock.find(feature => feature.name === 'message_board');

    console.log(message_board);

    if (message_board === undefined) {
      return [];
    }

    return this.basecampClient.getMessages(basecamp.id, message_board.id).then(messages => messages);
  }

  todos(basecamp) {
    var todoset = basecamp.dock.find(feature => feature.name === 'todoset');

    console.log(todoset);

    if (todoset === undefined) {
      return [];
    }

    return this.basecampClient.getTodos(basecamp.id, todoset.id).then(todos => todos);
  }
}

module.exports = Resolver;

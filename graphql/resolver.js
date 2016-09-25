'use strict';
require('dotenv').config();

const BasecampClient = require('../lib/basecamp-client.js');

class Resolver {
  constructor() {
    this.basecampClient = new BasecampClient(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.OAUTH_TOKEN,
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
}

module.exports = Resolver;

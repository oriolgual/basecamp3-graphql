'use strict';
require('dotenv').config();

const Basecamp = require('../lib/basecamp.js');

class Resolver {
  constructor() {
    this.basecampClient = new Basecamp(
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
}

module.exports = Resolver;

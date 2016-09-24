'use strict';
require('dotenv').config();

const Basecamp = require('../lib/basecamp.js');

class Resolver {
  constructor() {
    this.basecamp = new Basecamp(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.OAUTH_TOKEN,
      'Basecamp 3 GraphQL wrapper (oriol@codegram.com)');
  }

  people() {
    return this.basecamp.getPeople().then(people => people);
  }

  person(id) {
    return this.basecamp.getPerson(id).then(person => person);
  }
}

module.exports = Resolver;

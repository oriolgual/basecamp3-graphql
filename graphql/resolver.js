'use strict';

class Resolver {
  constructor(basecampClient) {
    this.basecampClient = basecampClient;
  }

  accounts() {
    return this.basecampClient.getAccounts();
  }

  people(accountId) {
    return this.basecampClient.getPeople(accountId);
  }

  person(accountId, id) {
    return this.basecampClient.getPerson(accountId, id);
  }

  basecamps(accountId) {
    return this.basecampClient.getBasecamps(accountId);
  }

  basecamp(accountId, id) {
    return this.basecampClient.getBasecamp(accountId, id);
  }

  messages(basecamp) {
    var message_board = basecamp.dock.find(feature => feature.name === 'message_board');

    if (message_board === undefined) {
      return [];
    }

    var accountId = basecamp.url.split('/')[3];

    return this.basecampClient.getMessages(accountId, basecamp.id, message_board.id);
  }

  todolists(basecamp) {
    var todoset = basecamp.dock.find(feature => feature.name === 'todoset');

    if (todoset === undefined) {
      return [];
    }

    var accountId = basecamp.url.split('/')[3];

    return this.basecampClient.getTodolists(accountId, basecamp.id, todoset.id);
  }

  todos(url, basecamp, todolist) {
    var accountId = url.split('/')[3];
    return this.basecampClient.getTodos(accountId, basecamp.id, todolist.id);
  }

  comments(url, basecamp, recording) {
    var accountId = url.split('/')[3];
    return this.basecampClient.getComments(accountId, basecamp.id, recording.id);
  }
}

module.exports = Resolver;

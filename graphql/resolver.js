'use strict';

class Resolver {
  constructor(basecampClient) {
    this.basecampClient = basecampClient;
  }

  people() {
    return this.basecampClient.getPeople();
  }

  person(id) {
    return this.basecampClient.getPerson(id);
  }

  basecamps() {
    return this.basecampClient.getBasecamps();
  }

  basecamp(id) {
    return this.basecampClient.getBasecamp(id);
  }

  recordings(type) {
    return this.basecampClient.getRecordings(type);
  }

  messages(basecamp) {
    var message_board = basecamp.dock.find(feature => feature.name === 'message_board');

    if (message_board === undefined) {
      return [];
    }

    return this.basecampClient.getMessages(basecamp.id, message_board.id);
  }

  todolists(basecamp) {
    var todoset = basecamp.dock.find(feature => feature.name === 'todoset');

    if (todoset === undefined) {
      return [];
    }

    return this.basecampClient.getTodolists(basecamp.id, todoset.id);
  }

  todos(basecamp, todolist) {
    return this.basecampClient.getTodos(basecamp.id, todolist.id);
  }

  comments(basecamp, recording) {
    return this.basecampClient.getComments(basecamp.id, recording.id);
  }
}

module.exports = Resolver;

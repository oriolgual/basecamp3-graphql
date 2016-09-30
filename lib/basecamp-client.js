'use strict';
var rp = require('request-promise-native');

class BasecampClient {
  constructor(basecampAuth, oAuth, userAgent) {
    this._basecampAuth = basecampAuth;
    this.oAuth = oAuth;
    this.userAgent = userAgent;
  }

  getAccounts() {
    return this._basecampRequest('https://launchpad.37signals.com/authorization.json')
      .then(authorization => authorization.accounts.filter(account => account.product === "bc3"));
  }

  getPeople(accountId) {
    return this._getCollection(accountId, 'people');
  }

  getPerson(accountId, id) {
    return this._getElement(accountId, 'people', id);
  }

  getBasecamps(accountId) {
    return this._getCollection(accountId, 'projects');
  }

  getBasecamp(accountId, id) {
    return this._getElement(accountId, 'projects', id);
  }

  getMessages(accountId, basecampId, messageBoardId) {
    return this._getBucketCollection(accountId, basecampId, "message_boards", messageBoardId, "messages");
  }

  getTodolists(accountId, basecampId, todosetId) {
    return this._getBucketCollection(accountId, basecampId, "todosets", todosetId, "todolists");
  }

  getTodos(accountId, basecampId, todolistId) {
    return this._getBucketCollection(accountId, basecampId, "todolists", todolistId, "todos");
  }

  getComments(accountId, basecampId, recordingId) {
    return this._getBucketCollection(accountId, basecampId, "recordings", recordingId, "comments");
  }

  _getBucketCollection(accountId, bucketId, scope, scopeId, name) {
    return this._getCollection(accountId, "buckets/" + bucketId + "/" + scope + "/" + scopeId + "/" + name);
  }

  _getCollection(accountId, name, queryString) {
    if (queryString === undefined) {
      queryString = "";
    }

    var url = "https://3.basecampapi.com/" + accountId + "/" + name + ".json" + queryString;
    return this._basecampRequest(url);
  }

  _getElement(accountId, name, id, queryString) {
    if (queryString === undefined) {
      queryString = "";
    }

    var url = "https://3.basecampapi.com/" + accountId + "/" + name + "/" + id + ".json" + queryString;
    return this._basecampRequest(url);
  }

  _basecampRequest(url) {
    var options = {
      uri: url,
      auth: {
        bearer: this.oAuth.access_token
      },
      headers: {
        'User-Agent': this.userAgent
      },
      json: true
    };

    return rp(options)
    .then(function(body) {
      return body;
    })
    .catch(function(error) {
      console.error('Something went wrong with the Basecamp3 API!');
      console.error(error);
    });
  }
}

module.exports = BasecampClient;

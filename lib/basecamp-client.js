'use strict';
var Q = require('q');
var request = require('request');

class BasecampClient {
  constructor(basecampAuth, oAuth, userAgent) {
    this._basecampAuth = basecampAuth;
    this.oAuth = oAuth;
    this.userAgent = userAgent;
  }

  get authToken() {
    return this.oAuth.access_token;
  }

  get accountId() {
    if (this._accountId) {
      return Q.when(this._accountId);
    }

    let deferred = Q.defer();
    this._fetchAccountId().then(accountId => {
      this._accountId = accountId;
      deferred.resolve(this._accountId);
    });

    return deferred.promise;
  }

  getPeople() {
    return this._getCollection('people');
  }

  getPerson(id) {
    return this._getElement('people', id);
  }

  getBasecamps() {
    return this._getCollection('projects');
  }

  getBasecamp(id) {
    return this._getElement('projects', id);
  }

  getRecordings(type) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/projects/recordings.json?type=" + type)
      .then((url) => this._basecampRequest(url))
  }

  getMessages(basecamp_id, message_board_id) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/buckets/" + basecamp_id + "/message_boards/" + message_board_id +"/messages.json")
      .then((url) => this._basecampRequest(url))
  }

  getTodolists(basecamp_id, todoset_id) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/buckets/" + basecamp_id + "/todosets/" + todoset_id +"/todolists.json")
      .then((url) => this._basecampRequest(url))
  }

  _getCollection(name) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/" + name + ".json")
      .then((url) => this._basecampRequest(url))
  }

  _getElement(name, id) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/" + name + "/" + id + ".json")
      .then((url) => this._basecampRequest(url))
  }

  _fetchAccountId() {
    var deferred = Q.defer();

    request.get('https://launchpad.37signals.com/authorization.json', {auth: {bearer: this.authToken}}, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        deferred.resolve(
          JSON.parse(body).accounts.find(account => account.product === 'bc3').id
        );
      } else {
        console.error('Something went wrong with the Basecamp3 API!');
        console.error('Status code: ' + response.statusCode);
        console.error(response.body);
        deferred.resolve(null);
      }
    });

    return deferred.promise;
  }

  _basecampRequest(url) {
    var deferred = Q.defer();

    request.get(url, {auth: {bearer: this.authToken}, headers: {'User-Agent': this.userAgent}}, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        deferred.resolve(JSON.parse(body));
      } else {
        console.error('Something went wrong with the Basecamp3 API!');
        console.error('Status code: ' + response.statusCode);
        console.error(response.body);
        deferred.resolve({});
      }
    });

    return deferred.promise;
  }
}

module.exports = BasecampClient;

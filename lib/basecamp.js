'use strict';
var Q = require('q');
var request = require('request');
const BasecampAuth = require('./basecamp-auth.js');

class Basecamp {
  constructor(client_id, client_secret, oldToken, userAgent) {
    this.userAgent = userAgent;
    this.oldToken = oldToken;
    this._basecampAuth = new BasecampAuth(client_id, client_secret);
  }

  get authToken() {
    if (this._authToken) {
      return Q.when(this._authToken);
    }

    let deferred = Q.defer();
    this._basecampAuth.refreshToken(this.oldToken).then(token => {
      this._authToken = token.access_token;
      deferred.resolve(this._authToken);
    });

    return deferred.promise;
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
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/people.json")
      .then((url) => this._basecampRequest(url))
  }

  getPerson(id) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/people/" + id + ".json")
      .then((url) => this._basecampRequest(url))
  }

  getBasecamps() {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/projects.json")
      .then((url) => this._basecampRequest(url))
  }

  getBasecamp(id) {
    return this.accountId
      .then(accountId => "https://3.basecampapi.com/" + accountId + "/projects/" + id + ".json")
      .then((url) => this._basecampRequest(url))
  }

  _fetchAccountId() {
    var deferred = Q.defer();

    this.authToken
    .then(authToken => {
      request.get('https://launchpad.37signals.com/authorization.json', {auth: {bearer: authToken}}, function(error, response, body) {
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
      })
    });

    return deferred.promise;
  }

  _basecampRequest(url) {
    var deferred = Q.defer();
    this.authToken
    .then(authToken => {
      request.get(url, {auth: {bearer: authToken}, headers: {'User-Agent': this.userAgent}}, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          deferred.resolve(JSON.parse(body));
        } else {
          console.error('Something went wrong with the Basecamp3 API!');
          console.error('Status code: ' + response.statusCode);
          console.error(response.body);
          deferred.resolve({});
        }
      })
    });

    return deferred.promise;
  }
}

module.exports = Basecamp;

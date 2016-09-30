'use strict';
require('dotenv').config();

// Follow instructions at https://github.com/basecamp/api/blob/master/sections/authentication.md#oauth-2
var simpleOauth = require('simple-oauth2');

class BasecampAuth {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.oauth2 = simpleOauth({
      clientID: clientId,
      clientSecret: clientSecret,
      site: 'https://launchpad.37signals.com',
      tokenPath: '/authorization/token',
      authorizationPath: '/authorization/new'
    });
  }

  authorizationUri() {
    return this.oauth2.authCode.authorizeURL({
      redirect_uri: process.env.OAUTH_REDIRECT_URI,
      type: 'web_server'
    });
  }

  createToken(code) {
    let tokenConfig = {
      code: code,
      redirect_uri: process.env.OAUTH_REDIRECT_URI,
      type: 'web_server',
      client_id: this.cliendId,
      client_secret: this.clientSecret
    };

    return this.oauth2.authCode.getToken(tokenConfig, (error, result) => this._saveToken(error, result));
  }

  refreshToken(refreshToken) {
    let tokenConfig = {
      type: 'refresh',
      client_id: this.cliendId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken
    };

    return this.oauth2.authCode.getToken(tokenConfig, (error, result) => this._saveToken(error, result));
  }

  _saveToken(error, result) {
    if (error && error.context.error === 'authorization_expired') {
      console.log("We are fucked!");
      console.log(error);
      return {};
    } else if (error) {
      console.log('Access Token Error');
      console.log(error);
      return {};
    }

    if (result) {
      return this.oauth2.accessToken.create(result);
    }
  }
}

module.exports = BasecampAuth;

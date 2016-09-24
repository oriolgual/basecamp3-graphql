'use strict';
// Follow instructions at https://github.com/basecamp/api/blob/master/sections/authentication.md#oauth-2
var simpleOauth = require('simple-oauth2');
var prompt = require('prompt');

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
      redirect_uri: 'https://basecamp3slack.com/auth',
      type: 'web_server'
    });
  }

  createToken() {
    console.log("Go to this URL and then paste the auth_code URL param: " + this.authorizationUri());
    prompt.start();

    let property = {
      name: 'code',
      message: 'Paste the auth_code from the redirect URI'
    };

    prompt.get(property, (err, result) => {
      let tokenConfig = {
        code: result.code,
        redirect_uri: 'https://basecamp3slack.com/auth',
        type: 'web_server',
        client_id: this.cliendId,
        client_secret: this.clientSecret
      };

      return this.oauth2.authCode.getToken(tokenConfig, (error, result) => this._saveToken(error, result));
    });
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
    if (error) {
      console.log('Access Token Error', error);
      return {};
    }

    if (result) {
      return this.oauth2.accessToken.create(result);
    }
  }
}

module.exports = BasecampAuth;

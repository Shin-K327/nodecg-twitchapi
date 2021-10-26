import axios from 'axios';
import { NodeCG } from './nodecg';
import { AccsessToken } from '../nodecg/generated';
import { resValidate } from './responsetypes';

export const twitchAuth = (nodecg: NodeCG): void => {
  const client_id = nodecg.bundleConfig.twitch.client_id || null;
  const client_secret = nodecg.bundleConfig.twitch.client_secret || null;
  const scopes = nodecg.bundleConfig.twitch.scopes || null;
  const state = nodecg.bundleConfig.twitch.state || null;

  if (!client_id || !client_secret || !scopes || !state) {
    console.log('バンドルコンフィグの必要項目が未入力です');
    return;
  }

  // define Replicant
  const validateStatusRep = nodecg.Replicant('validateStatus', {
    persistent: true,
    defaultValue: { is_valid: false },
  });

  const accessTokenRep = nodecg.Replicant('accessToken', {
    persistent: true,
    defaultValue: null,
  });

  const app = nodecg.Router();
  const api = axios.create({
    baseURL: 'https://id.twitch.tv/oauth2/',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 3000,
  });

  // Token validation
  accessTokenRep.on('change', (newValue) => {
    if (newValue) {
      api
        .get<resValidate>('validate', {
          headers: {
            Authorization: `Bearer ${newValue.access_token}`,
          },
        })
        .then((response) => {
          validateStatusRep.value = {
            ...validateStatusRep.value,
            client_id: response.data.client_id,
            login: response.data.login,
            user_id: response.data.user_id,
            expires_in: response.data.expires_in,
            is_valid: true,
          };
        })
        .catch((error) => {
          console.log(error.response.data.message);
          validateStatusRep.value = { is_valid: false };
        });
    } else if (validateStatusRep) {
      validateStatusRep.value = { ...validateStatusRep.value, is_valid: false };
    }
  });

  // define messages
  nodecg.listenFor('requestApi', (message) => {
    if (
      accessTokenRep.value &&
      validateStatusRep.value &&
      validateStatusRep.value.client_id
    ) {
      axios({
        params: { broadcaster_id: validateStatusRep.value.user_id },
        method: message.method,
        url: message.url,
        data: message.data,
        headers: {
          Authorization: `Bearer ${accessTokenRep.value.access_token}`,
          'Client-ID': validateStatusRep.value.client_id,
        },
      })
        .then((response) => {
          console.log(response.status, response.statusText);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      console.log('token is not ready');
    }
  });

  //  define routers
  app.get('/twitch-api/redirect', (req, res) => {
    if (req.query.code && req.query.scope && req.query.state === state) {
      api
        .post<AccsessToken>('token', {
          client_id: client_id,
          client_secret: client_secret,
          code: req.query.code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:9090/twitch-api/redirect',
        })
        .then((response) => {
          accessTokenRep.value = response.data;
          res.send('トークン取得成功、画面を閉じてください');
        })
        .catch((error) => {
          res.send(`トークン取得失敗
          設定を再確認してください。
          ${error.response.data.message}`);
        });
    } else {
      res.send('ここはトークンリダイレクト用ページです');
      if (req.body) {
        console.log(req.body);
      }
    }
  });

  nodecg.mount(app);
};

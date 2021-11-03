import axios from 'axios';
import { NodeCG } from './nodecg';
import { AccsessToken, AppToken } from '../nodecg/generated';
import { ValidateStatus } from '../nodecg/generated';

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
    defaultValue: null,
  });

  const accessTokenRep = nodecg.Replicant('accessToken', {
    persistent: true,
    defaultValue: null,
  });

  const appTokenRep = nodecg.Replicant('appToken', {
    persistent: false,
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
        .get<ValidateStatus>('validate', {
          headers: {
            Authorization: `Bearer ${newValue.access_token}`,
          },
        })
        .then((response) => {
          if (response.data) {
            validateStatusRep.value = {
              ...response.data,
              access_token: newValue.access_token,
            };
            getAppToken();
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          validateStatusRep.value = null;
        });
    } else {
      validateStatusRep.value = null;
    }
  });

  // get app token
  const getAppToken = () => {
    api
      .post<AppToken>('token', {
        client_id: nodecg.bundleConfig.twitch.client_id,
        client_secret: nodecg.bundleConfig.twitch.client_secret,
        grant_type: 'client_credentials',
        scope: nodecg.bundleConfig.twitch.scopes.join(' '),
      })
      .then((response) => {
        appTokenRep.value = response.data;
        console.log('app token is ready to use');
      })
      .catch((error) => {
        console.log(`error! failed to get token\n${error.response.message}`);
      });
  };

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

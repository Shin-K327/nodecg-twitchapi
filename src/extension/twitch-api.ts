import { NodeCG } from './nodecg';
import axios from 'axios';
import { TChannelInfo, TCommercial } from '../nodecg/event_response';
import { ReplicantMap } from '../nodecg/replicants';

export const twitchApi = (nodecg: NodeCG) => {
  let authData: ReplicantMap['validateStatus'] = null;

  nodecg.Replicant('validateStatus').on('change', (newValue) => {
    if (newValue) {
      authData = newValue;
    }
  });

  const api = axios.create({
    baseURL: 'https://api.twitch.tv/helix/',
    timeout: 3000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    if (authData) {
      config.headers = {
        Authorization: `Bearer ${authData.access_token}`,
        'Client-Id': authData.client_id,
      };
      return config;
    }
  });

  nodecg.listenFor('reqStartCommercial', (data, ack) => {
    if (authData && ack && !ack.handled) {
      api
        .post<TCommercial['result']>('channels/commercial', {
          broadcaster_id: authData.user_id,
          length: data.length,
        })
        .then((res) => {
          ack(null, res.data);
        })
        .catch((err) => {
          ack(new Error(err.response.data.message));
        });
    }
  });

  nodecg.listenFor('reqGetChannelInfo', (data, ack) => {
    if (authData && ack && !ack.handled) {
      api
        .get<TChannelInfo['result']>('channels', {
          params: {
            broadcaster_id: authData.user_id,
          },
        })
        .then((res) => {
          ack(null, res.data);
        })
        .catch((err) => {
          ack(new Error(err.response.data.message));
        });
    }
  });
};

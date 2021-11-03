import { NodeCG } from './nodecg';
import axios from 'axios';
import { TSublist, TSubscription } from '../nodecg/event_response';
import { httpsUrl } from './local_settings';

// ngrok public url, please define yourself
const callbackUrl = httpsUrl;
const path = '/twitch-api/listener';

export const eventSub = (nodecg: NodeCG) => {
  if (!nodecg.bundleConfig.twitch.secret) {
    console.log('EventSub機能を使用するにはSecretの定義が必要です');
    return;
  }

  const eventSubscriptionRep = nodecg.Replicant('eventSubscription', {
    persistent: true,
    defaultValue: [],
  });

  const receivedEventRep = nodecg.Replicant('receivedEvent', {
    persistent: true,
    defaultValue: [],
  });

  const app = nodecg.Router();

  nodecg.listenFor('mountSubscription', (data, ack) => {
    const auth = nodecg.readReplicant('validateStatus') || null;
    const token = nodecg.readReplicant('appToken') || null;
    if (auth && token && data && ack && !ack.handled) {
      axios
        .post<TSubscription['result']>(
          'https://api.twitch.tv/helix/eventsub/subscriptions',
          {
            type: data,
            version: '1',
            condition: {
              broadcaster_user_id: auth.user_id,
            },
            transport: {
              method: 'webhook',
              callback: `${callbackUrl}${path}`,
              secret: nodecg.bundleConfig.twitch.secret,
            },
          },
          {
            headers: {
              'Client-ID': auth.client_id,
              Authorization: `Bearer ${token.access_token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          ack(null, res.data);
        })
        .catch((err) => {
          console.log(err.response);
          ack(new Error(err.response));
        });
    }
  });

  nodecg.listenFor('unmountAllSubscription', (data, ack) => {
    const auth = nodecg.readReplicant('validateStatus') || null;
    const token = nodecg.readReplicant('appToken') || null;
    if (auth && token && ack && !ack.handled) {
      axios
        .get<TSublist>('https://api.twitch.tv/helix/eventsub/subscriptions', {
          headers: {
            'Client-ID': auth.client_id,
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          res.data.data.map((item) => {
            axios
              .delete('https://api.twitch.tv/helix/eventsub/subscriptions', {
                headers: {
                  'Client-ID': auth.client_id,
                  Authorization: `Bearer ${token.access_token}`,
                  'Content-Type': 'application/json',
                },
                params: {
                  id: item.id,
                },
              })
              .then((res) => {
                console.log(`unmount successed ${res.status}\n${item.type} had already been removed`);
              })
              .catch((err) => {
                console.log(err.response.status);
              });
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  });

  app.post(path, (req, res) => {
    if (req.body.challenge && req.body.subscription) {
      res.send(req.body.challenge);
      eventSubscriptionRep.value.unshift(req.body.subscription);
      console.log('mount successed !!');
    } else if (req.body.event) {
      receivedEventRep.value.unshift(req.body.event);
      console.log(req.body);
      console.log(`receive notification`);
    }
  });

  nodecg.mount(app);
};

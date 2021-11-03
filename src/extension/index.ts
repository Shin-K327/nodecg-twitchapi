import { NodeCG } from './nodecg';
import { twitchAuth } from './twitch-auth';
import { eventSub } from './twitch-event';
import { twitchApi } from './twitch-api';

export = (nodecg: NodeCG): void => {
  twitchAuth(nodecg);
  eventSub(nodecg);
  twitchApi(nodecg);
};

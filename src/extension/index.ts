import { NodeCG } from './nodecg';
import { twitchAuth } from './twitch-auth';

export = (nodecg: NodeCG): void => {
  twitchAuth(nodecg);
};

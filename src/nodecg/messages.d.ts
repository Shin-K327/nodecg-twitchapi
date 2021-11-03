import { TChannelInfo, TCommercial, TSublist, TSubscription } from './event_response';

export type MessageMap = {
  refreshToken: { data: null };
  reqStartCommercial: TCommercial;
  reqGetChannelInfo: TChannelInfo;
  mountSubscription: TSubscription;
  unmountAllSubscription: { data: null; result: TSublist };
};

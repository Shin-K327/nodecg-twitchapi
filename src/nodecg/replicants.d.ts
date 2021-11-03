import { AccsessToken, EventSubscription, RecievedEvent } from './generated';
import { ValidateStatus } from './generated';
import { AppToken } from './generated';

export type ReplicantMap = {
  accessToken: AccsessToken;
  appToken: AppToken;
  validateStatus: ValidateStatus;
  eventSubscription: EventSubscription;
  receivedEvent: RecievedEvent;
};

import { AccsessToken } from './generated';
import { ValidateStatus } from './generated';

export type ReplicantMap = {
  accessToken: AccsessToken;
  validateStatus: ValidateStatus;
};

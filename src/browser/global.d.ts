import {
  CreateNodecgInstance,
  CreateNodecgConstructor,
} from 'ts-nodecg/browser';
import { MessageMap } from '../nodecg/messages';
import { ReplicantMap } from '../nodecg/replicants';
import { Configschema } from '../nodecg/generated';

declare global {
  const nodecg: CreateNodecgInstance<
    'twitch_api',
    Configschema,
    ReplicantMap,
    MessageMap
  >;
  const NodeCG: CreateNodecgConstructor<
    'twitch_api',
    Configschema,
    ReplicantMap,
    MessageMap
  >;
}

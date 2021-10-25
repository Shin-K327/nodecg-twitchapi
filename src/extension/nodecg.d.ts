import { Router, RouterOptions } from 'express';
import { CreateNodecgInstance } from 'ts-nodecg/server';
import { MessageMap } from '../nodecg/messages';
import { ReplicantMap } from '../nodecg/replicants';
import { Configschema } from '../nodecg/generated';

export type NodeCG = CreateNodecgInstance<
  'twitch_api',
  Configschema,
  ReplicantMap,
  MessageMap
> & {
  Router(options?: RouterOptions): Router;
};

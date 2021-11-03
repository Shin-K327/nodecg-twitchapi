export type resValidate = {
  client_id: string;
  login: string;
  scopes: Array<string>;
  user_id: string;
  expires_in: number;
};

type eventSubData = {
  id: string;
  status: string;
  type: string;
  version: string;
  cost: number;
  condition: object;
  transport: {
    method: string;
    callback: string;
  };
  created_at: string;
};

export type resEventSub = {
  data: eventSubData[];
  total: number;
  total_cost: number;
  max_total_cost: number;
};

export type resCommercial = {
  length: number;
  message: string;
  retry_after: number;
}[];

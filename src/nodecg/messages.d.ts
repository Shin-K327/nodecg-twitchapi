
type TCreateStateMsg = {
  data: string;
};

type TAuthObject = {
  client_id?: string;
  client_secret?: string;
  state?: string;
};

type TIdAndSecret = {
  data: TAuthObject;
};

type TApiData = {
  method: 'get' | 'post' | 'patch' | 'put';
  url: string;
  data?: object;
};

type TRequestApi = {
  data: TApiData;
};

export type MessageMap = {
  createState: TCreateStateMsg;
  idAndSecret: TIdAndSecret;
  requestApi: TRequestApi;
  refreshToken: { data: null };
  mountListener: { data: boolean };
  startCm: { data: null };
};

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

type TRefreshToken = {
  data: null;
};

export type MessageMap = {
  createState: TCreateStateMsg;
  idAndSecret: TIdAndSecret;
  refreshToken: TRefreshToken;
  mountListner: { data: boolean };
  startCm: { data: null };
};

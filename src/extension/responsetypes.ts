export type resValidate = {
  client_id: string;
  login: string;
  scopes: Array<string>;
  user_id: string;
  expires_in: number;
};

export type resCommercial = {
  length: number;
  message: string;
  retry_after: number;
}[];

export type resGames = {
  box_art_url: string;
  id: string;
  name: string;
};

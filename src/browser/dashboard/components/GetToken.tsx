import React from 'react';

const client_id = nodecg.bundleConfig.twitch.client_id;
const scopes = nodecg.bundleConfig.twitch.scopes.join(' ');
const redirect_uri = 'http://localhost:9090/twitch-api/redirect';
const state = nodecg.bundleConfig.twitch.state;
const baseUrl = 'https://id.twitch.tv/oauth2/authorize';
const authUrl = `${baseUrl}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes}&state=${state}`;

export const GetToken: React.FC = () => {
  const clickGetToken = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.open(authUrl);
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={clickGetToken}>トークンを取得する</button>
    </div>
  );
};

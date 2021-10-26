import React, { useState } from 'react';

export const UseApi: React.FC = () => {
  const [chInfo, setChInfo] = useState<{
    gameid?: string;
    broadcaster_language?: string;
    title: string;
  } | null>(null);

  const onInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChInfo({ ...chInfo, title: e.target.value });
  };

  const onClickSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (chInfo != null) {
      nodecg.sendMessage('requestApi', {
        method: 'patch',
        url: 'https://api.twitch.tv/helix/channels',
        data: chInfo,
      });
    }
	e.preventDefault()
  };

  return (
    <div>
      <form>
        <label>配信タイトル</label>
        <input type="text" onChange={onInputTitle} />
        <button onClick={onClickSubmit}>更新</button>
      </form>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { TChannelInfo, TCommercial } from '../../../nodecg/event_response';

export const UseApi: React.FC = () => {
  const [result, setResult] = useState<TCommercial['result'] | null>(null);
  const [info, setInfo] = useState<TChannelInfo['result'] | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (result) {
      let count = result.data[0].retry_after;
      const clear = setTimeout(() => {
        setTimer(count);
        count -= 1;
        if (count == 0) {
          clearInterval(clear);
          setTimer(null);
        }
      }, 1000);
      return () => {
        clearInterval(clear);
        setTimer(null);
      };
    }
  }, [result]);

  const onClickStartCm = (e: React.MouseEvent<HTMLButtonElement>) => {
    nodecg
      .sendMessage('reqStartCommercial', { length: 30 })
      .then((result) => {
        setResult(result);
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  const onClickGetInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    nodecg
      .sendMessage('reqGetChannelInfo', null)
      .then((result) => {
        console.log('Success!!');
        setInfo(result);
      })
      .catch(() => {
        console.log('error!!');
      });
    e.preventDefault();
  };

  const onClickMountEventSub = (e: React.MouseEvent<HTMLButtonElement>) => {
    nodecg.sendMessage('mountSubscription', 'channel.follow');
    e.preventDefault();
  };

  const onClickUnmountAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    nodecg.sendMessage('unmountAllSubscription', null);
    e.preventDefault();
  };

  return (
    <div>
      <button onClick={onClickStartCm}>CM再生開始</button>
      <p>リトライカウント：{timer ? timer : '--'}</p>
      <button onClick={onClickGetInfo}>情報取得</button>
      {info != null &&
        info.data.map((item, key) => (
          <span key={key}>
            <h2>{item.title}</h2>
            <h3>{item.game_name}</h3>
            <h5>
              {item.broadcaster_login}/{item.broadcaster_name}
            </h5>
          </span>
        ))}
      <button onClick={onClickMountEventSub}>通知取得開始</button>
      <button onClick={onClickUnmountAll}>サブスクリプション削除</button>
    </div>
  );
};

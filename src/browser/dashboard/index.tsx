import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { GetToken } from './components/GetToken';
import { UseApi } from './components/UseApi';

const config = nodecg.bundleConfig.twitch;
const validateStatusRep = nodecg.Replicant('validateStatus');

const App: React.FC = () => {
  const [tokenState, setTokenState] = useState<boolean>(false);

  useEffect(() => {
    validateStatusRep.on('change', (newValue) => {
      if (newValue != null) {
        setTokenState(true);
      }
    });
    return () => {
      validateStatusRep.removeAllListeners('change');
    };
  }, []);

  if (
    !config.client_id ||
    !config.client_secret ||
    !config.scopes ||
    !config.state
  ) {
    return (
      <div>
        <h3>バンドルコンフィグを設定してください</h3>
        <p>
          ここにバンドルコンフィグテンプレートとnodecg/cfg/に設置するよう促す文章云々
        </p>
      </div>
    );
  } else if (!tokenState) {
    return <GetToken />;
  } else if (tokenState) {
    return <UseApi />;
  }

  return <div>loading...{tokenState}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { GetToken } from './components/GetToken';
import { UseApi } from './components/UseApi';

const config = nodecg.bundleConfig.twitch;
const validateStatusRep = nodecg.Replicant('validateStatus');

const App: React.FC = () => {
  const [tokenState, setTokenState] = useState<boolean | null>(null);

  useEffect(() => {
    validateStatusRep.on('change', (newValue) => {
      console.log(newValue);
      if (newValue != null) {
        setTokenState(newValue.is_valid);
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
  } else if (tokenState === false) {
    return <GetToken />;
  } else if (tokenState) {
    return <UseApi />;
  }

  return <div>loading...{tokenState}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

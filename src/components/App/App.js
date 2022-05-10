import AstroApp from '../AstroApp/AstroApp';
import { getChainOptions, WalletProvider, } from '@terra-money/wallet-provider';
import ReactDOM from 'react-dom';


function App() {
  return (
    <AstroApp/>
  );
}

export default App;

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
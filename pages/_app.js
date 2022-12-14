import Layout from '../containers/Layout'
import { AuthContextProvider } from '../context/AuthContext'
import {
  getChainOptions,
  StaticWalletProvider,
  WalletControllerChainOptions,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { AppProps } from 'next/app';
import '../styles/globals.css'

 export default function App({ Component, defaultNetwork, walletConnectChainIds }= AppProps && WalletControllerChainOptions ) {
  
  const main = (
        <AuthContextProvider >
            <Layout>
              <Component  />
            </Layout>
        </AuthContextProvider>
  )
  
    
  return typeof window !== 'undefined' ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
  
}
App.getInitialProps = async () => {
  const chainOptions = await getChainOptions();
  return {
    ...chainOptions,
  };
};



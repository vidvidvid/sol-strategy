import React, { useMemo } from "react";
import { ChakraProvider, Box, VStack, Heading } from "@chakra-ui/react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import LoginScreen from "./components/LoginScreen";
import CharacterSelectionScreen from "./components/CharacterSelectionScreen";
import MainUI from "./components/MainUI";
import { AppProvider, useAppContext } from "./context/AppContext";

require("@solana/wallet-adapter-react-ui/styles.css");

const AppContent: React.FC = () => {
  const { isLoggedIn, selectedCharacter } = useAppContext();

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Box textAlign='center' fontSize='xl'>
            <VStack spacing={8}>
              <Heading>Sol Strategy</Heading>
              {!isLoggedIn ? (
                <LoginScreen />
              ) : !selectedCharacter ? (
                <CharacterSelectionScreen />
              ) : (
                <MainUI />
              )}
            </VStack>
          </Box>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;

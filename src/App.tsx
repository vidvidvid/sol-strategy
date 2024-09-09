import React, { useMemo, useState } from "react";
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

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSelectCharacter = (character: string) => {
    setSelectedCharacter(character);
  };

  return (
    <ChakraProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <Box textAlign='center' fontSize='xl'>
              <VStack spacing={8}>
                <Heading>Sol Strategy</Heading>
                {!isLoggedIn ? (
                  <LoginScreen onLogin={handleLogin} />
                ) : !selectedCharacter ? (
                  <CharacterSelectionScreen
                    onSelectCharacter={handleSelectCharacter}
                  />
                ) : (
                  <MainUI selectedCharacter={selectedCharacter} />
                )}
              </VStack>
            </Box>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
}

export default App;

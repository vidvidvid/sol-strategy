import React, { useEffect } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAppContext } from "../context/AppContext";
import { createUser, getUserByPublicKey } from "../api";

const LoginScreen: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { setIsLoggedIn } = useAppContext();

  useEffect(() => {
    const handleLogin = async () => {
      if (connected && publicKey) {
        try {
          let user = await getUserByPublicKey(publicKey.toString());
          if (!user) {
            user = await createUser({ publicKey: publicKey.toString() });
          }
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error logging in:", error);
        }
      }
    };

    handleLogin();
  }, [connected, publicKey, setIsLoggedIn]);

  return (
    <Box
      maxWidth='400px'
      margin='auto'
      padding={6}
      borderWidth={1}
      borderRadius='lg'
    >
      <VStack spacing={4}>
        <Text fontSize='2xl' fontWeight='bold'>
          Welcome to Sol Strategy
        </Text>
        <WalletMultiButton />
        {connected && <Text color='green.500'>Wallet connected!</Text>}
      </VStack>
    </Box>
  );
};

export default LoginScreen;

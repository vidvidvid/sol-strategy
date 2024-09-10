import React, { useEffect, useState } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAppContext } from "../context/AppContext";
import { createUser, getUserByPublicKey } from "../api";

const LoginScreen: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { setIsLoggedIn } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async () => {
      if (connected && publicKey) {
        setIsLoading(true);
        setError(null);
        try {
          let user = await getUserByPublicKey(publicKey.toString());
          if (!user) {
            // User doesn't exist, automatically create a new account
            user = await createUser({ publicKey: publicKey.toString() });
          }
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error during login process:", error);
          setError("An error occurred. Please try again.");
        } finally {
          setIsLoading(false);
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
        {isLoading && <Text>Loading...</Text>}
        {error && <Text color='red.500'>{error}</Text>}
      </VStack>
    </Box>
  );
};

export default LoginScreen;

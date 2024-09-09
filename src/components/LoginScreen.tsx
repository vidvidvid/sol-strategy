import React, { useEffect } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const { connected } = useWallet();

  useEffect(() => {
    if (connected) {
      onLogin();
    }
  }, [connected, onLogin]);

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

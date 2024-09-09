import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  Button,
} from "@chakra-ui/react";
import { FaUserNinja, FaUserGraduate, FaUserShield } from "react-icons/fa";

interface MainUIProps {
  selectedCharacter: string;
}

const MainUI: React.FC<MainUIProps> = ({ selectedCharacter }) => {
  const [suggestedTrades, setSuggestedTrades] = useState<string[]>([]);

  useEffect(() => {
    // Simulated API call to get suggested trades based on the character
    const fetchSuggestedTrades = () => {
      // This is where you'd normally call your backend or AI service
      const mockTrades = [
        "Long SOL/USDC",
        "Short ETH/USDC",
        "Provide liquidity for RAY/USDC",
      ];
      setSuggestedTrades(mockTrades);
    };

    fetchSuggestedTrades();
  }, [selectedCharacter]);

  const getCharacterIcon = () => {
    switch (selectedCharacter) {
      case "Warrior":
        return FaUserNinja;
      case "Wizard":
        return FaUserGraduate;
      case "Guardian":
        return FaUserShield;
      default:
        return null;
    }
  };

  const CharacterIcon = getCharacterIcon();

  return (
    <Box
      maxWidth='800px'
      margin='auto'
      padding={6}
      borderWidth={1}
      borderRadius='lg'
    >
      <VStack spacing={6} align='stretch'>
        <Box display='flex' alignItems='center'>
          {CharacterIcon && (
            <Box as={CharacterIcon} size='48px' marginRight={4} />
          )}
          <Heading as='h2' size='xl'>
            {selectedCharacter} Dashboard
          </Heading>
        </Box>
        <Text>
          Welcome, {selectedCharacter}! Here are your suggested trades based on
          current market conditions:
        </Text>
        <List spacing={3}>
          {suggestedTrades.map((trade, index) => (
            <ListItem key={index} padding={4} borderWidth={1} borderRadius='md'>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Text>{trade}</Text>
                <Button size='sm' colorScheme='blue'>
                  Execute Trade
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default MainUI;

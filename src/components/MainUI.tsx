import React, { useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/react";
import { FaUserNinja, FaUserGraduate, FaUserShield } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const MainUI: React.FC = () => {
  const {
    selectedCharacter,
    agentActions,
    agentPerformance,
    setAgentActions,
    setAgentPerformance,
  } = useAppContext();

  useEffect(() => {
    // Simulated agent actions (replace with actual Solana program calls later)
    const simulateAgentActions = () => {
      const newAction = {
        type: Math.random() > 0.5 ? "BUY" : "SELL",
        pair: "SOL/USDC",
        amount: Math.random() * 10,
        price: 50 + Math.random() * 10,
        timestamp: Date.now(),
      };
      setAgentActions((prevActions) => [...prevActions, newAction].slice(-10)); // Keep last 10 actions

      // Update performance (replace with actual performance data later)
      setAgentPerformance((prev) => ({
        totalProfit:
          prev.totalProfit + (Math.random() > 0.6 ? 1 : -1) * Math.random() * 5,
        winRate: Math.random() * 100,
        tradeCount: prev.tradeCount + 1,
      }));
    };

    const interval = setInterval(simulateAgentActions, 5000); // Simulate action every 5 seconds
    return () => clearInterval(interval);
  }, [setAgentActions, setAgentPerformance]);

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
          Your {selectedCharacter} agent is actively trading based on its unique
          strategy.
        </Text>
        <StatGroup>
          <Stat>
            <StatLabel>Total Profit</StatLabel>
            <StatNumber>${agentPerformance.totalProfit.toFixed(2)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Win Rate</StatLabel>
            <StatNumber>{agentPerformance.winRate.toFixed(2)}%</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Trades</StatLabel>
            <StatNumber>{agentPerformance.tradeCount}</StatNumber>
          </Stat>
        </StatGroup>
        <Heading as='h3' size='md'>
          Recent Actions
        </Heading>
        <List spacing={3}>
          {agentActions.map((action, index) => (
            <ListItem key={index} padding={4} borderWidth={1} borderRadius='md'>
              <Text>
                {action.type} {action.amount.toFixed(2)} {action.pair} at $
                {action.price.toFixed(2)}
              </Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default MainUI;

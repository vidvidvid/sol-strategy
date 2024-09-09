import React from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  SimpleGrid,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaUserNinja, FaUserGraduate, FaUserShield } from "react-icons/fa";

interface CharacterSelectionScreenProps {
  onSelectCharacter: (character: string) => void;
}

const CharacterSelectionScreen: React.FC<CharacterSelectionScreenProps> = ({
  onSelectCharacter,
}) => {
  const characters = [
    {
      name: "Warrior",
      icon: FaUserNinja,
      description: "Aggressive trader with high risk tolerance",
      risk: 80,
      reward: 90,
      complexity: 70,
    },
    {
      name: "Wizard",
      icon: FaUserGraduate,
      description: "Analytical optimizer with balanced approach",
      risk: 50,
      reward: 70,
      complexity: 90,
    },
    {
      name: "Guardian",
      icon: FaUserShield,
      description: "Conservative protector focused on stability",
      risk: 30,
      reward: 50,
      complexity: 40,
    },
  ];

  return (
    <Box maxWidth='1000px' margin='auto' padding={6}>
      <Heading as='h2' size='xl' textAlign='center' mb={8}>
        Choose Your Trading Character
      </Heading>
      <SimpleGrid columns={[1, null, 3]} spacing={10}>
        {characters.map((character) => (
          <Box key={character.name} borderWidth={1} borderRadius='lg' p={6}>
            <VStack spacing={4}>
              <Box as={character.icon} size='64px' />
              <Heading as='h3' size='lg'>
                {character.name}
              </Heading>
              <Text>{character.description}</Text>
              <Progress
                value={character.risk}
                size='sm'
                width='100%'
                colorScheme='red'
              />
              <Text fontSize='sm'>Risk: {character.risk}%</Text>
              <Progress
                value={character.reward}
                size='sm'
                width='100%'
                colorScheme='green'
              />
              <Text fontSize='sm'>Reward: {character.reward}%</Text>
              <Progress
                value={character.complexity}
                size='sm'
                width='100%'
                colorScheme='blue'
              />
              <Text fontSize='sm'>Complexity: {character.complexity}%</Text>
              <Button
                colorScheme='blue'
                onClick={() => onSelectCharacter(character.name)}
              >
                Select {character.name}
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CharacterSelectionScreen;

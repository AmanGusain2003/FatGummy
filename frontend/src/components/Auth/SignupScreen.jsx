import React, { useState } from 'react';
import { Box, Flex, Input, Button, Text, VStack, Select } from '@chakra-ui/react';

const SignupScreen = ({ switchToLogin }) => {
  const [themeColor, setThemeColor] = useState('pink');
  const [roomName, setRoomName] = useState('');

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="pink.50"
      position="relative"
    >
      {/* Background hearts */}
      {Array.from({ length: 10 }).map((_, index) => (
        <Box
          key={index}
          position="absolute"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          transform="translate(-50%, -50%)"
          fontSize="40px"
          opacity="0.2"
          color="pink.200"
        >
          ❤️
        </Box>
      ))}
      <Box
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        zIndex="1"
      >
        <Text fontSize="2xl" mb={4} color="pink.500">
          Sign Up
        </Text>
        <VStack spacing={4}>
          <Input placeholder="Username" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Select placeholder="Select theme color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)}>
            <option value="pink">Pink</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
          </Select>
          <Input placeholder="Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          <Button colorScheme="pink" width="100%">
            Sign Up
          </Button>
          <Button variant="link" colorScheme="pink" onClick={switchToLogin}>
            Already have an account? Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignupScreen;

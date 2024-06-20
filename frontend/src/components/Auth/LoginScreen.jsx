import React from 'react';
import { Box, Flex, Input, Button, Text, VStack } from '@chakra-ui/react';

const LoginScreen = ({ switchToSignup }) => {
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
          Login
        </Text>
        <VStack spacing={4}>
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Button colorScheme="pink" width="100%">
            Login
          </Button>
          <Button variant="link" colorScheme="pink" onClick={switchToSignup}>
            Don't have an account? Sign Up
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginScreen;

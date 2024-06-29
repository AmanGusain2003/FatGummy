import React, {useState} from 'react';
import { Box, Flex, Input, Button, Text, VStack } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom'

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const base_api_url = import.meta.env.VITE_BASE_API_URL

  const handleLogin = async () => {
    const response = await fetch(`${base_api_url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      window.alert("Login successful")
      // Handle successful signup, e.g., redirect to login or chat page
    } else {
      // Handle signup error
      window.alert("Login failed")
    }
  };

  const navigate = useNavigate()
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
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button colorScheme="pink" width="100%" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="link" colorScheme="pink" onClick={()=> {navigate('/signup')}}>
            Don't have an account? Sign Up
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginScreen;

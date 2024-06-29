import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatInterface from './components/MainChatScreen/ChatInterface';
import LoginScreen from './components/Auth/LoginScreen.jsx';
import SignupScreen from './components/Auth/SignupScreen.jsx';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex direction="column" h="100vh">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/chat" element={<ChatInterface />} />
          </Routes>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;

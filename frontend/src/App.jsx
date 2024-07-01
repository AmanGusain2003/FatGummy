import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatInterface from './components/MainChatScreen/ChatInterface';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import InviteScreen from './components/InviteScreen/InviteScreen';
import { UserProvider } from './components/UserContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <Router>
          <Flex direction="column" h="100vh">
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/invite" element={<InviteScreen />} />
                <Route path="/chat" element={<ChatInterface />} />
                <Route index element={<Navigate to="/chat" />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Flex>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;

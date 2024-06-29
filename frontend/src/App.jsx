import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatInterface from './components/MainChatScreen/ChatInterface';
import LoginScreen from './components/Auth/LoginScreen.jsx';
import SignupScreen from './components/Auth/SignupScreen.jsx';
import { UserProvider } from './components/UserContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <Router>
          <Flex direction="column" h="100vh">
            <Navbar />
            <Routes>
              <Route path="/" element={<PrivateRoute redirectTo="/login" />}>
                <Route path="/" element={<ChatInterface />} />
              </Route>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/chat" element={<PrivateRoute redirectTo="/login" />}>
                <Route path="/chat" element={<ChatInterface />} />
              </Route>
            </Routes>
          </Flex>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;

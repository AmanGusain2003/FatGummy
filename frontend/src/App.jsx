import { ChakraProvider,Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import ChatInterface from './components/MainChatScreen/ChatInterface';

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100vh">
        <Navbar />
        <ChatInterface />
      </Flex>
    </ChakraProvider>
    
  );
}

export default App;

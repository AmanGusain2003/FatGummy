import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const Message = ({ message, isSender, moodColor, emoji }) => {
  return (
    <Flex direction="row" alignItems="center" maxWidth="70%" alignSelf={isSender ? 'flex-end' : 'flex-start'} mb={2}>
      <Text fontSize="2xl" mr={2}>{emoji}</Text>
      <Box 
        borderRadius="lg" 
        p={3} 
        bg={moodColor} 
        color="white" 
        maxHeight="200px"  // Limit the height of the message box
        maxWidth="300px"  // Limit the width of the message box
        overflow="auto"  // Enable scrolling if content exceeds the height
      >
        <Text 
          dangerouslySetInnerHTML={{ 
            __html: message.text.replace(/<img /g, '<img style="max-width: 100%; max-height: 100%; object-fit: contain;" ')
          }}
        />
      </Box>
    </Flex>
  );
};

export default Message;

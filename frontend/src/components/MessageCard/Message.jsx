import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const Message = ({ message, isSender, moodColor, emoji }) => {
  return (
    <Flex direction="row" alignItems="center" maxWidth="70%" alignSelf={isSender ? 'flex-end' : 'flex-start'} mb={2}>
      <Text fontSize="2xl" mr={2}>{emoji}</Text>
      <Box borderRadius="lg" p={3} bg={moodColor} color="white">
        <Text dangerouslySetInnerHTML={{ __html: message.text }}></Text>
      </Box>
    </Flex>
  );
};

export default Message;

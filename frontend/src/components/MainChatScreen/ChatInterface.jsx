import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  VStack,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { UserContext } from '../UserContext';
import { AttachmentIcon } from "@chakra-ui/icons";
import Message from "../MessageCard/Message"; // Ensure correct import path

const ChatInterface = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mood, setMood] = useState(50);
  const [showTooltip, setShowTooltip] = useState(false);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  const moodColors = ["#880808", "#ED8936", "#ECC94B", "#48BB78", "#38B2AC"]; // Colors for each mood
  const moodEmojis = ["😡", "😟", "😐", "😊", "😄"];

  const moodGradient = `linear-gradient(90deg, ${moodColors.join(", ")})`;

  const sendMessage = () => {
    if (input.trim()) {
      const moodIndex = Math.floor(mood / 20); // Dividing by 20 to map the slider value (0-100) to mood array index (0-4)
      const color = moodColors[moodIndex];
      const emoji = moodEmojis[moodIndex];
      const messageWithMood = `${input}`;
      setMessages([
        ...messages,
        { text: messageWithMood, sender: "You", color, emoji },
      ]);
      setInput("");
      console.log(`message sent to partner id: ${user.partnerId}`)
    }
  };

  const handleMediaSend = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        setMessages([
          ...messages,
          {
            text: `<img src="${e.target.result}" alt="uploaded" style="max-width:100%;"/>`,
            sender: "You",
            color: "#48BB78",
            emoji: "😊",
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sliderPosition = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Flex
      flex="1"
      direction="column"
      p={4}
      backgroundColor="pink.50"
      overflow="hidden"
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
      <VStack flex="1" overflowY="auto" spacing={4} px={4} py={2} zIndex="1">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            isSender={message.sender === "You"}
            moodColor={message.color}
            emoji={message.emoji}
          />
        ))}
        <div ref={bottomRef} />
      </VStack>
      <Flex mt={4} alignItems="center" zIndex="1" direction="column">
  <Flex justify="space-between" width="100%">
    {moodEmojis.map((emoji, index) => (
      <Box key={index} textAlign="center" width="20%">
        <Text>{emoji}</Text>
      </Box>
    ))}
  </Flex>
  <Tooltip
    label={moodEmojis[Math.floor(mood / 20)]}
    isOpen={showTooltip}
    placement="top"
  >
    <Slider
      defaultValue={50}
      min={0}
      max={100}
      step={1}
      onChange={(val) => setMood(val)}
      onChangeStart={() => setShowTooltip(true)}
      onChangeEnd={() => setShowTooltip(false)}
      width="100%" // Full width on mobile
      sx={{
        ".chakra-slider__track": {
          background: moodGradient,
          height: "8px",
        },
        ".chakra-slider__thumb": {
          bg: "white",
          borderColor: "gray.300",
        },
      }}
    >
      <SliderTrack>
        <SliderFilledTrack bg="transparent" />
      </SliderTrack>
      <SliderThumb boxSize={6} />
    </Slider>
  </Tooltip>
  <Flex mt={4} alignItems="center" width="100%">
    <IconButton
      icon={<AttachmentIcon />}
      onClick={() => fileInputRef.current.click()}
      mr={2}
    />
    <input
      type="file"
      ref={fileInputRef}
      hidden
      onChange={handleMediaSend}
    />
    <Input
      placeholder="Type your message here..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(event) => (event.key === "Enter" ? sendMessage() : null)}
      flexGrow={1}
    />
    <Button ml={2} colorScheme="pink" onClick={sendMessage}>
      Send
    </Button>
  </Flex>
</Flex>

    </Flex>
  );
};

export default ChatInterface;

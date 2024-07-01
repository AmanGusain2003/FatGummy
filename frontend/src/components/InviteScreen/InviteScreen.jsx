import React, { useContext, useEffect } from 'react';
import { Box, Flex, Button, Text, VStack, Input, useClipboard } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FaWhatsapp } from 'react-icons/fa';

const InviteScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const inviteLink = `${window.location.origin}/signup?inviteToken=${user?.inviteToken}`;
  const { hasCopied, onCopy } = useClipboard(inviteLink);
  const base_api_url = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchPartnerId = async () => {
      try {
        const response = await fetch(`${base_api_url}/auth/partnerId?userId=${user._id}`);
        const data = await response.json();
        if (response.ok) {
          if (data.partnerId) {
            setUser({ ...user, partnerId: data.partnerId });
            navigate('/chat');
          }
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching partner ID:', error);
      }
    };

    if (!user) {
      navigate('/login');
    } else if (!user.partnerId) {
      fetchPartnerId();
    } else {
      navigate('/chat');
    }
  }, [user, navigate, setUser, base_api_url]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="pink.50"
      position="relative"
    >
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
          Invite Your Partner
        </Text>
        <VStack spacing={4}>
          <Input value={inviteLink} isReadOnly />
          <Button onClick={onCopy} colorScheme="pink" width="100%">
            {hasCopied ? 'Copied' : 'Copy Link'}
          </Button>
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="green"
            width="100%"
            onClick={handleShare}
          >
            Share on Whatsapp
          </Button>
        </VStack>
      </Box>
    </Flex>
  );

  function handleShare() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(inviteLink)}`, '_blank');
  }
};

export default InviteScreen;

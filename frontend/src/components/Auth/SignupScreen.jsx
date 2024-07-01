import { useState, useEffect, useContext, useRef } from 'react';
import { Box, Flex, Input, Button, Text, VStack, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';


const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [themeColor, setThemeColor] = useState('pink');
  const [inviteToken, setInviteToken] = useState('');
  const { setUser } = useContext(UserContext);
  const base_api_url = import.meta.env.VITE_BASE_API_URL
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('inviteToken');
    if (token) {
      setInviteToken(token);
      console.log(token)
    }
  }, []);

  const handleSignup = async () => {
    const response = await fetch(`${base_api_url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, phone, gender:gender.toLowerCase(), profileImage, themeColor, inviteToken }),
    });

    if (response.ok) {
      const data = await response.json();
      window.alert("SignUp successful");
      setUser(data.user);
      if (!data.user.partnerId) {
        navigate("/invite");
      } else {
        navigate("/chat");
      }
    } else {
      window.alert("SignUp failed");
    }
  };

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
          Sign Up
        </Text>
        <VStack spacing={4}>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Select placeholder="Select gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </Select>
          <Input placeholder="Profile Image URL" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
          <Select placeholder="Select theme color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)}>
            <option value="pink">Pink</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
          </Select>
          <Button colorScheme="pink" width="100%" onClick={handleSignup}>
            Sign Up
          </Button>
          <Button variant="link" colorScheme="pink" onClick={() => navigate('/login')}>
            Already have an account? Login
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignupScreen;

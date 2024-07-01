import React, { useContext } from 'react';
import {
  Flex,
  Box,
  Link,
  Button,
  useColorModeValue,
  IconButton,
  useDisclosure,
  Stack,
  Text,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'space-between'}
      >
        <Flex align={'center'}>
          <Box
            textAlign={useColorModeValue('start', 'center')}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Logo
          </Box>
        </Flex>

        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <Stack direction={'row'} spacing={4}>
            <NavLink href={'#home'}>Home</NavLink>
            <NavLink href={'#about'}>About</NavLink>
            <NavLink href={'#services'}>Services</NavLink>
            <NavLink href={'#contact'}>Contact</NavLink>
          </Stack>
        </Flex>

        <Flex align={'center'}>
          {user ? (
            <Flex display={{ base: 'none', md: 'flex' }} alignItems="center">
              <Text fontSize={'sm'} mr={4}>Hello, {user.username}</Text>
              <Button
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                onClick={handleLogout}
                _hover={{ bg: 'pink.300' }}
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Flex display={{ base: 'none', md: 'flex' }}>
              <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                href={'/login'}
              >
                Sign In
              </Button>
              <Button
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                href={'/signup'}
                _hover={{ bg: 'pink.300' }}
              >
                Sign Up
              </Button>
            </Flex>
          )}

          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink href={'#home'}>Home</NavLink>
            <NavLink href={'#about'}>About</NavLink>
            <NavLink href={'#services'}>Services</NavLink>
            <NavLink href={'#contact'}>Contact</NavLink>
            {user ? (
              <>
                <Text fontSize={'sm'}>Hello, {user.username}</Text>
                <Button
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  onClick={handleLogout}
                  _hover={{ bg: 'pink.300' }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  href={'/login'}
                >
                  Sign In
                </Button>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  href={'/signup'}
                  _hover={{ bg: 'pink.300' }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

const NavLink = ({ href, children }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Link
      p={2}
      href={href}
      fontSize={'sm'}
      fontWeight={500}
      color={linkColor}
      _hover={{
        textDecoration: 'none',
        color: linkHoverColor,
      }}
    >
      {children}
    </Link>
  );
};

export default Navbar;

// import React from 'react';
import { Flex, Box, Link, Button, useColorModeValue, IconButton, useDisclosure, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}>
      
      <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
        <IconButton
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
          variant={'ghost'}
          aria-label={'Toggle Navigation'}
        />
      </Flex>

      <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Box
          textAlign={useColorModeValue('start', 'center')}
          fontFamily={'heading'}
          color={useColorModeValue('gray.800', 'white')}>
          Logo
        </Box>

        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <DesktopNav />
        </Flex>
      </Flex>

      <Stack
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'row'}
        spacing={6}>
        <Button
          as={'a'}
          fontSize={'sm'}
          fontWeight={400}
          variant={'link'}
          href={'#'}>
          Sign In
        </Button>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          href={'#'}
          _hover={{
            bg: 'pink.300',
          }}>
          Sign Up
        </Button>
      </Stack>
    </Flex>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      <Link
        p={2}
        href={'#home'}
        fontSize={'sm'}
        fontWeight={500}
        color={linkColor}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
        }}>
        Home
      </Link>
      <Link
        p={2}
        href={'#about'}
        fontSize={'sm'}
        fontWeight={500}
        color={linkColor}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
        }}>
        About
      </Link>
      <Link
        p={2}
        href={'#services'}
        fontSize={'sm'}
        fontWeight={500}
        color={linkColor}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
        }}>
        Services
      </Link>
      <Link
        p={2}
        href={'#contact'}
        fontSize={'sm'}
        fontWeight={500}
        color={linkColor}
        _hover={{
          textDecoration: 'none',
          color: linkHoverColor,
        }}>
        Contact
      </Link>
    </Stack>
  );
};

export default Navbar;

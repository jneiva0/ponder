import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { BsGoogle } from 'react-icons/bs'
import { login } from '../hooks/useUser'

export const Welcome = () => {
  return (
    <Box px={4} py={16} mx='auto'>
      <Flex
        direction='column'
        w={{ base: 'full', md: 11 / 12, xl: 8 / 12 }}
        alignItems={{ base: 'flex-start', md: 'center' }}
        textAlign={{ base: 'left', md: 'center' }}
        mx='auto'
      >
        <Heading
          mb={12}
          color={useColorModeValue('gray.900', 'gray.100')}
          fontSize='5xl'
          fontWeight='extrabold'
        >
          Ponder
        </Heading>
        <Heading
          mb={3}
          fontSize={{ base: '4xl', md: '5xl' }}
          fontWeight={{ base: 'bold', md: 'extrabold' }}
          color={useColorModeValue('gray.900', 'gray.100')}
          lineHeight='shorter'
        >
          Organize sua mente.
        </Heading>

        <Text
          mb={12}
          fontSize={{ base: 'lg', md: 'xl' }}
          color='gray.500'
          lineHeight='base'
        >
          Ponder é um app simples, visando ser uma forma rápida para qualquer
          pessoa anotar seus pensamentos.
          <br /> Pode ser usado como agenda, lista de tarefas ou apenas um lugar
          para salvar anotações.
        </Text>

        <Button colorScheme='red' leftIcon={<BsGoogle />} onClick={login}>
          Entrar com Google
        </Button>
      </Flex>
    </Box>
  )
}

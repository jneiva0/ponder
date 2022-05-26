import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdLightMode } from 'react-icons/md'
import { CheckUser } from './components/CheckUser'
import { CreateNote } from './components/CreateNote'
import { NotesList } from './components/NotesList'
import { logout } from './hooks/useUser'

function App() {
  const { toggleColorMode } = useColorMode()
  return (
    <CheckUser>
      <Box h='full' bg={useColorModeValue('gray.100', 'gray.900')}>
        <HStack pt={1} px={4} justify='right'>
          <IconButton
            variant='ghost'
            onClick={toggleColorMode}
            aria-label='color mode'
            icon={<MdLightMode />}
          />
          <Button variant='ghost' onClick={logout}>
            Sair
          </Button>
        </HStack>
        <Container h='full' maxW='container.sm' pt={2}>
          <CreateNote />

          <Box mt={8}>
            <NotesList />
          </Box>
        </Container>
      </Box>
    </CheckUser>
  )
}

export default App

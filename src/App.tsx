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
import { ExportButton } from './components/ExportButton'
import { Footer } from './components/Footer'
import { NotesList } from './components/NotesList'
import { logout } from './hooks/useUser'

function App() {
  const { toggleColorMode } = useColorMode()
  return (
    <CheckUser>
      <Box
        display='flex'
        minH='100vh'
        flexDir='column'
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <HStack pt={1} px={4} justify='right'>
          <IconButton
            variant='ghost'
            onClick={toggleColorMode}
            aria-label='color mode'
            icon={<MdLightMode />}
          />
          <ExportButton />
          <Button variant='ghost' onClick={logout}>
            Sair
          </Button>
        </HStack>
        <Container px={2} flex={1} maxW='container.sm' pt={2}>
          <CreateNote />

          <Box flex={1} mt={8}>
            <NotesList />
          </Box>
        </Container>
        <Footer />
      </Box>
    </CheckUser>
  )
}

export default App

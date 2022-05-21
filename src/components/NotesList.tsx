import { Alert, AlertIcon, Box, Center, Spinner } from '@chakra-ui/react'
import { useNotes } from '../hooks/useNotes'

export const NotesList = () => {
  const { data, error, loading } = useNotes()

  if (error)
    return (
      <Alert status='error'>
        <AlertIcon />
        {error.message}
      </Alert>
    )

  if (loading)
    return (
      <Center w='full' h='full'>
        <Spinner />
      </Center>
    )

  return (
    <Box>
      {data?.map(doc => (
        <Box>{doc.text}</Box>
      ))}
    </Box>
  )
}

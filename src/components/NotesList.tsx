import { Alert, AlertIcon, Box, Center, Spinner, Stack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNotes } from '../hooks/useNotes'
import { NoteItem } from './NoteItem'

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
      <Stack spacing={6}>
        <AnimatePresence>
          {data?.map(
            (doc, i) =>
              !doc.isArchived && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 200 }}
                  key={doc.id}
                >
                  <NoteItem note={doc} />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </Stack>
    </Box>
  )
}

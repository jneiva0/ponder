import {
  Box,
  Collapse,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useInterval,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { GoArchive } from 'react-icons/go'
import { Document } from 'swr-firestore-v9'
import { useHover } from '../hooks/useHover'
import { Note, useNote } from '../hooks/useNotes'

type Props = { note: Document<Note> }

export const NoteItem = ({ note }: Props) => {
  const [timeAgo, setTimeAgo] = useState(() => dayjs(note.createdAt).fromNow())

  const [isHovering, hoverProps] = useHover()
  const { update, isValidating } = useNote(note.id)

  const archive = async () => {
    await update({ isArchived: true })
  }

  useInterval(() => setTimeAgo(dayjs(note.createdAt).fromNow()), 5000)

  return (
    <Box
      {...hoverProps}
      rounded='md'
      shadow='md'
      bg={useColorModeValue('white', 'gray.700')}
      outlineOffset={2}
      _focus={{
        boxShadow: 'outline',
      }}
      tabIndex={1}
      py={2}
      px={2}
    >
      <HStack p={2} align='start' justify='space-between'>
        <Text>{note.text}</Text>
        <Text
          whiteSpace='nowrap'
          textAlign='right'
          fontWeight={400}
          color='gray.500'
          fontSize='sm'
        >
          {timeAgo}
        </Text>
      </HStack>
      <Collapse in={isHovering}>
        <HStack justify='right'>
          <IconButton
            color='gray.600'
            variant='ghost'
            aria-label='delete'
            icon={<GoArchive />}
            onClick={archive}
          />
        </HStack>
      </Collapse>
    </Box>
  )
}

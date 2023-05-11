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
import { useMemo, useState } from 'react'
import { GoArchive } from 'react-icons/go'
import { Document } from 'swr-firestore-v9'
import { useHover } from '../hooks/useHover'
import { Note, useNote } from '../hooks/useNotes'

type Props = { note: Document<Note> }

export const NoteItem = ({ note }: Props) => {
  const [timeAgo, setTimeAgo] = useState(() => dayjs(note.createdAt).fromNow())

  const date = useMemo(
    () => dayjs(note.createdAt).format('ddd, MMM D, YYYY h:mm A'),
    [note.createdAt]
  )

  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 0,
    mouseLeaveDelayMS: 50,
  })
  const { deleteDocument } = useNote(note.id)

  const remove = async () => {
    await deleteDocument()
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
      <Box p={2}>
        <Text whiteSpace='pre-line'>{note.text}</Text>
      </Box>

      <Text
        px={2}
        whiteSpace='nowrap'
        textAlign='right'
        fontWeight={400}
        color='gray.500'
        fontSize='sm'
      >
        {timeAgo} - {date}
      </Text>
      <Collapse in={isHovering}>
        <HStack justify='right'>
          <IconButton
            color={useColorModeValue('gray.600', 'gray.400')}
            variant='ghost'
            aria-label='delete'
            icon={<GoArchive />}
            onClick={remove}
          />
        </HStack>
      </Collapse>
    </Box>
  )
}

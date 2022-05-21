import {
  Box,
  Container,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
} from '@chakra-ui/react'
import { useHotkeys } from '@mantine/hooks'
import { FormEventHandler, useRef, useState } from 'react'
import { CheckUser } from './components/CheckUser'
import { NotesList } from './components/NotesList'

type Item = {
  text: string
  createdAt: Date
}

function App() {
  const [text, setText] = useState('')
  const [itens, setItens] = useState<Item[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  useHotkeys([
    [
      'I',
      () => {
        console.log('I')
        inputRef.current?.focus()
      },
    ],
  ])

  const onSubmit: FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault()
    console.log(text)
    setItens([...itens, { text, createdAt: new Date() }])
    setText('')
  }

  return (
    <CheckUser>
      <Container pt={3}>
        <form onSubmit={onSubmit}>
          <FormControl>
            <InputGroup>
              <Input
                noOfLines={2}
                id='pad'
                ref={inputRef}
                placeholder={`Whats on your mind?`}
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <InputRightElement>
                <Kbd>I</Kbd>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </form>
        <Box mt={4}>
          <NotesList />
        </Box>
      </Container>
    </CheckUser>
  )
}

export default App

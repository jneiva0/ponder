import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  InputGroup,
  InputRightElement,
  Kbd,
  Textarea,
} from '@chakra-ui/react'
import { serverTimestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import { useMemo, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import TextareaAutosize from 'react-textarea-autosize'
import * as yup from 'yup'
import { useNotes } from '../hooks/useNotes'
import { setupDayjs } from '../lib/dates'

setupDayjs()

const TEXT_LENGTH_LIMIT = 2000

const schema = yup.object().shape({
  text: yup.string().required().max(TEXT_LENGTH_LIMIT),
})

export const CreateNote = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { add, mutate } = useNotes()

  const handleSubmit = async (values: { text: string }) => {
    console.log(values)
    await add({
      text: values.text,
      createdAt: serverTimestamp() as any,
    })
    formik.resetForm()

    await mutate(undefined, { revalidate: true })
  }

  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: handleSubmit,
    validationSchema: schema,
  })

  useHotkeys('i', (ev: KeyboardEvent) => {
    ev.preventDefault()
    inputRef.current?.focus()
  })

  const remainingCharacters = useMemo(
    () => TEXT_LENGTH_LIMIT - formik.values.text.length,
    [formik.values.text]
  )

  const percentUsed = useMemo(
    () => (formik.values.text.length / TEXT_LENGTH_LIMIT) * 100,
    [formik.values.text]
  )

  const isNearExceeding = useMemo(
    () => remainingCharacters <= 50,
    [remainingCharacters]
  )
  return (
    <form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Textarea
          as={TextareaAutosize}
          id='text'
          name='text'
          isDisabled={formik.isSubmitting}
          ref={inputRef}
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder='O que você está pensando?'
          pr={8}
          resize='none'
          wrap='hard'
          minH={1}
        ></Textarea>
        <InputRightElement>
          <Kbd>I</Kbd>
        </InputRightElement>
      </InputGroup>

      {formik.dirty && (
        <Flex align='center' justify='end' mt={2}>
          <CircularProgress
            color={isNearExceeding ? 'orange.500' : 'blue.500'}
            size={isNearExceeding ? 10 : 8}
            mr={5}
            value={percentUsed}
          >
            {isNearExceeding && (
              <CircularProgressLabel fontSize='sm' fontWeight='400'>
                {remainingCharacters}
              </CircularProgressLabel>
            )}
          </CircularProgress>
          <Button
            isDisabled={!formik.isValid}
            isLoading={formik.isSubmitting}
            colorScheme='blue'
            type='submit'
          >
            Adicionar
          </Button>
        </Flex>
      )}
    </form>
  )
}

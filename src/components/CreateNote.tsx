import {
  Button,
  Flex,
  InputGroup,
  InputRightElement,
  Kbd,
  Textarea,
} from '@chakra-ui/react'
import { serverTimestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import TextareaAutosize from 'react-textarea-autosize'
import * as yup from 'yup'
import { useNotes } from '../hooks/useNotes'
import { setupDayjs } from '../lib/dates'

setupDayjs()

const schema = yup.object().shape({
  text: yup.string().required(),
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
          placeholder={`Whats on your mind?`}
          pr={8}
          maxLength={280}
          resize='none'
          wrap='hard'
          minH={1}
        ></Textarea>
        <InputRightElement>
          <Kbd>I</Kbd>
        </InputRightElement>
      </InputGroup>

      {formik.dirty && formik.isValid && (
        <Flex mt={2} justifyContent='end'>
          <Button colorScheme='blue' type='submit'>
            Adicionar
          </Button>
        </Flex>
      )}
    </form>
  )
}

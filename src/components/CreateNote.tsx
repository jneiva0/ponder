import { Input, InputGroup, InputRightElement, Kbd } from '@chakra-ui/react'
import { serverTimestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import React, { useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNotes } from '../hooks/useNotes'
import { setupDayjs } from '../lib/dates'

setupDayjs()

export const CreateNote = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { add } = useNotes()

  const handleSubmit = async (values: { text: string }) => {
    await add({
      text: values.text,
      isArchived: false,
      createdAt: serverTimestamp() as any,
    })
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: { text: '' },
    onSubmit: handleSubmit,
  })

  useHotkeys('i', () => inputRef.current?.focus())

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Input
          id='text'
          name='text'
          noOfLines={2}
          autoComplete='off'
          ref={inputRef}
          placeholder={`Whats on your mind?`}
          isDisabled={formik.isSubmitting}
          value={formik.values.text}
          onChange={formik.handleChange}
        />
        <InputRightElement>
          <Kbd>I</Kbd>
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

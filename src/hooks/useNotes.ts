import { useCollection, useDocument } from 'swr-firestore-v9'
import { useUser } from './useUser'

export type Note = {
  text: string
  createdAt: Date
}

export const useNotes = () => {
  const user = useUser()

  const res = useCollection<Note>(`users/${user.uid}/notes`, {
    parseDates: ['createdAt'],
    orderBy: ['createdAt', 'desc'],
  })

  return res
}

export const useNote = (id: string) => {
  const user = useUser()
  const res = useDocument<Note>(`users/${user.uid}/notes/${id}`, {
    parseDates: ['createdAt'],
  })

  return res
}

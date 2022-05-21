import { useCollection } from 'swr-firestore-v9'
import { useUser } from './useUser'

export type Note = {
  text: string
  createdAt: Date
}

export const useNotes = () => {
  const user = useUser()

  const res = useCollection<Note>(`users/${user.uid}/notes`)

  return res
}

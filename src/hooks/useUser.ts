import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
} from 'firebase/auth'
import { createContext, useContext } from 'react'

const UserContext = createContext<User | null>(null)

export const UserProvider = UserContext.Provider

export const useUser = (): User => useContext(UserContext) as User

const googleProvider = new GoogleAuthProvider()

export const login = async () => {
  const auth = getAuth()
  return await signInWithRedirect(auth, googleProvider)
}

export const logout = async () => await getAuth().signOut()

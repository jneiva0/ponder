import { Alert, AlertIcon, Center, Spinner } from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { UserProvider } from '../hooks/useUser'
import { Welcome } from './Welcome'

export const CheckUser = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(getAuth())

  if (loading)
    return (
      <Center w='full' h='full'>
        <Spinner />
      </Center>
    )

  if (error)
    return (
      <Alert status='error'>
        <AlertIcon />
        {error.message}
      </Alert>
    )

  if (user) return <UserProvider value={user}>{children}</UserProvider>

  return <Welcome />
}

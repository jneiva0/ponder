import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Fuego, FuegoProvider } from 'swr-firestore-v9'
import App from './App'
import { firebaseConfig } from './lib/firebaseConfig'
import { theme } from './lib/theme'

const fuego = new Fuego(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FuegoProvider fuego={fuego}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </FuegoProvider>
  </React.StrictMode>
)

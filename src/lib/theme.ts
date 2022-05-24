import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

export const theme = extendTheme({
  config,
  styles: {
    global: {
      'html,body,#root': {
        height: '100%',
      },
    },
  },
})

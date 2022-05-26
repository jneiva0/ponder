import { Box, Button, Link } from '@chakra-ui/react'

export const Footer = () => (
  <Box pt={6} mx='auto' pb={2}>
    <Link isExternal href='mailto:joao@jneiva.dev'>
      <Button variant='link'>© 2022 João Vitor Neiva</Button>
    </Link>
  </Box>
)

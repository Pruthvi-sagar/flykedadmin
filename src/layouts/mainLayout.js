import Box from '@material-ui/core/Box'
import React from 'react'
import MainHeader from '../components/utilitiies/MainHeader'

export default function MainLayout(props) {
  const { children } = props
  return (
    <Box style={{ height: '100vh' }}>
      <MainHeader />
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        {children}
      </Box>
    </Box>
  )
}

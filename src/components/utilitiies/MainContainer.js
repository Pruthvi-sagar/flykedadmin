import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import React from 'react'

export default function MainContainer(props) {
  const { children, header, footer, bodyHight } = props
  return (
    <Box style={{ maxWidth: '1200px', width: '100%', }}>
      <Box
        style={{
          marginBottom: '8px',
          width: '100%',
        }}
      >
        {header}
      </Box>
      <Paper
        style={{
          padding: 8,
          width: '80vw',
          maxWidth: '1112px',
          maxHeight: bodyHight || '62vh',
          overflowY: 'scroll',
          boxShadow: 'none',
          background: 'transparent',
        }}
      >
        {children}
      </Paper>
      <Box style={{ margin: 8 }}>{footer}</Box>
    </Box>
  )
}

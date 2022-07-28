import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { IMAGES } from '../../assets'
import { COLORS } from '../../constants/color'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'


function MergeSuccess({ open, handleClose, text, subText }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <Box display='flex' style={{ margin: '20px ', marginRight: 0 }}>
          <Box
            style={{
              width: 34,
              height: 34,
              background: COLORS.PRIMARY,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              marginTop: 10,
            }}
          >
            <img
              src={IMAGES.WHITE_TICK_ICON}
              alt='white tick'
              style={{ width: '10px', height: '7px' }}
            />
          </Box>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <Typography variant='subtitle2' style={{ fontSize: 16 }}>
                {text}
              </Typography>
              <Typography variant='caption' style={{ fonWeight: 400 }}>
                {subText}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              height: '100%',
              alignSelf: 'flex-start',
              padding: 0,
            }}
          >
            <Button onClick={handleClose} style={{ padding: 10 }}>
              <img src={IMAGES.GRAY_CROSS_ICON} alt='close icon' />
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  )
}

export default MergeSuccess

import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import ButtonWithLoader from '../elements/buttonWithLoader';

function Confirm({ text, open, handleClose, handleConfirm, loading }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Typography variant='subtitle2'> {text}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '20px' }}>
          <ButtonWithLoader
            onClick={handleClose}
            // loading={loading}
            disabled={loading}
            color='primary'
            style={{ textTransform: 'capitalize' }}
          >
            Cancel
          </ButtonWithLoader>
          <ButtonWithLoader
            onClick={handleConfirm}
            color='primary'
            variant='contained'
            loading={loading}
            disabled={loading}
            style={{ textTransform: 'capitalize' }}
          >
            Confirm
          </ButtonWithLoader>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Confirm

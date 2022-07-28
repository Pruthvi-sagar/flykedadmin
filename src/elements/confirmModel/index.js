import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonWithLoader from '../buttonWithLoader';

const ConfirmDialog = ({ open, cancel, confirm, title , content, cancelLabel, confirmLabel, loading }) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Dialog
          open={open}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' style={{ padding:'1.5rem', width: '420px' }}>
            <Typography variant='h6' color='primary'>
              <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                <Typography style={{ color: '#1C2121' ,font: "normal normal 600 18px/21px 'SF Pro Rounded', sans-serif", letterSpacing: '0.02em' }}>{title}</Typography>
                <IconButton disabled={loading} size="small" onClick={cancel}><CloseIcon fontSize="small" style={{ color:"#000000" }} /></IconButton>
              </Grid>
            </Typography>
          </DialogTitle>
          <Divider />
          <DialogContent style={{ marginTop: '.5rem' }}>
            <DialogContentText id='alert-dialog-description'>
              <Typography style={{ color: '#1C2121' ,font: "normal normal 15px/21px 'SF Pro Rounded', sans-serif", letterSpacing: '0.02em' }}>{content}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ marginBottom: '1rem' }}>
            <ButtonWithLoader size='small' disabled={loading} onClick={cancel} color='primary' variant='outlined' style={{ height: '35px', textTransform:'capitalize' }}>
              {cancelLabel || 'Cancel'}
            </ButtonWithLoader>
            <ButtonWithLoader loading={loading} disabled={loading} size='small' onClick={confirm} color='primary' variant='contained' style={{ height: '35px', textTransform:'capitalize' }}>
              {confirmLabel || 'Confirm'}
            </ButtonWithLoader>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default ConfirmDialog;

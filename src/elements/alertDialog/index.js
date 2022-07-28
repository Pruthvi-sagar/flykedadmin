
import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const AlertDialogNotification = ({
  open, title, content, handleClose,
}) => {
  const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [open, handleClose]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      disableEscapeKeyDown
      disableBackdropClick
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}
      hideBackdrop
      PaperProps={{
        style: {
          borderRadius: '10px',
          margin: 0,
          top: 80,
          right: 15,
          position: 'absolute',
          backgroundColor: '#FFFFF',
          opacity:'1',
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)'
        },
      }}
    >
      <DialogContent>
        <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" style={{ width: 'auto', height: 'auto', backgroundColor: 'white', padding: '10px 0px 25px 0px' }}>
          <Grid item md={12} xs={12}>
            <Grid container spacing={2} justifyContent="space-between">
            <Grid style={{ marginRight: '10px' }}>
                <IconButton style={{ backgroundColor: '#EF613B', width: '34px', height: '34px' }}><DoneIcon style={{ color: '#ffff', fontSize: '20px' }} /></IconButton>
              </Grid>
              <Grid style={{ width: '300px' }}>
                <Typography style={{ color: '#172849', font: "normal normal 500 14px/150% 'SF Pro Rounded', sans-serif", letterSpacing: '0.02em' }}>{title}</Typography>
                <Typography style={{ color: '#888F9D', font: "normal normal 14px/130% 'SF Pro Rounded', sans-serif", letterSpacing: '0.02em' }}>{content}</Typography>
              </Grid>
              <Grid style={{ marginLeft: '10px' }}>
                <IconButton size="small"><CloseIcon style={{ fontSize: '20px', color: '#888F9D' }} /></IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialogNotification;

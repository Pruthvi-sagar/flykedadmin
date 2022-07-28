import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import useTheme from '@material-ui/core/styles/useTheme';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import html2canvas from 'html2canvas';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ImageCropper from './imageCroper/imageCroper';
// import ColorPallet from './colorPallet/colorPallet';
import './style.css';
import ButtonWithLoader from '../../../elements/buttonWithLoader';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import { PROGRESS_UPLOADED } from '../../../actions/types';
import FileUpload from '../../../config/fileUpload';

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const ImageCropColorPalletModel = ({
  openCropModel, selectedImage, setSelectedImage, closePalletModel, handleStep1Back, postDetails, handleUpdateData,
}) => {
  const { setAlert } = useContext(AlertNotificationContext);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const progress = useSelector((state) => state?.pendingPosts?.progressUpload);
  const updateLoading = useSelector((state) => state?.pendingPosts?.updatePostLoading);
  const [cropedImage, setCropedImage] = useState('');
  // const [imageDiv, setImageDiv] = useState('');
  // const [textDiv, setTextDiv] = useState('');
  // const [colorPalletDiv, setColorPalletDiv] = useState('');
  const [loading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // const [colorPallet, setColorPallet] = useState('');

  useEffect(() => {
    if (openCropModel) {
      if (selectedImage && typeof selectedImage === 'string') {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    }
  }, [openCropModel, selectedImage]);

  // const blobToBase64 = (blob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   return new Promise((resolve) => {
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //   });
  // };

  // function urltoFile(url, filename, mimeType) {
  //   // eslint-disable-next-line no-param-reassign
  //   mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
  //   return fetch(url)
  //     .then((res) => res.arrayBuffer())
  //     .then((buf) => new File([buf], filename, { type: mimeType }));
  // }

  const setProgressBar = (value) => {
    dispatch({ type: PROGRESS_UPLOADED, payload: value });
  };

  const handleConfirm = async () => {
    if (cropedImage && currentStep === 1) {
     const jpegFile = new File([cropedImage], 'jpeg', { type: 'image/jpeg' });
     const fileData = await FileUpload(jpegFile, setProgressBar, setAlert, 'post');
     if (fileData) {
       const data = {
        // postPage: postDetails?._id,
        image: fileData,
        // gradient: colorPallet
      };
      handleUpdateData(postDetails?._id, data);
      // blobToBase64(cropedImage).then((res) => {
      //   setSelectedImage(res);
      //   setCurrentStep(2);
      // });
    }
  } 
    // else if (currentStep === 2) {
    //   if (imageDiv) {
    //     setLoading(true);
    //     textDiv?.remove();
    //     if (pallet === 'removePalette') {
    //       colorPalletDiv?.remove();
    //     }
    //     html2canvas(imageDiv).then((canvas) => {
    //       const ImageBase64 = canvas.toDataURL();
    //       if (ImageBase64) {
    //         urltoFile(ImageBase64)
    //         .then(async (file) => {
    //             const fileData = await FileUpload(file, setProgressBar, setAlert, 'post');
    //             if (fileData) {
    //               const data = {
    //                 // postPage: postDetails?._id,
    //                 image: fileData,
    //                 gradient: colorPallet
    //               };
    //               handleUpdateData(postDetails?._id, data);
    //             }
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           }).finally(() => {
    //             setLoading(false);
    //           });
    //        }
    //     });
    //   }
    // }
  };
  const handleBack = () => {
    if (currentStep === 2) {
        handleCloseModel();
    } else {
      handleStep1Back();
    }
  };

  // const handleImageChange = () => {
  //   setCurrentStep(1);
  //   setColorPallet('');
  // };

  const handleCloseModel = () => {
    // setColorPallet('');
    setSelectedImage('');
    closePalletModel();
  };

  return (
    <Dialog
      open={openCropModel}
      TransitionComponent={Transition}
      keepMounted
      disableEscapeKeyDown
      disableBackdropClick
      PaperProps={{
        style: {
          borderRadius: isMobile ? '' : '10px',
          margin: isMobile ? '0px' : '',
          bottom: isMobile ? '0px' : '',
          position: isMobile ? 'absolute' : '',
          backgroundColor: isMobile ? '#000000' : '',
        },
      }}
      fullScreen={isMobile}
      maxWidth={currentStep === 1 ? 'sm' : 'md'}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" style={isMobile ? { padding: '5px 0px' } : {}}>
          <Typography className="post-image-croper-model-header">
            <IconButton size="small" style={{ display: isMobile ? '' : 'none', color: isMobile ? '#FFFFFF' : '' }} onClick={() => handleBack()}><ArrowBackIosIcon size="small" style={{ fontSize: '20px', paddingRight: '10px' }} /></IconButton>
            Edit Image
          </Typography>
          <IconButton onClick={() => handleCloseModel()} style={{ display: isMobile ? 'none' : 'block' }}>
            <CloseIcon size="small" style={{ color: '#000000', fontSize: '20px' }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} style={{ width: '100%', height: '100%' }}>
          <Grid item md={12} xs={12} style={{ textAlign: 'center' }}>
            {currentStep === 1 && typeof selectedImage === 'object' ? (
              <ImageCropper handleCropedImage={setCropedImage} selectedImage={selectedImage} />
            ) : (
              ''
            )}
            {/* {currentStep === 2 ? (
              <ColorPallet
                handleImageDiv={setImageDiv}
                handleTextDiv={setTextDiv}
                handleColorPalletDiv={setColorPalletDiv}
                handleImageChange={handleImageChange}
                gradient={colorPallet}
                setGradient={setColorPallet}
                selectedImage={selectedImage}
                postText={postDetails?.text || ''}
              />
            ) : (
              ''
            )} */}
          </Grid>
        </Grid>
      </DialogContent>
      <Divider style={{ display: isMobile ? 'none' : '' }} />
      <DialogActions className="post-croper-model-footer">
        <Grid container spacing={2} style={{ margin: '0px' }} justifyContent="flex-end" alignItems="center">
          <Grid item xs={isMobile ? 6 : ''} style={{ display: isMobile ? 'none' : 'block' }}>
            <ButtonWithLoader
              variant="outlined"
              color="primary"
              fullWidth={isMobile}
              disabled={progress > 0 || loading || updateLoading}
              onClick={() => handleBack()}
              className="post-croper-model-footer-btn"
            >
              {currentStep === 1 ? 'Back' : 'Cancel'}
            </ButtonWithLoader>
          </Grid>
          <Grid item xs={isMobile ? 12 : ''} style={isMobile ? { padding: '0px', margin: '0px' } : {}}>
            <ButtonWithLoader
              className="post-croper-model-footer-btn"
              loading={progress > 0 || loading || updateLoading}
              disabled={progress > 0 || loading || updateLoading}
              variant="contained"
              color="primary"
              fullWidth={isMobile}
              onClick={() => handleConfirm()}
            >
              Change Image
             {/* {currentStep === 1 ? 'Change Image' : 'Change Image'} */}
            </ButtonWithLoader>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
ImageCropColorPalletModel.propTypes = {
  handleStep1Back: PropTypes.func.isRequired,
};

export default ImageCropColorPalletModel;
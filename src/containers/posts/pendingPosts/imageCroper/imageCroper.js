/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import useObjectURL from 'use-object-url';
import { useMediaQuery, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { limitImageSize, getCroppedFile } from './utils';

const ImageCropper = ({ handleCropedImage, selectedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const [resizedUrl, setResizedUrl] = useState('');
  let imageUrl = {};
  if (typeof (selectedImage) === 'object') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    imageUrl = useObjectURL(selectedImage);
    // console.log(imageUrl, 'dddd');
  }

  useEffect(() => {
    if (selectedImage && typeof (selectedImage) === 'object' && imageUrl) {
      limitImageSize({
        imageUrl,
        maxWidth: 600,
        maxHeight: 800,
        mimeType: 'image/jpeg',
        quality: '100%',
      })
        .then((url) => {
          // console.log(url, 'dddd');
          setResizedUrl(url);
        })
        .catch((err) => console.error(err, 'dddd'));
    } else {
      setResizedUrl('');
    }
  }, [selectedImage, imageUrl]);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    if (selectedImage && typeof (selectedImage) === 'object') {
      getCroppedFile(
        resizedUrl,
        croppedAreaPixels,
        600,
        800,
        'image/jpeg',
        '80%',
      ).then((url) => {
        console.log(url, 'dddd', croppedAreaPixels);
        handleCropedImage(url);
      })
        .catch((err) => console.error(err, 'dddd'));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Box style={{
          width: isMobile ? '100%' : 500,
          height: 500,
          marginTop: isMobile ? '20px' : '',
          position: 'relative',
        }}
        >
          <Cropper
            image={resizedUrl}
            crop={crop}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={false}
            onZoomChange={setZoom}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
ImageCropper.propTypes = {
  handleCropedImage: PropTypes.func.isRequired,
};

export default ImageCropper;

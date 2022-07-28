import React, { useEffect, useRef, useState } from "react";
import useObjectURL from "use-object-url";
import CropImagePanel from "./CropImagePanel";
import { getCroppedFile, limitImageSize } from "./utils";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

export default function CropImageModal({
  show,
  imageFile,
  value, // crop value
  onChange, // on crop value change
  onConfirm, // (croppedFile) => void
  onCancel, // void => void
  onRemove, // void => void
  inputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  cropOptions = {}, // {aspect, maxZoom}
  outputOptions = {}, // {maxWidth, maxHeight, mimeType, quality}
  displayOptions = {} // {title, removeButtonText, confirmButtonText, showRemoveButton, showConfirmButton}
}) {
  const {
    maxWidth: inputMaxWidth = Infinity,
    maxHeight: inputMaxHeight = Infinity,
    mimeType: inputMimeType = "image/jpeg",
    quality: inputQuality
  } = inputOptions;

  const { aspect, maxZoom } = cropOptions;

  const {
    maxWidth = Infinity,
    maxHeight = Infinity,
    mimeType = "image/jpeg",
    quality
  } = outputOptions;

  const {
    title = "Crop Image",
    removeButtonText = "Remove",
    confirmButtonText = "Confirm",
    showRemoveButton = true,
    showConfirmButton = true
  } = displayOptions;

  const imageUrl = useObjectURL(imageFile);

  const [resizedUrl, setResizedUrl] = useState();

  useEffect(() => {
    if (imageUrl) {
      limitImageSize({
        imageUrl,
        maxWidth: inputMaxWidth,
        maxHeight: inputMaxHeight,
        mimeType: inputMimeType,
        quality: '100%'
      })
        .then(url => setResizedUrl(url))
        .catch(err => console.error(err))
    } else {
      setResizedUrl();
    }
  }, [imageUrl]);

  const cropResultRef = useRef();

  function handleCropComplete(croppedArea, croppedAreaPixels) {
    cropResultRef.current = { croppedArea, croppedAreaPixels };
  }

  function handleConfirm() {
    getCroppedFile(
      resizedUrl,
      cropResultRef.current.croppedAreaPixels,
      maxWidth,
      maxHeight,
      mimeType,
      quality
    ).then(onConfirm);
  }

  return (
    <Dialog open={show} onClose={onCancel} >
      <Typography style={{padding:10}} varaint={'subtitle1'}>{ title}</Typography>
      <DialogContent dividers={false}>
        <Box style={{
          width: window.location.pathname === '/admin/config' ? 250 : 400,
          height: window.location.pathname === '/admin/config' ? 250 :  400,
          // overflow: 'hidden',
          position: 'relative',
        }}>
        {resizedUrl && (
          <CropImagePanel
            imageUrl={resizedUrl}
            value={value}
            onChange={onChange}
            onCropComplete={handleCropComplete}
            aspect={aspect}
            maxZoom={maxZoom}
          />
        )}
        </Box>
        
      </DialogContent>
      <DialogActions>
        {showRemoveButton && (
          <Button variant="secondary" onClick={onRemove}>
            {removeButtonText}
          </Button>
        )}
        {showConfirmButton && (
          <Button variant="primary" onClick={handleConfirm}>
            {confirmButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

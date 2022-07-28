import React, { useEffect, useRef, useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CropImageModal from './CropImageModal';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState'

export default function ImageCropper({
  fileRef,
  onChange,
  inputOptions,
  cropOptions,
  outputOptions,
  displayOptions,
  previewOptions,
  buttonStyle,
  buttonText,
  showStartIcon,
  customComponent,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [cropState, setCropState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [croppedFile, setCroppedFile] = useState(null);
  const confirmedCropState = useRef(cropState);
  const confirmedImageFile = useRef(imageFile);

  // maintain the state of fileRef. no need to care it in other places
  useEffect(() => {
    fileRef && (fileRef.current = croppedFile);
  }, [croppedFile, fileRef]);

  // notify cropped file changed
  useEffect(() => {
    onChange && onChange(croppedFile);
  }, [croppedFile]);

  function handleSelectImageFile(file) {
    if (file === confirmedImageFile.current) {
      // continue to edit
      setImageFile(confirmedImageFile.current);
      setCropState(confirmedCropState.current);
    } else {
      // edit new file
      setImageFile(file);
      setCropState(null);
    }
    setShowModal(true);
  }

  function handleConfirm(croppedFile) {
    setShowModal(false);

    // save confirmed state
    confirmedImageFile.current = imageFile;
    confirmedCropState.current = cropState;

    // setup cropped file
    setCroppedFile(croppedFile);
  }

  function handleCancel() {
    setShowModal(false);

    // restore state
    setCropState(confirmedCropState.current);
    setImageFile(confirmedImageFile.current);
  }

  function handleRemove() {
    setShowModal(false);

    // clear working state
    setCropState(null);
    setImageFile(null);

    // clear confirmed state
    confirmedImageFile.current = null;
    confirmedCropState.current = null;

    // removed cropped file
    setCroppedFile(null);
  }

  return (
    <ControlledImageCropper
      imageFile={imageFile}
      onSelectImageFile={handleSelectImageFile}
      showModal={showModal}
      cropState={cropState}
      onChangeCropState={setCropState}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onRemove={handleRemove}
      inputOptions={inputOptions}
      cropOptions={cropOptions}
      outputOptions={outputOptions}
      displayOptions={displayOptions}
      previewOptions={{ ...previewOptions, imageFile: croppedFile }}
      buttonStyle={buttonStyle}
      buttonText={buttonText}
      showStartIcon={showStartIcon}
      customComponent={customComponent}
    />
  );
}

export function ControlledImageCropper({
  imageFile,
  onSelectImageFile,
  showModal,
  cropState,
  onChangeCropState,
  onConfirm,
  onCancel,
  onRemove,
  inputOptions = {},
  cropOptions = {},
  outputOptions = {},
  displayOptions = {},
  previewOptions = {},
  buttonStyle,
  buttonText,
  showStartIcon,
  customComponent,
}) {
  const fileInputRef = useRef();
  const {setAlert} = useContext(AlertNotificationContext);
  function handleFileChange(data) {
    if (data?.size > 5000000) {
      setAlert('warning', 'Image size must be less than 5MB');
      return;
    }
    if (data?.type === 'image/png' || data?.type === 'image/jpeg' || data?.type === 'image/webp') {
      const file = data;
      if (file) {
        onSelectImageFile(file);
      }
    } else {
      setAlert('warning', 'Upload only images on png or jpeg or webp format');
    }
  }

  function handleClick() {
    if (imageFile) {
      onSelectImageFile(imageFile);
    } else {
      fileInputRef.current.click();
    }
  }

  return (
    <React.Fragment>
      <input
        ref={fileInputRef}
        type='file'
        accept=".jpeg, .png, .webp"
        value=''
        onChange={(e) => handleFileChange(e.target.files[0])}
        hidden
      />
      {/* <CropImageInput {...previewOptions} onClick={handleClick} />
       */}
      {customComponent ? (
        customComponent(handleClick)
      ) : (
        <Button style={buttonStyle} onClick={handleClick}>
          {buttonText || 'Choose File'}
        </Button>
      )}

      <CropImageModal
        show={showModal}
        imageFile={imageFile}
        value={cropState}
        onChange={onChangeCropState}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onRemove={onRemove}
        inputOptions={inputOptions}
        cropOptions={cropOptions}
        outputOptions={outputOptions}
        displayOptions={displayOptions}
      />
    </React.Fragment>
  );
}

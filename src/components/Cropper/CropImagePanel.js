import Cropper from 'react-easy-crop';
import React from 'react';

export default function CropImagePanel({
  imageUrl,
  value,
  onChange,
  onCropComplete,
  aspect,
  maxZoom,
}) {
  const { crop, zoom } = value || {
    crop: { x: 0, y: 0 },
    zoom: 1,
  };

  function handleCropChange(cropped) {
    onChange({ crop:cropped, zoom });
  }

  function handleZoomChange(zoomed) {
    onChange({ crop, zoom: zoomed });
  }

  return (
    <Cropper
      image={imageUrl}
      maxZoom={maxZoom}
      aspect={1}
      crop={crop}
      zoom={zoom}
      onCropChange={(crop) => handleCropChange(crop)}
      onZoomChange={(zoom) => handleZoomChange(zoom)}
      onCropComplete={onCropComplete}
      cropShape={'rect'}
      showGrid={false}
      cropSize={{
        width: window.location.pathname === '/admin/config' ? 250 : 400,
        height: window.location.pathname === '/admin/config' ? 250 : 400,
      }}
    />
  );
}

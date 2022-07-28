import React from "react";
import Button from "@material-ui/core/Button";
import useObjectURL from "use-object-url";

export function InputButton({
  buttonStyle,
  children = "Select Image",
  onClick
}) {
  return (
    <Button variant="light" onClick={onClick} style={buttonStyle}>
      {children}
    </Button>
  );
}

export function InputPreview({ width, height, imageFile, onClick }) {
  const url = useObjectURL(imageFile);
  return (
    <img
      style={{ width, height, cursor: "pointer", objectFit: "contain" }}
      src={url}
      onClick={onClick}
    />
  );
}

export default function CropImageInput({
  imageFile,
  children,
  width,
  height,
  onClick
}) {
    return (
      <InputButton
        children={children}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
}

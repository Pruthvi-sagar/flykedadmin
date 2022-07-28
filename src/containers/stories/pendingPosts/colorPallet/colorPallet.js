/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePalette } from 'color-thief-react';
import { ColorPicker, useColor } from 'react-color-palette';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import useTheme from '@material-ui/core/styles/useTheme';
import 'react-color-palette/lib/css/styles.css';
import './style.css';

const ColorPallet = ({
  handleImageDiv, handleTextDiv, handleColorPalletDiv, handleImageChange, gradient, setGradient, selectedImage, postText
}) => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
  const [colorCodes, setColorCodes] = useState([]);
  const [color, setColor] = useColor('rgb', '#121212');
  const node = document.getElementById('my-image');
  const textNode = document.getElementById('text-preview');
  const colorPalletDiv = document.getElementById('color-palette-div');

    const { data, loading, error } = usePalette(selectedImage, 10, 'rgbArray', { crossorigin: 'anonymous | use-credentials', quality: 10 });
    // eslint-disable-next-line no-console
    console.log(loading, error, 'dddddd');

  const downloadImage = () => {
    handleImageDiv(node);
    handleTextDiv(textNode);
    handleColorPalletDiv(colorPalletDiv);
  };

  useEffect(() => {
    if (data) {
      downloadImage();
      setColorCodes(data);
    }
  }, [data]);

  useEffect(() => {
    downloadImage();
  }, [color, selectedImage]);

  return (
    <Grid container spacing={isMobile ? '' : 2}>
      <Grid item md={6} xs={12} className="color-paller-child-div">
        <Grid container spacing={2} justifyContent="center" alignItems="center" direction={isMobile ? 'column-reverse' : 'column'}>
          <Grid item md={12} xs={12}>
            <div
              style={{
                width: isMobile ? '100%' : 'max-content',
                alignItems: 'center',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
              }}
              id="my-image"
            >
              <img
                loading="lazy"
                src={selectedImage}
                style={{
                  width: isMobile ? '100%' : 400,
                  height: isMobile ? '100%' : 400,
                  // borderRadius: '10px',
                  objectFit: 'contain',
                }}
                alt="Crop"
              />
              <div
                id="color-palette-div"
                style={{
                  position: 'absolute',
                  width: isMobile ? '100%' : 400,
                  height: isMobile ? '100%' : 400,
                  // borderRadius: '10px',
                  background: `linear-gradient(0deg, rgba(${gradient.toString()}, 0.90) 14%, rgba(${gradient.toString()}, 0.10) 50%, rgba(${gradient.toString()}, 0.20) 100%)`,
                }}
              />
              <div
                id="text-preview"
                style={{ position: 'absolute', bottom: isMobile ? 20 : 30 }}
              >
                <Typography className="post-color-pallet-text">
                  {postText}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={12} xs={12} style={{ textAlign: 'center', display: 'none' }}>
            <Button variant="text" color="primary" className="color-pallet-chnageImage-btn" onClick={() => handleImageChange()}>
              <CameraAltOutlinedIcon fontSize="small" />
              &nbsp;Change Image
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12} className="color-paller-child-div">
        <Grid container spacing={isMobile ? '' : 2}>
          <Grid item md={12} xs={12} style={{ margin: '10px 0' }}>
            <Grid container>
              <Grid item md={12} xs={12}>
                <Typography className="post-color-pallet-lables" style={{ display: colorCodes.length !== 0 ? 'flex' : 'none' }}>Select the Default color theme</Typography>
              </Grid>
              <Grid item md={12} xs={12} style={{ width: '100%', overflow: 'auto', height: '100%' }}>
                <div style={{
                  width: isMobile ? '170vw' : '100%', overflowY: 'auto', display: colorCodes.length !== 0 ? 'flex' : 'none' ,direction: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', padding: '10px 0px',
                }}
                >
                  {colorCodes.length !== 0
                && colorCodes.map((colors) => (
                  <Grid
                    style={{
                      backgroundColor: `rgb(${colors})`,
                      width: isMobile ? 35 : 40,
                      height: isMobile ? 35 : 40,
                      borderRadius: 100,
                      margin: 8,
                      border: '1.5px solid',
                      boxShadow: gradient === colors
                        ? (isMobile ? 'inset 0 0 0 3px white' : 'inset 0 0 0 2px white')
                        : 'inset 0 0 0 0 white',
                      borderColor: gradient === colors ? '#EF613B' : 'transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setGradient(colors);
                      downloadImage();
                    }}
                  />
                ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12} style={{ margin: '10px 0' }}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Typography className="post-color-pallet-lables">Pick the Color theme from color picker</Typography>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                style={{
                  // display: colorCodes.length !== 0 ? 'flex' : 'none',
                  width: '100%',
                  textAlign: 'center',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                <ColorPicker
                  width={isMobile ? 250 : 400}
                  height={isMobile ? 70 : 100}
                  color={color}
                  onChange={(e) => {
                    setColor(e);
                    setGradient([e.rgb.r, e.rgb.g, e.rgb.b]);
                    downloadImage();
                  }}
                  hideHSV
                  hideHEX
                  hideRGB
                  dark
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ColorPallet.propTypes = {
  handleImageDiv: PropTypes.func.isRequired,
  handleTextDiv: PropTypes.func.isRequired,
  handleColorPalletDiv: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
};

export default ColorPallet;

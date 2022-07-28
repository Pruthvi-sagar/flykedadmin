import React, { useEffect, useState, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CameraAltOutlined from '@material-ui/icons/CameraAltOutlined';
import { useDispatch, useSelector } from 'react-redux';
import * as categoryActions from '../../../actions/categoryAction';
import { useStyles } from '../../EditStyles';
import ImageCropper from '../../Cropper';

export default function AddEditCategory(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const categoryList = useSelector((state) => state.category.categoryList);

  const {
    onEditCategory,
    onEditSubCategory,
    title,
    isAdd,
    isCategory,
    onClose,
    open,
    onAdd,
    onAddSubCategory,
    selected,
  } = props;
  const [state, setState] = useState({
    title: selected?.title,
    category: selected?.category,
    image: selected?.image,
  });
  const [message, setMessage] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    setState({
      title: selected?.title,
      image: selected?.image,
      category: isCategory?._id || '',
    });
  }, [selected, isCategory]);

  // useEffect(() => {
  //     setState({ 'category': isCategory?._id })
  // }, [isCategory])

  const handleChange = (key) => (e) => {
    setState({ ...state, [key]: e.target.value });
  };
  const handleImageUpload = (file) => {
    if (file) dispatch(categoryActions.uploadImage(file, handleImage, isCategory ? 'subcategory' : 'category'));
  };
  const handleImageChange = async (croppedFile) => {
    handleImageUpload(croppedFile);
    // console.log('RESIA:', resultData?.data?.data?.s3url);
    // setCompletedCrop(resultData?.data?.data?.s3url);
  };

  const handleImage = (data) => {
    setState({ ...state, image: data?.s3url });
  };
  const handleOnAdd = () => {
    if (!state.title || !state.image) {
      setMessage('please fill all fields');
    }
    setTimeout(() => {
      setMessage('');
    }, 2000);

    isCategory ? onAddSubCategory(state) : onAdd(state);
    clearData();
  };
  const handleOnEdit = () => {
    isCategory ? onEditSubCategory(state) : onEditCategory(state);
    clearData();
  };
  const handleOnCancel = () => {
    onClose();
    clearData();
  };

  const handleChangeCategory = (e) => {
    setState({ ...state, category: e.target.value });
  };

  const clearData = () => {
    setState({
      title: '',
      category: '',
      image: '',
    });
  };

  const RenderImageSelect = (handleClick) => {
    return (
      <>
        {/* <TextField
          accept='image/*'
          className={classes.input}
          id='contained_button_file'
          type='file'
          onChange={handleClick}
        /> */}
        <InputLabel className={classes.label} onClick={handleClick}>
          <Card className={classes.image}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${state.image})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <CameraAltOutlined />
            </span>
          </Card>
        </InputLabel>
      </>
    );
  };
  return (
    <>
      <Dialog open={open} onClose={handleOnCancel}>
        <DialogTitle onClose={handleOnCancel}>
          <Typography variant='subtitle2'>{title}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            style={{
              width: '400px',
              backgroundColor: 'white',
              margin: '20px 16px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ImageCropper
              fileRef={fileRef}
              onChange={handleImageChange}
              outputOptions={{ minWidth: 400, minHeight: 400 }}
              previewOptions={{ width: 400, height: 400 }}
              buttonStyle={{
                width: 190,
                height: 30,
                margin: 30,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                // display: 'none',
              }}
              buttonText='Upload Image'
              customComponent={RenderImageSelect}
            />
            <TextField
              style={{ height: 32, margin: '16px 8px' }}
              variant='outlined'
              value={state.title}
              onChange={handleChange('title')}
              fullWidth
              placeholder={`Enter the ${isCategory ? 'Sub' : ''} Category Name`}
            />
            {/* for sub category */}
            {isCategory && isCategory._id ? (
              <Select
                style={{ margin: '16px 16px' }}
                variant={'outlined'}
                fullWidth
                disabled={isAdd}
                value={state.category}
                onChange={handleChangeCategory}
              >
                {categoryList.map((item) => (
                  <MenuItem value={item._id}>{item.title}</MenuItem>
                ))}
              </Select>
            ) : null}
            {message ? (
              <Typography style={{ height: 10, marginTop: 15 }} color='error'>
                {message}
              </Typography>
            ) : (
              <Typography style={{ height: 10, marginTop: 15 }}></Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            variant={'outlined'}
            onClick={handleOnCancel}
            style={{ textTransform: 'capitalize', fontSize: 16 }}
          >
            Cancel
          </Button>
          <Button
            color={'primary'}
            variant={'contained'}
            disabled={!state.title || !state.image}
            style={{ textTransform: 'capitalize', fontSize: 16 }}
            onClick={isAdd ? handleOnAdd : handleOnEdit}
          >
            {isAdd ? 'Add' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

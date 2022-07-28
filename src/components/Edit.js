/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef,useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment-mini';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants/color';
import { IMAGES } from '../assets';
import * as categoryActions from '../actions/categoryAction';
import { useStyles } from './EditStyles';
import ImageCropper from './Cropper';
import Confirm from './Confirm';
import ButtonWithLoader from '../elements/buttonWithLoader';
import PostThumbnailSelect from './PostThumbnailSelect'
import * as pageActions from '../actions/pageAction'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { AlertNotificationContext } from '../elements/alert-notfication/alertState'

const toDate = (dateStr) => {
  if(typeof dateStr === 'object') {
    return dateStr;
  }
  const [day, month, year] = dateStr.split("-")
  return new Date(year, month - 1, day)
}

const checkBoxStyles = (theme) => ({
  root: {
    '&$checked': {
      color: COLORS.PRIMARY,
    },
  },
  checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const CustomRadio = withStyles(checkBoxStyles)(Radio);

const CategorySelection = ({state, handleChangeCategory,handleChangeSubCategory, classes}) => {
  const categoryList = useSelector((state) => state.category.categoryList);
  const subCategoryList = useSelector((state) => state.category.subCategoryList);
  return (
  <>
      <Box display="flex" style={{ width: '100%' }} justifyContent="space-between">
              <Box style={{ width: '48%' }}>
                <Typography
                  gutterBottom
                  variant="body1"
                  style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
                >
                  Category*
                </Typography>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                  <Select
                    style={{ width: 'auto' }}
                    value={state.category}
                    onChange={handleChangeCategory}
                    className={classes.select}
                  >
                    {categoryList.map((item) => (
                      <MenuItem value={item._id} key={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box style={{ width: '48%' }}>
                <Typography
                  gutterBottom
                  variant="body1"
                  style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
                >
                  Subcategory
                </Typography>
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
                  <Select
                    style={{ width: 'auto' }}
                    disabled={subCategoryList.length === 0 || !subCategoryList}
                    value={state.subCategory}
                    onChange={handleChangeSubCategory}
                    className={classes.select}
                  >
                    {subCategoryList === null ? (
                      <MenuItem value="">select</MenuItem>
                    ) : (
                      subCategoryList?.map((item) => (
                        <MenuItem value={item._id} key={item._id}>
                          {item.title}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Box>
  </>
  )
}


const Edit = function ({
  page, isEdit, editClose, onEdit, approveEdit, editAndApprove, approveEditLoader
}) {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const { setAlert } = useContext(AlertNotificationContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  // const [loading, setLoading] = useState(false);
  const pageDetailsLoading = useSelector((state) => state.page.pageDetailsLoader);
  const pagePostThumbnails = useSelector((state) => state.page.pagePostThumbnails)
  const tags = useSelector((state) => state.page.tags);
  const [state, setState] = React.useState({
    title: page?.title,
    category: page?.category,
    image: page?.image,
    description: page?.description,
    subCategory: page?.subCategory || '',
    priority: page?.priority || 'high',
    pagedob: page?.pagedob || null,
    dod: page?.dod || null,
    tags: page?.tags || [],
    content: page?.content || ''
  });



  const [celebrityPage,setCelebrityPage] = useState(page?.pagedob ? true : false);
  const [selected,setSelected] = useState([]);

  const classes = useStyles();

  useEffect(() => {
  setState({
    title: page?.title,
    category: page?.category,
    image: page?.image,
    description: page?.description,
    subCategory: page?.subCategory || '',
    priority: page?.priority || 'high',
    pagedob: page?.pagedob || null,
    dod: page?.dod || null,
    tags: page?.tags || [],
    content: page?.content || ''
  })
  setCelebrityPage(page?.pagedob ? true : false)
  },[page])

  useEffect(() => {
    // API Call for Categories here
    dispatch(categoryActions.getCategories(() => {}));
    dispatch(pageActions.getTags());
  }, []);

  useEffect(() => {
    if (state.category) {
      dispatch(
        categoryActions.getSubCategories(state.category, () => {}),
      );
    }
  }, [state.category]);

  const handleChangeCategory = (e) => {
    setState({ ...state, category: e.target.value });
    if (e.target.value !== page?.category) {
      setState({ ...state, category: e.target.value, subCategory: null });
    } else {
      setState({ ...state, category: e.target.value, subCategory: page?.subCategory});
    }
  };

  const handleChangeSubCategory = (e) => {
    setState({ ...state, subCategory: e.target.value });
  };

  const handleChange = (key) => (e) => {
    setState({ ...state, [key]: e.target.value });
  };

  const handleImageUpload = (file) => {
    if (file) dispatch(categoryActions.uploadImage(file, handleImage, 'page'));
  };
  const handleImageChange = async (croppedFile) => {
    handleImageUpload(croppedFile);
    // console.log('RESIA:', resultData?.data?.data?.s3url);
    // setCompletedCrop(resultData?.data?.data?.s3url);
  };

  const handleImage = (data) => {
    setState({ ...state, image: data?.s3url });
  };

  const handleEditandApprove = () => {
    setOpenConfirm(false);
     if(!celebrityPage) {
      setSelected([]);
      editAndApprove(page?._id, {...state,subCategory: state?.subCategory === '' ? null : state?.subCategory, pagedob: null, dod: null},[]);
      return;
    }
    if (state.subCategory === '') {
        editAndApprove(page._id, { ...state, subCategory: null },selected);
      } else {
        editAndApprove(page._id, { ...state },selected);
    }
    // editAndApprove(page?._id, state);
  };

  const handleCloseEdit = () => {
    dispatch(categoryActions.clearSubCategories());
    dispatch(pageActions.clearPageDetails());
    editClose();
  };

   function handleInputChange(event, value) {
    setState({
      ...state,
      tags: [...value]
    });
  }

  const handleSave = () => {
    if(celebrityPage && !state.pagedob) {
      setAlert('error','Please enter date of birth');
      return;
    }
    if(celebrityPage && selected.length === 0 && pagePostThumbnails.length > 0) {
      setAlert('error','Please select atleast one birthday post');
      return;
    }
    if(!celebrityPage) {
      setSelected([]);
      onEdit(page?._id, {...state, subCategory: state?.subCategory === '' ? null : state?.subCategory, pagedob: null, dod: null},[]);
      return;
    }
    if (state.subCategory === '') {
        onEdit(page._id, { ...state, subCategory: null },selected);
      } else {
        onEdit(page._id, { ...state },selected);
    }
  }
 

  const RenderImageSelect = function (handleClick) {
    return (
      <>
        <InputLabel className={classes.label} onClick={handleClick}>
          <Card className={classes.image}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${state.image})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageBtn}>
              <img
                src={IMAGES.CAMERA_ICON}
                alt="Camera Icon"
                style={{ marginBottom: 8 }}
              />
            </span>
          </Card>
        </InputLabel>
      </>
    );
  };

  return (
    <div>
      <Dialog
        onClose={handleCloseEdit}
        // aria-labelledby="customized-dialog-title"
        open={isEdit}
        fullWidth
        maxWidth='lg'
        // style={{width: 800}}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseEdit}
          style={{ paddingTop: '4px', paddingBottom: '4px' }}
          // style={{ width: 800 }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle2"
              style={{ fontWeight: 600, color: COLORS.TEXT }}
            >
              Edit Page Details
            </Typography>
            <IconButton onClick={handleCloseEdit}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          {pageDetailsLoading ? (
             <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, height: '100%'}}>
                 <CircularProgress size={42} color='primary' />
              </div>
          ) : 
          (<>
          <Box
            style={{
              width: '45%',
              backgroundColor: 'white',
              margin: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box display="flex" justifyContent="center">
              <TextField
                accept="image/*"
                className={classes.input}
                id="contained_button_file"
                type="file"
                onChange={handleImageUpload}
              />
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
                buttonText="Upload Image"
                customComponent={RenderImageSelect}
              />
            </Box>
            <Typography
              gutterBottom
              variant="body1"
              style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              Page name*
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={state.title}
              onChange={handleChange('title')}
              className={classes.fields}
              InputProps={{
                className: classes.fields,
              }}
              inputProps={{
                maxLength: 25,
              }}
              style={{ color: COLORS.GRAY_BLACK }}
            />
            <Typography
              gutterBottom
              style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              About
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              value={state.description}
              onChange={handleChange('description')}
              className={classes.fields}
              style={{ color: COLORS.GRAY_BLACK }}
              InputProps={{
                className: classes.fields,
                boxShadow: 'none',
              }}
              inputProps={{
                maxLength: 60,
              }}
            />

            <CategorySelection state={state} handleChangeCategory={handleChangeCategory} handleChangeSubCategory={handleChangeSubCategory} classes={classes} />
        
            <Typography
              gutterBottom
              variant="body1"
              style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              Tags
            </Typography>
            <Autocomplete
              onChange={handleInputChange}
              multiple
              id="tags-filled"
              options={tags}
              defaultValue={state?.tags}
              freeSolo
              fullWidth
              renderTags={(value, getTagProps) => value.map((option, index) => (
                <Chip deleteIcon={<CloseOutlinedIcon />} variant="outlined" label={option} {...getTagProps({ index })} style={{background: '#F7F7F8', border: 'none'}}  />
              ))}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="" placeholder="" fullWidth/>
              )}
            />
              <Typography
              gutterBottom
              variant="body1"
              style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              Recommendation in India
            </Typography>
     <RadioGroup aria-label="Recommendation" name="Recommendation" value={state?.priority} style={{display: 'flex', flexDirection: 'row'}} 
     onChange={(value, item) => setState({
       ...state, priority: item
     })}>
        <FormControlLabel value="high" control={<CustomRadio />} label="High" />
        <FormControlLabel value="low" control={<CustomRadio />} label="Low" />
      </RadioGroup>
          </Box>
          <Box style={{width: '55%', marginLeft: 20}}>
         
            <Typography
              gutterBottom
              style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              Content
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={state.content}
              onChange={handleChange('content')}
              style={{ color: COLORS.GRAY_BLACK, }}
              InputProps={{
                className: classes.fields,
                boxShadow: 'none',
              }}
    
            />

         <FormControlLabel
            control={<CustomCheckbox checked={celebrityPage} name='fact' />}
            label='Celebirty / Personality Page'
            onChange={() => {setCelebrityPage(!celebrityPage)}}
            className={classes.checkboxClass}
          />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid style={{display: 'flex', flex: 1}}>
                <Grid style={{display: 'flex',flex: 0.5, flexDirection: 'column', marginRight: 10}}>
                <Typography
                gutterBottom
                style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15,marginBottom: -10 }}
              >
              Date of Birth
            </Typography>
            <KeyboardDatePicker
            disabled={!celebrityPage}
              fullWidth
              margin='normal'
              inputVariant='outlined'
              id='date-picker-dialog'
              format='dd / MM / yyyy'
              minDate="1000-01-01"
              value={state?.pagedob}
              onChange={(date) => {setState({
                ...state,pagedob: moment(date).format('YYYY-MM-DD')
              })}}
              className={classes.date}
              maxDate={new Date()}
              InputProps={{
                disableUnderline: true,
              }}
              placeholder='Date of birth'
            />
           </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column',flex: 0.5}}>
              <Typography
              gutterBottom
              style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15, marginBottom: -10 }}
            >
              Date of Death
            </Typography>
            <KeyboardDatePicker
             fullWidth
             disabled={!state?.pagedob || !celebrityPage}
              margin='normal'
              maxDate={new Date()}
              inputVariant='outlined'
              id='date-picker-dialog'
              format='dd / MM / yyyy'
              // minDate="1000-01-01"
              value={state?.dod}
              onChange={(date) => {setState({
                ...state, dod: moment(date).format('YYYY-MM-DD')
              })}}
              className={classes.date}
              InputProps={{
                disableUnderline: true,
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              placeholder='Date of death'
              minDate={state?.pagedob}
            />
            </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <PostThumbnailSelect pageId={page?._id} selected={selected} setSelected={setSelected} celebrityPage={celebrityPage} />
          </Box>
          </>)}
  
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            color="primary"
            variant="outlined"
            style={{ fontSize: 16, textTransform: 'capitalize' }}
          >
            Cancel
          </Button>
          {approveEdit ? (
            <ButtonWithLoader
              onClick={() => {
                // if(!state.image || state.image === '') {
                //   setAlert('error','Please add a page image to continue');
                //   return;
                // }
                if (approveEdit) {
                  setOpenConfirm(true);
                  return;
                }
               handleSave();
                // if(state?.title && state?.category && !approveEdit) {
                //   editClose()
                // }
              }}
              color="primary"
              variant="contained"
              style={{ fontSize: 16, textTransform: 'capitalize' }}
              disabled={!state?.title || !state?.category || approveEditLoader}
              loading={approveEditLoader}
            >
              Save & Approve
            </ButtonWithLoader>
          ) : (
            <ButtonWithLoader
              onClick={handleSave}
              color="primary"
              variant="contained"
              loading={approveEditLoader}
              style={{ fontSize: 16, textTransform: 'capitalize' }}
              disabled={approveEditLoader || !state?.title || !state?.category}
            >
              Save
            </ButtonWithLoader>
          )}
        </DialogActions>
      </Dialog>
      {openConfirm && (
      <Confirm
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        text="Do you want to approve this page?"
        // loading={loading}
        handleConfirm={handleEditandApprove}
      />
      )}
    </div>
  );
};

export default Edit;

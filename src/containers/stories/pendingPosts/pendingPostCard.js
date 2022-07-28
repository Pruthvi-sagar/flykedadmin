import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-mini';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import DateFnUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import unCheckImage from '../../../assets/checkbox/checkUn.svg';
import CheckBoxIcon from '../../../assets/checkbox/checkbox.svg';
import QuestionAvatar from '../../../assets/checkbox/questionAvatar.svg';
import EditIcon from '../../../assets/checkbox/editIcon.svg';
import { DateConverter } from '../../../elements/dateConverter';
import PageSelectionModel from './pageSelectModel';
import ImageCropColorPalletModel from './imageCrop&ColorPalletModel';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import ConfirmDialog from '../../../elements/confirmModel';
import * as pendingPostAction from '../../../actions/pendingPostAction';
import ButtonWithLoader from '../../../elements/buttonWithLoader';
import { SELECTED_PENDING_POSTS } from '../../../actions/types';
import './style.css';
import PostTypeSelectionModle from './postTypeSelection';
import PostSegmentSelectionModel from './postSegmentSelection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import stringAvatar from '../../../elements/stringAvatar';
import swipeImage from '../../../assets/swipeIcon.svg'


const styles = makeStyles(() => ({
  input: {
    '&::placeholder': {
      color: 'rgba(255,255,255,10)',
      font: 'normal normal 23px/29px "Lexend Deca", sans-serif',
      lineHeight: 'initial',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  shortTitle: {
     '&::placeholder': {
      // color: '#ccc',
      font: 'normal normal 14px/16px "Lexend Deca", sans-serif',
      lineHeight: 'initial',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    },
  }
}));

const PendingPostCard = ({ cardDetails, postKey, postTypeComponent }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const classes = styles();
  const confirmModelLoading = useSelector((state) => state?.pendingPosts?.postApproveRejectLoading);
  const { setAlert } = useContext(AlertNotificationContext);
  const [postImage, setPostImage] = useState('');
  const [postText, setPostText] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [dob, setDob] = useState(null);
  const [selectedPost, setSelectedPost] = useState('');
  const currentPageNo = useSelector((state) => state?.pendingPosts?.currentPageNo);
  const [handleFocused, setHandleFocused] = useState(false);
  const [openDateModel, setOpenDateModel] = useState(false);
  const [openPageModel, setOpenPageModel] = useState(false);
  const [openTypeModel, setOpenTypeModel] = useState(false);
  const [openSegmentModel, setOpenSegmentModel] = useState(false);
  const [openImageModel, setOpenImageModel] = useState(false);
  const [openConfirmModel, setOpenConfirmModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const postSelectedList = useSelector((state) => state?.pendingPosts?.selectedPendingPosts);
  const updateLoading = useSelector((state) => state?.pendingPosts?.updatePostLoading);
  const postFilter = useSelector((state) => state?.filter?.postPublished);
  const slider = useRef();
  const [sliderIndex, setSliderIndex] = useState(0);
  const input = useRef();

  const today = new Date();
  const createdDate = new Date(cardDetails?.createdAt);
  const diff = today - createdDate;
  const diffYear = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHrs = diff / (1000 * 60 * 60);
  const diffMin = diff / (1000 * 60);
  let postedTime = '';
  if (diffMin < 1) {
    postedTime = `now`;
  } else if (diffMin > 1 && diffMin < 60) {
    postedTime = `${Math.floor(diffMin)} minutes ago`;
  } else if (diffMin >= 60 && diffHrs < 24) {
    postedTime = `${Math.floor(diffHrs)} hours ago`;
  } else if (diffHrs >= 24 && diffDays < 30) {
    postedTime = `${Math.floor(diffDays)} days ago`;
  } else if (diffDays >= 30 && diffMonths < 12) {
    postedTime = `${Math.floor(diffMonths)} months ago`;
  } else {
    postedTime = `${Math.floor(diffYear)} months ago`;
  }


  useEffect(() => {
    setPostText(sliderIndex === 0 ? cardDetails?.coverImage?.shortTitle : cardDetails?.images[sliderIndex - 1]?.text);
  }, [cardDetails,sliderIndex]);

  const handleImage = async (data) => {
    // if (!postText) {
    //   setAlert('warning', 'Please enter a text before adding the image');
    //   return;
    // }
    if (data?.size > 5000000) {
      setAlert('warning', 'Image size must be less than 5MB');
      return;
    }
    if (data?.type === 'image/png' || data?.type === 'image/jpeg' || data?.type === 'image/webp') {
      setPostImage(data);
      setSelectedPost(cardDetails);
      setOpenImageModel(true);
    } else {
      setAlert('warning', 'Upload only images on png or jpeg or webp format');
    }
  };

  const handleUpdatePage = () => {
    setOpenPageModel(true);
    setSelectedPost(cardDetails);
  };

  const handleUpdateType = () => {
    setOpenTypeModel(true);
    setSelectedPost(cardDetails);
  }

  const openImageSelect = () => {
    // if (!postText) {
    //   setAlert('warning', 'Please enter a text before adding the image.');
    // } else {
      inputRef.current.click();
    // }
  };

  const handleCallBack = (status) => {
    setOpenConfirmModel(false);
    setIsLoading(false);
    setOpenDateModel(false);
    setOpenTypeModel(false);
    setSelectedPost('');
    dispatch(pendingPostAction.getPendingUnAssignedStoriesList(postTypeComponent, currentPageNo, setAlert, postFilter));
    if (status !== 'NoClear') {
      setSelectedPost('');
      dispatch({ type: SELECTED_PENDING_POSTS, payload: [] });
    }
  };

  const handleValidation = (type) => {
    if (!cardDetails?.coverImage?.shortTitle) {
      setAlert('warning', `Please enter the text before ${type}`);
      return false;
    }
     if (!cardDetails.images.every((item) => item?.text.length > 1)) {
setAlert('warning', `Please enter all text to ${type}`);
      return false;
     }
    return true;
  };

  const handleApproveReject = (type, status) => {
    if ((type === 'approve' && !status && handleValidation(type)) || (type === 'reject') || status === 'noValidation') {
      const data = {
        stories: [cardDetails?._id],
      };
      if (type === 'approve') {
        setIsLoading(true);
      }
      dispatch(pendingPostAction.handleStoryApprovieReject(type, data, setAlert, handleCallBack));
    }
  };

  const handleRecordSelect = (id) => {
    const currentIndex = postSelectedList.indexOf(id);
    const newChecked = [...postSelectedList];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch({ type: SELECTED_PENDING_POSTS, payload: newChecked });
  };

  const handelUpdate = (id, body, approve) => {
    // if (postTypeComponent !== 'pendingPosts' && (cardDetails?.postType === 'onThisDay' || cardDetails?.postType === 'inTheNews') && (!cardDetails?.shortTitle || cardDetails?.shortTitle === '' || !shortTitle)) {
    //   setAlert('warning', `Please enter the short title}`);
    //   return false;
    // }
    dispatch(pendingPostAction.updateStoryDetails(id, body, setAlert, approve ? () => { handleApproveReject('approve', 'noValidation'); setOpenPageModel(false); setSelectedPost(''); setOpenTypeModel(false); } : handleCallBack));
  };

  const updateWhenSlide = () => {
  // do something
    if (sliderIndex === 0 && postText !== cardDetails?.coverImage?.shortTitle) {
                        handelUpdate(cardDetails?._id, { ...cardDetails, coverImage: {
                          image: cardDetails?.coverImage?.image,
                          shortTitle: postText
                        } });
                        return;
                      }
                        let images = cardDetails?.images;
                        images[sliderIndex - 1] = {
                          image: images[sliderIndex - 1]?.image,
                          text: postText
                        }
                        handelUpdate(cardDetails?._id, { ...cardDetails, images });
                        return;
}



  return (
    <>
      <Grid container spacing={2} className="pending-post-detail-card">
        <Grid item md={12} xs={12}>
          <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
          <Grid item md={12} xs={12} style={{ borderBottom: '1px solid #E3E5E8', position: 'relative' }}>
              <Grid container justifyContent="flex-start" alignItems="center">
                <Grid item>
                  <Checkbox
                    style={{ color: '' }}
                    color="primary"
                    onChange={(e) => handleRecordSelect(cardDetails?._id)}
                    checked={postSelectedList?.filter((item) => item === cardDetails?._id)?.length}
                    icon={<img src={unCheckImage} alt="crash" style={{ height: '18px', width: '18px' }} />}
                    checkedIcon={<img src={CheckBoxIcon} alt="crash" color="primary" style={{ height: '18px', width: '18px' }} />}
                  />
                </Grid>
                <Grid item className="pending-post-user-detail-image-div">
                  <Avatar loading="lazy" {...stringAvatar(cardDetails?.createdBy?.name)} src={cardDetails?.createdBy?.profileImage || ''} style={{ height: '32px', width: '32px', fontSize: '12px' }} />
                </Grid>
                <Grid item>
                  <Typography className="pending-post-user-label">Posted by</Typography>
                  <Typography className="pending-post-user-name" title={cardDetails?.createdBy?.name || ''}>{cardDetails?.createdBy?.name || ''}</Typography>
                </Grid>
                <Grid item style={{position: 'absolute', right: 10}}>
                <Typography style={{ color: '#888F9D',  fontSize: 10, textTransform: 'uppercase' }}>
                  {postedTime}
                </Typography>
               </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={6} style={{borderBottom: '1px solid #E3E5E8'}}>
              <Grid container justifyContent="flex-start" alignItems="center" style={{ position: 'relative' }}>
                <Grid item className="pending-post-user-detail-image-div">
                  <Avatar loading="lazy" src={cardDetails?.postPage?.image || (!cardDetails?.postPage?.title && QuestionAvatar)} {...stringAvatar(cardDetails?.postPage?.title)} style={{ height: '32px', width: '32px', fontSize: '12px' }} />
                </Grid>
                <Grid item>
                  <Typography className="pending-post-user-label">Posted on</Typography>
                  <Typography className="pending-post-user-name" title={cardDetails?.postPage?.title || ''}>{cardDetails?.postPage?.title || 'Unassigned'}</Typography>
                </Grid>
                <Grid item style={{ position: 'absolute', right: '5px' }}>
                  {updateLoading && postKey === selectedPost?._id ? (<CircularProgress size={20} />) : (<IconButton size="small" onClick={() => handleUpdatePage()}><img src={EditIcon} loading="lazy" alt="Edit" style={{ height: '14px', width: '14px' }} /></IconButton>)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} xs={6} style={{ borderLeft: '1px solid #E3E5E8',borderBottom: '1px solid #E3E5E8' }}>
              <Grid container justifyContent="flex-start" alignItems="center" style={{ position: 'relative' }}>
                <Grid item>
                  <Typography className="pending-post-user-label">Story Type</Typography>
                  <Typography className="pending-post-user-name" title={cardDetails?.storyType || ''}>{cardDetails?.storyType}</Typography>
                </Grid>
                {/* <Grid item style={{ position: 'absolute', right: '5px' }}>
                  <IconButton size="small" onClick={() => handleUpdateType()}><img src={EditIcon} loading="lazy" alt="Edit" style={{ height: '14px', width: '14px' }} /></IconButton>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {cardDetails?.coverImage && 
         <div style={{ overflow: 'hidden', width: '100%', background: '#000', positon: 'relative'}}>
      <Slider
          ref={slider}
          infinite
          draggable={false}
          beforeChange={(index, next) => {
                    // console.log('index', index, direction);
                    setSliderIndex(next);
                  }}
        // beforeChange={(item, i) => getNextResults(i)}

        >
   {[cardDetails?.coverImage, ...cardDetails?.images].map((item, index) => (
     <div>
     
        <Grid
          item
          md={12}
          xs={12}
          className="pending-post-image-div"
          style={{
            backgroundImage: `linear-gradient(359.55deg, #000000 -0.47%, rgba(0, 0, 0, 0.8) 18.05%, rgba(28, 33, 33, 0) 42.51%, rgba(0, 0, 0, 0) 42.51%), url(${typeof item?.image === 'object' ? URL.createObjectURL(item?.image) : item?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom, top center',
            backgroundRepeat: 'no-repeat, no-repeat',
          }}
        >
          
          
          {/* <img src={item?.image} alt='story' /> */}
          <Grid container spacing={2} className="pending-post-action-div">
            
            <Grid item md={12} xs={12} style={{ textAlign: 'right', margin: '10px 0px 0px 0px' }}>
             <input
                style={{ display: 'none' }}
                id={`profile-image${postKey}`}
                type="file"
                accept=".jpeg, .png, .webp"
                // disabled={!postText}
                onChange={(e) => handleImage(e.target.files[0])}
                ref={inputRef}
                onClick={(e) => {
                  e.target.value = '';
                }}
              />
              <label
                htmlFor={`profile-image${postKey}`}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  marginRight: 10
                }}
              >
                <IconButton onClick={openImageSelect} size="small" style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: '#FFFFFF', padding: '10px' }}>
                  <CameraAltOutlinedIcon style={{ height: '16px', width: '15px' }} />
                </IconButton>
              </label>
          
            </Grid>
                  <div
      style={{
         background: 'transparent', display: 'flex',marginLeft: 20, marginTop: -120, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 100, width: 40, height: 40, justifyContent: 'center', alignItems: 'center'
      }}
    >
    <h4 style={{color: 'white'}}> {`${sliderIndex + 1} / ${[cardDetails?.coverImage, ...cardDetails?.images].length}`}</h4>
    </div>
                <div
      style={{
         background: 'transparent', display: 'flex', marginTop: 160, marginLeft: 20
      }}
    >
        
      <img   onClick={(e) => { e.preventDefault(); updateWhenSlide(); slider?.current?.slickPrev() } } src={swipeImage} alt="swipeIcon" width={'40px'} height={'40px'} style={{ transform: 'rotate(180deg)',cursor: 'pointer', }} />
    </div>
         
    <div
  
      style={{
        cursor: 'pointer',background: 'transparent',marginTop: -110, marginRight: 20, display: 'flex', justifyContent: 'flex-end'
      }}
    >
      <img     onClick={(e) => {
        e.preventDefault();
        updateWhenSlide();
  slider?.current?.slickNext();
      }} src={swipeImage} alt="swipeIcon" width={'40px'} height={'40px'} style={{cursor: 'pointer',}} />
    </div>
            <Grid item md={12} xs={12}>
              <Grid container spacing={1} style={{ padding: '10px 30px' }}>
                
                <Grid item md={12} xs={12}>
                  <TextField
                  inputRef={input}
                    value={postText}
                    maxLength={sliderIndex === 0 ? 50 : 125}
                    multiline
                    rows={3}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      classes: { input: classes.input },
                      // endAdornment: <InputAdornment position="end" style={{ display: (updateLoading && postKey === selectedPost?._id) ? '' : 'none' }}><CircularProgress size={20} /></InputAdornment>
                    }}
                    inputProps={{
                      min: 0,
                      maxLength: sliderIndex === 0 ? 50 : 125,
                      style: {
                        textAlign: 'center',
                        color: '#FFF',
                        font: 'normal normal 18px/22px "Lexend Deca", sans-serif',
                        lineHeight: 'initial',
                        alignItems: 'center',
                        display: 'flex',
                        border: handleFocused ? '1px solid #EF613B' : '',
                        padding: '10px',
                      },
                    }}
                    onFocus={(e) => { setHandleFocused(true); e.target.placeholder = ''; setSelectedPost(cardDetails); }}
                    onBlur={(e) => {
                      setHandleFocused(false);
                      e.target.placeholder = 'Tap to type your fact max length 125 characters';
                    
                      if (!postText) {
                        if(sliderIndex === 0) {
                          setPostText(cardDetails?.coverImage?.shortTitle)
                        }
                        else {
                          setPostText(cardDetails?.images[sliderIndex].text)
                        }
                        return;
                      }
                      if (sliderIndex === 0 && postText !== cardDetails?.coverImage?.shortTitle) {
                        handelUpdate(cardDetails?._id, { ...cardDetails, coverImage: {
                          image: cardDetails?.coverImage?.image,
                          shortTitle: postText
                        } });
                        return;
                      }
                        let images = cardDetails?.images;
                        images[sliderIndex - 1] = {
                          image: images[sliderIndex - 1]?.image,
                          text: postText
                        }
                        handelUpdate(cardDetails?._id, { ...cardDetails, images });
                        return;
                    }}
                    placeholder="Tap to type your fact max length 125 characters"
                    onChange={(e) => setPostText(e.target.value.trimLeft())}
                  />
                </Grid>
                <Grid item md={12} xs={12} style={{ textAlign: 'center', display: (cardDetails?.postType === 'onThisDay' || cardDetails?.postType === 'onBirthday') ? '' : 'none' }}>
                  <Typography className="pending-post-dob-text" onClick={(e) => { e.preventDefault(); setOpenDateModel(true); }}>{cardDetails?.postType === 'onThisDay' ? (cardDetails?.thisDayDate ? DateConverter(cardDetails?.thisDayDate) : 'Enter date of event') : cardDetails?.postType === 'onBirthday' ? (cardDetails?.dob ? DateConverter(cardDetails?.dob) : 'Enter DOB') : ''}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
 
        </Grid>
        </div>
   ))}
        </Slider>
        </div>
        }
    
        <Grid item md={12} xs={12} className="pending-post-footer-btns">
          <Grid container>
            <Grid item md={postTypeComponent === 'unAssignedPosts' ? 12 : 6} xs={postTypeComponent === 'unAssignedPosts' ? 12 : 6}>
              <Button onClick={() => setOpenConfirmModel(true)} fullWidth style={{ borderRadius: postTypeComponent === 'unAssignedPosts' ? '0px 0px 4px 4px' : '0px 0px 0px 4px', color: '#EF4444' }} variant="contained" className="pending-post-footer-accept-reject-btn">
                <CloseIcon fontSize="small" />
                {' '}
                Reject
              </Button>
            </Grid>
            <Grid item md={6} xs={6} style={{ borderLeft: '1px solid #E3E5E8', display: postTypeComponent !== 'unAssignedPosts' ? '' : 'none' }}>
              <ButtonWithLoader loading={isLoading} disabled={isLoading} onClick={() => handleApproveReject('approve')} fullWidth style={{ borderRadius: '0px 0px 4px 0px', color: '#55A44A' }} variant="contained" className="pending-post-footer-accept-reject-btn">
                <CheckIcon fontSize="small" />
                {' '}
                Approve
              </ButtonWithLoader>
            </Grid>
          </Grid>
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnUtils} style={{ display: 'none' }}>
          <KeyboardDatePicker
            value={dob}
            open={openDateModel}
            format="dd / MM / yyyy"
            minDate="1000-01-01"
            onChange={(value) => {
              setDob(value);
              if (+new Date(value) !== +new Date(cardDetails?.dob)) {
                if (cardDetails?.postType === 'onThisDay') {
                  handelUpdate(cardDetails?._id, { thisDayDate: moment(value).format('YYYY-MM-DD') });
                } else {
                  handelUpdate(cardDetails?._id, { dob: moment(value).format('YYYY-MM-DD') });
                }
              }
              setOpenDateModel(true);
            }}
            maxDate={new Date()}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onClose={() => setOpenDateModel(false)}
            InputProps={{
              style: {
                display: 'none',
              },
            }}
          />
        </MuiPickersUtilsProvider>
        {openImageModel && postKey === selectedPost?._id ? (
          <ImageCropColorPalletModel
            openCropModel={openImageModel}
            selectedImage={postImage}
            setSelectedImage={setPostImage}
            closePalletModel={() => {
              setOpenImageModel(false);
              setSelectedPost('');
            }}
            handleUpdateData={handelUpdate}
            postTypeComponent={postTypeComponent}
            handleStep1Back={() => { setOpenImageModel(false); inputRef.current.click(); }}
            postDetails={selectedPost}
            sliderIndex={sliderIndex}
          />
        ) : null}
        {openPageModel && postKey === selectedPost?._id ? (
          <PageSelectionModel
            postKey={postKey}
            postFullDetails={selectedPost}
            openPageModel={openPageModel}
            handleClosePageModel={() => {
              setOpenPageModel(false);
              setSelectedPost('');
            }}
            postTypeComponent={postTypeComponent}
            handleUpdateData={handelUpdate}
            pageSelected={selectedPost?.postPage}
          />
        ) : null}
        {openTypeModel && postKey === selectedPost?._id ? (
          <PostTypeSelectionModle
            postKey={postKey}
            postFullDetails={selectedPost}
            openTypeModel={openTypeModel}
            handleCloseTypeModel={() => {
              setOpenTypeModel(false);
              setSelectedPost('');
            }}
            postTypeComponent={postTypeComponent}
            handleUpdateData={handelUpdate}
          />
        ) : null}
          {openSegmentModel && postKey === selectedPost?._id ? (
          <PostSegmentSelectionModel
            postKey={postKey}
            postFullDetails={selectedPost}
            openTypeModel={openSegmentModel}
            handleCloseTypeModel={() => {
              setOpenSegmentModel(false);
              setSelectedPost('');
            }}
            postTypeComponent={postTypeComponent}
            handleUpdateData={handelUpdate}
          />
        ) : null}
        {openConfirmModel ? (
          <ConfirmDialog open={openConfirmModel} cancel={() => setOpenConfirmModel(false)} confirm={() => handleApproveReject('reject')} title="Reject" content="Are you sure want to reject the items?" cancelLabel="Cancel" confirmLabel="Confirm Reject" loading={confirmModelLoading} />
        ) : null}
      </Grid>
    </>
  );
};

export default PendingPostCard;

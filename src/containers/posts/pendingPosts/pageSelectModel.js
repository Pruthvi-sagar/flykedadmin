/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, {
  useCallback, useContext, useRef, useEffect, useState,
} from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DoneIcon from '@material-ui/icons/Done';
import SearchIcon from '@material-ui/icons/Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import ButtonWithLoader from '../../../elements/buttonWithLoader';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import * as pendingPostAction from '../../../actions/pendingPostAction';
import './style.css';
import stringAvatar from '../../../elements/stringAvatar';
// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
  
  const PageSelectionModel = ({
    postKey, openPageModel, handleClosePageModel, pageSelected, postFullDetails, handleUpdateData, postTypeComponent,
  }) => {
    const appTheme = useTheme();
    const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const { setAlert } = useContext(AlertNotificationContext);
    const isloading = useSelector((state) => state?.pendingPosts?.pageLoading);
    const updateLoading = useSelector((state) => state?.pendingPosts?.updatePostLoading);
    const [searchValue, setSearchValue] = useState('');
    const [postPageList, setPostPageList] = useState('');
    const [selectedPage, setSelectedPage] = useState('');
  
    const handleSearch = useCallback(_.debounce((value) => {
      dispatch(pendingPostAction.handleSearchPage(value, 1, setAlert, setPostPageList));
      setSelectedPage('');
    }, 500), []);

    useEffect(() => {
      if (openPageModel && (postKey === postFullDetails?._id)) {
        dispatch(pendingPostAction.handleSearchPage('', 1, setAlert, setPostPageList));
        setSelectedPage('');
        setSearchValue('');
      }
    }, [pageSelected, openPageModel]);
  
    const handleSelect = (data) => {
      if (selectedPage?._id === data?._id) {
        setSelectedPage('');
      } else if (data) {
        setSelectedPage(data);
      }
    };
  
    const handleTitleId = (value) => `title${value}`;
  
    useEffect(() => {
      const ids = [];
      if (postPageList?.results?.length > 0) {
        for (let i = 0; i < postPageList?.results?.length; i += 1) {
          const value = `title${postPageList?.results?.[i]?._id}`;
          ids.push(document?.getElementById(value));
        }
      }
      if (ids?.length > 0) {
        for (let i = 0; i < ids?.length; i += 1) {
          const textItem = ids?.[i];
          // const special = /[\\[{().+*?|^$]/g;
          if (textItem) {
            const inputValue = searchValue;
            const regx = new RegExp(inputValue, 'gi');
            textItem.innerHTML = textItem.textContent.replace(regx, '<mark style="color: #EF613B;background: none">$&</mark>');
          }
        }
      }
    }, [postPageList]);
  
    useEffect(() => {
      if (openPageModel) {
        setTimeout(() => {
          searchRef?.current?.focus();
        }, 10);
      }
    }, [searchRef, openPageModel]);
  
    const fetchPosts = () => {
      if (postPageList?.hasNextPage && parseInt(postKey, 10) === parseInt(postFullDetails?._id, 10)) {
        dispatch(pendingPostAction.handleSearchPage(searchValue, postPageList?.nextPage, setAlert, setPostPageList, postPageList?.results));
      }
    };
  
    const handleModelClose = () => {
      setSearchValue('');
      setPostPageList('');
      setSelectedPage('');
      handleClosePageModel();
    };

    const handleValidation = (type) => {
      if (!postFullDetails?.text) {
        setAlert('warning', `Please enter the text before ${type}`);
        return false;
      }
      if (postFullDetails?.text?.length < 51) {
        setAlert('warning', `You have to enter the minimum 50 characters about post to ${type}`);
        return false;
      }
      if ((postFullDetails?.postType === 'onThisDay' || postFullDetails?.postType === 'inNews') && (!postFullDetails?.shortTitle || postFullDetails?.shortTitle === '')) {
        setAlert('warning', `Please enter the short title before ${type}`);
        return false;
      }
      if (postFullDetails?.postType === 'onThisDay' && !postFullDetails?.thisDayDate) {
        setAlert('warning', `Please Enter date of event to ${type}`);
        return false;
      }
      if(postFullDetails?.postType === 'onBirthday' && !postFullDetails?.dob) {
        setAlert('warning', `Please Enter DOB to ${type}`);
        return false;
      }
      return true;
    };
  
    const handleSaveAndApprove = () => {
      if(postTypeComponent === 'unAssignedPosts') {
        if(handleValidation('approve')) {
          handleUpdateData(postFullDetails?._id, { postPage: selectedPage?._id }, postTypeComponent === 'unAssignedPosts',selectedPage);
        }
      } else {
        handleUpdateData(postFullDetails?._id, { postPage: selectedPage?._id }, postTypeComponent === 'unAssignedPosts',selectedPage);
      }
    }

    return (
      <Dialog
        open={openPageModel}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        PaperProps={{
          style: {
            width: isMobile ? '100%' : '520px',
            borderRadius: isMobile ? '20px 20px 0px 0px' : '10px',
            margin: isMobile ? '0px' : '',
            bottom: isMobile ? '0px' : '',
            position: isMobile ? 'absolute' : '',
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="page-select-model-header">
          <Button variant="text" className="page-select-model-header-label">
          {postTypeComponent === 'unAssignedPosts' ? 'Select Page' : 'Change Page'}
          </Button>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '10px' }} className="page-select-model-main-content-div">
            <Grid item md={12} xs={12}>
              <Input
                inputRef={searchRef}
                startAdornment={(
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  )}
                endAdornment={(
                  <InputAdornment position="end" style={{ display: !isloading ? 'none' : '' }}>
                    <CircularProgress size={20} />
                  </InputAdornment>
                  )}
                disableUnderline
                fullWidth
                placeholder="Search pages..."
                value={searchValue}
                className="page-select-model-search-input-field"
                onChange={(e) => {
                  setSearchValue(e.target.value.trimLeft());
                  handleSearch(e.target.value.trimLeft());
                }}
              />
            </Grid>
            <Grid item md={12} xs={12} className="page-select-model-page-list-main-div" id="pageInfinateScrollModel">
              <InfiniteScroll
                scrollableTarget="pageInfinateScrollModel"
                dataLength={parseInt(postPageList?.results?.length, 10) || 0}
                style={{ overflow: 'hidden' }}
                next={fetchPosts}
                hasMore={postPageList?.hasNextPage || false}
                endMessage={(
                  <p style={{ textAlign: 'center', margin: '10px 0px', display: postPageList?.results?.length ? '': 'none' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                        )}
              >
                <Grid container spacing={2} style={{ padding: '0px 5px' }}>
                  {postPageList?.results?.map((item) => (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      key={item?._id}
                      onClick={() => handleSelect(item)}
                      style={{
                          backgroundColor: selectedPage?._id === item?._id ? 'rgba(239, 97, 59, 0.1)' : '', margin: '5px', borderRadius: '5px', cursor: 'pointer', position: 'relative',
                        }}
                    >
                      <Grid container spacing={2} justifyContent="space-between" alignItems="center" style={{ padding: '8px' }}>
                          <Grid container justifyContent="flex-start" alignItems="center" style={{ width: 'auto' }}>
                            <Grid>
                              <Avatar {...stringAvatar(item?.title)} src={item?.image} alt={item?.title} style={{ fontSize: '15px', height:"40px", width:"40px" }} />
                            </Grid>
                            <Grid style={{ marginLeft: '10px' }}>
                              <Typography title={item?.title} id={handleTitleId(item?._id)} className="page-select-model-list-title">
                                {item?.title}
                              </Typography>
                              <Typography title={item?.description} className="page-select-model-list-desc">{item?.description}</Typography>
                            </Grid>
                          </Grid>
                          <Grid style={{
                            float: 'right', display: selectedPage?._id === item._id ? '' : 'none', position: 'absolute', right: '10px',
                          }}
                          >
                            <DoneIcon fontSize="small" style={{ color: '#EF613B' }} />
                          </Grid>
                        </Grid>
                    </Grid>
                  ))}
                  {postPageList?.results?.length === 0 && searchValue ? (
                    <Grid item md={12} xs={12}>
                      <Typography className="page-select-modle-records-not-found-message">
                          <span style={{ color: '#EF613B' }}>{searchValue}</span>
                        &nbsp;Page not found on this search
                        </Typography>
                    </Grid>
                  ) : ''}
                </Grid>
              </InfiniteScroll>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="page-select-model-footer">
          <ButtonWithLoader onClick={handleModelClose} variant="outlined" color="primary" className="page-select-model-footer-btn">Cancel</ButtonWithLoader>
          <ButtonWithLoader
            disabled={isloading || !selectedPage || updateLoading}
            loading={isloading || updateLoading}
            variant="contained"
            color="primary"
            className="page-select-model-footer-btn"
            onClick={() => {
              handleSaveAndApprove();
            }}
          >
            {postTypeComponent === 'unAssignedPosts' ? 'Save & Approve' : 'Change Now'}
          </ButtonWithLoader>
        </DialogActions>
      </Dialog>
    );
  };
  
export default PageSelectionModel;
  
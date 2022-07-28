/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '../../../assets/checkbox/checkbox.svg';
import checkBoxImage from '../../../assets/checkbox/uncheck.svg';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { AlertNotificationContext } from '../../../elements/alert-notfication/alertState';
import * as pendingPostAction from '../../../actions/pendingPostAction';
import { SELECTED_PENDING_POSTS, ALERT_DIALOG } from '../../../actions/types';
import PendingPostCard from './pendingPostCard';
import ConfirmDialog from '../../../elements/confirmModel';
import ButtonWithLoader from '../../../elements/buttonWithLoader';
import AlertDialogNotification from '../../../elements/alertDialog';


const PendingPostsContainer = ({ postList, postTypeComponent, isLoading, setisLoading }) => {
  const dispatch = useDispatch();
  const { setAlert } = useContext(AlertNotificationContext);
  const bulkListApproveRejectList = useSelector((state)=> state?.pendingPosts?.selectedPendingPosts);
  const confirmModelLoading = useSelector((state)=> state?.pendingPosts?.postApproveRejectLoading);
  // const isLoading = useSelector((state) => state?.pendingPosts?.isLoading);
  const [openConfirmModel, setOpenConfirmModel] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const OpenAlertDialog = useSelector((state) => state?.pendingPosts?.alertDialog);
  const postFilter = useSelector((state) => state?.filter?.postPublished);

  // const currentPageNo = useSelector((state)=> state?.pendingPosts?.currentPageNo);

  useEffect(() => {
    if(postFilter) {
      setisLoading(true);
      dispatch(pendingPostAction.getPendingUnAssignedPostList(postTypeComponent, 1, setAlert, postFilter, () => setisLoading(false))); 
    }
  },[postFilter]);

  const handleCallBack = () => {
    setOpenConfirmModel(false);
    setIsLoading(false);
    dispatch(pendingPostAction.getPendingUnAssignedPostList(postTypeComponent, 1, setAlert, postFilter));
    dispatch({ type: SELECTED_PENDING_POSTS, payload: [] });
  };

  const handleValidation = (type) => {
    let proceed = true;
    for(let i = 0; i < bulkListApproveRejectList?.length; i += 1) {
      const postData = postList?.results?.filter((item) => item?._id === bulkListApproveRejectList[i])?.[0];
      if(!postData?.text) {
          setAlert('warning', `Please enter the text before ${type}`);
          proceed = false;
          return false;
      }
      if (postData?.text?.length < 51) {
        setAlert('warning', `You have to enter the minimum 50 characters about post to ${type}`);
        return false;
      }
      if ((postData?.postType === 'onThisDay' || postData?.postType === 'inNews') && (!postData?.shortTitle || postData?.shortTitle === '')) {
      setAlert('warning', `Please enter the short title before ${type}`);
      return false;
    }
      if(!postData?.postPage) {
          setAlert('warning', `Please Select Page before ${type}`);
          proceed = false;
          return false;   
      }
      if (postData?.postType === 'onThisDay' && !postData?.thisDayDate) {
        setAlert('warning', `Please Enter date of event to ${type}`);
        return false;
      }
      if(postData?.postType === 'onBirthday' && !postData?.dob) {
        setAlert('warning', `Please Enter DOB to ${type}`);
        return false;
      }
    }
    return proceed;
  }

  const handleBulkApproveReject = (type) => {
    if(bulkListApproveRejectList?.length === 0) {
        setAlert('warning',`Please select records to ${type}`);
        return;
    }
    if((type === 'approve' && handleValidation(type)) || (type === 'reject')) {
      const data = {
        post: bulkListApproveRejectList,
      };
      if(type === 'approve') {
          setIsLoading(true);
      }
      dispatch(pendingPostAction.handlePostApprovieReject(type, data, setAlert ,handleCallBack));
    }
  };

  const alertDialog = useMemo(() => {
    return <AlertDialogNotification open={OpenAlertDialog?.open} title={OpenAlertDialog?.title || ''} content={OpenAlertDialog?.description || ''} handleClose={() => {dispatch({ type: ALERT_DIALOG, payload: { open: false, title:'', description:'', }})}} />
  }, [OpenAlertDialog]);

  const handleSelectAll = () => {
      if(bulkListApproveRejectList?.length === postList?.results?.length) {
        dispatch({ type: SELECTED_PENDING_POSTS, payload: [] });
      } else {
        const allRecords = [];
        for(let i = 0; i < postList?.results?.length; i += 1 ) {
            allRecords.push(postList?.results?.[i]._id);  
        }
        dispatch({ type: SELECTED_PENDING_POSTS, payload: allRecords });
      }
  }

  const handleRejectSelected = () => {
    if(bulkListApproveRejectList?.length === 0) {
        setAlert('warning',`Please select records to reject`);
        return;
    }
    setOpenConfirmModel(true);
  }

  return (
    <Grid container spacing={2} className="pending-post-main-container">
      <Grid item md={12} xs={12}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item md={6} xs={12} style={{ display : postList?.results?.length > 1 ? '' : 'none'}}>
            <Grid container spacing={2} justifyContent="flex-start">
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    checked={bulkListApproveRejectList?.length === postList?.results?.length}
                    onChange={handleSelectAll}
                    icon={<img src={checkBoxImage} alt="check" style={{ height: '20px', width: '20px' }} />}
                    checkedIcon={<img src={CheckBoxIcon} alt="crash" style={{ height: '20px', width: '20px' }} />}
                  />
                )}
                className="pending-post-check-box-label"
                label="Select All"
              />
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} style={{ display : bulkListApproveRejectList?.length > 1 ? '' : 'none'}}>
            <Grid container justifyContent="flex-end" alignItems="center">
              {bulkListApproveRejectList?.length ? <Typography className="pending-post-selected-count-label">{bulkListApproveRejectList?.length}&nbsp;Selected</Typography> : ''}
              <Button style={{ borderRadius: '4px 0px 0px 4px', color: '#EF4444' }} onClick={()=> handleRejectSelected()} variant="contained" className="pending-post-approve-reject-btn">
                <CloseIcon fontSize="small" />
                {' '}
                Reject
              </Button>
              {postTypeComponent === 'pendingPosts' ? (
                <>
                  <Divider orientation="vertical" style={{ color: '#F7F7F8', width: '1px' }} />
                  <ButtonWithLoader loading={loading} disabled={loading} style={{ borderRadius: '0px 4px 4px 0px', color: '#55A44A' }} onClick={()=> handleBulkApproveReject('approve')} variant="contained" className="pending-post-approve-reject-btn">
                    <CheckIcon fontSize="small" />
                    {' '}
                    Approve
                  </ButtonWithLoader>
                </>
              ) : ''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isLoading ? (
        <Grid item md={12} xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid item md={12} xs={12}>
          {postList?.results?.length !== 0 ? (
            <Grid container spacing={3}>
              {postList?.results?.map((item) => (
                <Grid item md={6} xs={12} key={item?._id}>
                  <PendingPostCard cardDetails={item} postKey={item?._id} postTypeComponent={postTypeComponent} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>Records not found</Typography>
          )}
        </Grid>
      )}
      {openConfirmModel ? (
          <ConfirmDialog open={openConfirmModel} cancel={() => setOpenConfirmModel(false)} confirm={() => handleBulkApproveReject('reject')} title="Reject" content="Are you sure want to reject the items?" cancelLabel="Cancel" confirmLabel="Confirm Reject" loading={confirmModelLoading} />
      ) : ''}
      {OpenAlertDialog?.open ? alertDialog : ''}
    </Grid>
  );
};

export default PendingPostsContainer;
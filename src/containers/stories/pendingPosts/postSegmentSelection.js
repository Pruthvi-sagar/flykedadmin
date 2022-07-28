import React from 'react';
import { useSelector } from 'react-redux';
import useTheme from '@material-ui/core/styles/useTheme';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const PostSegmentSelectionModel = ({ 
    openTypeModel, postKey, handleCloseTypeModel, postFullDetails, handleUpdateData, postTypeComponent,
}) => {
    const appTheme = useTheme();
    const isloading = useSelector((state) => state?.pendingPosts?.pageLoading);
    const updateLoading = useSelector((state) => state?.pendingPosts?.updatePostLoading);
    const [selectedType, setSelectedType] = React.useState('');
    const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
    const postTypeList = [
        {
          id: 1, name: 'Did You Know?', key: 'DidYouKnow',
        },
        {
          id: 2, name: 'Digital Disruptions', key: 'DigitalDisruptions',
        },
        {
          id: 3, name: 'Fascinating Life Bits', key: 'FascinatingLifeBits',
        },
           {
          id: 4, name: 'Sporting Miracles', key: 'SportingMiracles',
        },
           {
          id: 5, name: 'Geographical Wonders', key: 'GeographicalWonders',
        },
        {
          id: 6, name: 'Automotive Dairies', key: 'AutomotiveDairies',
        },
        //  {
        //   id: 7, name: 'Historical Highlights', key: 'HistoricalHighlights',
        // },
      ];

      React.useEffect(() => {
        if(openTypeModel && postFullDetails) {
            setSelectedType(postFullDetails?.segmentType);
         }
      },[openTypeModel, postFullDetails])

    return (
      <Dialog
        open={openTypeModel}
        TransitionComponent={Transition}
        keepMounted
        disableEscapeKeyDown
        disableBackdropClick
        PaperProps={{
          style: {
            width: isMobile ? '100%' : '400px',
            borderRadius: isMobile ? '20px 20px 0px 0px' : '10px',
            margin: isMobile ? '0px' : '',
            bottom: isMobile ? '0px' : '',
            position: isMobile ? 'absolute' : '',
          },
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="page-select-model-header" style={{position: 'relative'}}>
          <Button variant="text" className="page-select-model-header-label">
           Select Segment Group
          </Button>
         <IconButton onClick={handleCloseTypeModel} size="small" style={{position: 'absolute', right: 14, top: 14, zIndex: 100 }}><CloseIcon style={{ color: '#000' }} /></IconButton>

        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }}>
            {postTypeList.map((item) => (
               <Grid onClick={() => handleUpdateData(postFullDetails?._id, { segmentType: item?.key  })} item md={12} xs={12} style={{ marginTop: '5px', marginBottom: '5px', cursor: 'pointer',backgroundColor: selectedType === item?.key ? 'rgba(239, 97, 59, 0.1)': '', borderRadius:'2px', position: 'relative' }}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center" style={{ padding: '8px' }}>
                    <Grid container spacing={2} direction='row' justifyContent="flex-start" alignItems="center" style={{ padding: '8px' }}>
                      <Typography style={{ color:'#172849',  font: "normal normal 14px/17px 'SF Pro Rounded', sans-serif" }}>{item?.name}</Typography>
                    </Grid>
                    <Grid style={{ float: 'right',display: selectedType === item?.key ? '' : 'none', position: 'absolute', right: '10px' }}>
                      <DoneIcon fontSize="small" style={{ color: '#EF613B' }} />
                    </Grid>
                  </Grid>
                </Grid>
             ))}
          </Grid>
        </DialogContent>
        {/* <DialogActions className="page-select-model-footer">
          <ButtonWithLoader variant="outlined" onClick={handleCloseTypeModel} color="primary" className="page-select-model-footer-btn">Cancel</ButtonWithLoader>
          <ButtonWithLoader
            disabled={isloading || updateLoading}
            loading={isloading || updateLoading}
            variant="contained"
            color="primary"
            className="page-select-model-footer-btn"
            onClick={() => {
                // , postTypeComponent === 'unAssignedPosts'
              handleUpdateData(postFullDetails?._id, { segmentType: selectedType  });
            }}
          >
            Update
          </ButtonWithLoader>
        </DialogActions> */}
      </Dialog>
    )
}

export default PostSegmentSelectionModel;
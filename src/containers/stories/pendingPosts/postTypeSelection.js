import React from 'react';
import { useSelector } from 'react-redux';
import useTheme from '@material-ui/core/styles/useTheme';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import icons1 from '../../../assets/postCategories/bulbIcon.svg';
import icons2 from '../../../assets/postCategories/birthdayIcon.svg';
import icons3 from '../../../assets/postCategories/calendarIcon.svg';
import icons4 from '../../../assets/postCategories/newsIcon.svg';
import ButtonWithLoader from '../../../elements/buttonWithLoader';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const PostTypeSelectionModle = ({ 
    openTypeModel, postKey, handleCloseTypeModel, postFullDetails, handleUpdateData, postTypeComponent,
}) => {
    const appTheme = useTheme();
    const isloading = useSelector((state) => state?.pendingPosts?.pageLoading);
    const updateLoading = useSelector((state) => state?.pendingPosts?.updatePostLoading);
    const [selectedType, setSelectedType] = React.useState('');
    const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
    const postTypeList = [
        {
          id: 1, name: 'Facts', icon: icons1, key: 'fact',
        },
        // {
        //   id: 2, name: 'Birthday', icon: icons2, key: 'onBirthday',
        // },
        {
          id: 2, name: 'On this day', icon: icons3, key: 'onThisDay',
        },
        {
          id: 3, name: 'In the news', icon: icons4, key: 'inNews',
        },
      ];

      React.useEffect(() => {
        if(openTypeModel && postFullDetails) {
            setSelectedType(postFullDetails?.postType);
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
            width: isMobile ? '100%' : '300px',
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
           Post Type
          </Button>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '10px', marginBottom: '10px' }}>
            {postTypeList.map((item) => (
               <Grid onClick={() => setSelectedType(item?.key)} item md={12} xs={12} style={{ marginTop: '5px', marginBottom: '5px', cursor: 'pointer',backgroundColor: selectedType === item?.key ? 'rgba(239, 97, 59, 0.1)': '', borderRadius:'2px', position: 'relative' }}>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center" style={{ padding: '8px' }}>
                    <Grid container spacing={2} direction='row' justifyContent="flex-start" alignItems="center" style={{ padding: '8px' }}>
                      <Avatar src={item?.icon} style={{ width: '32px', height: '32px' }} />
                       &nbsp;&nbsp;
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
        <DialogActions className="page-select-model-footer">
          <ButtonWithLoader variant="outlined" onClick={handleCloseTypeModel} color="primary" className="page-select-model-footer-btn">Cancel</ButtonWithLoader>
          <ButtonWithLoader
            disabled={isloading || updateLoading}
            loading={isloading || updateLoading}
            variant="contained"
            color="primary"
            className="page-select-model-footer-btn"
            onClick={() => {
                // , postTypeComponent === 'unAssignedPosts'
              handleUpdateData(postFullDetails?._id, { postType: selectedType  });
            }}
          >
            Update
          </ButtonWithLoader>
        </DialogActions>
      </Dialog>
    )
}

export default PostTypeSelectionModle;
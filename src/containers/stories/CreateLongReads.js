/* eslint-disable react/prop-types */
import React, {  useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { COLORS } from '../../constants/color';
import ButtonWithLoader from '../../elements/buttonWithLoader';
import * as postAction from '../../actions/postAction'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState'

 const CoverImageEdit = ({state,disabled, handleCoverText}) => {
      return (
          <div style={{display: 'flex', margin: '10px 0', width: '100%'}}>
              <img src={state?.coverImage?.image} width={150} height={200} style={{borderRadius: 6, marginRight: 10}} />
             <TextField
             disabled={disabled}
              variant="outlined"
              fullWidth
              multiline
              minRows={10}
              value={state?.coverImage?.text || ''}
              onChange={handleCoverText()}
             placeholder='Add Cover Image Text'
              style={{ color: COLORS.GRAY_BLACK }}
            />
          </div>
      )
  }

   const OtherImagesEdit = ({index, data, disabled, handleOtherImagesText}) => {
      return (
          <div style={{display: 'flex', margin: '10px 0', width: '100%'}}>
             <img src={data?.image} width={150} height={200} style={{borderRadius: 6, marginRight: 10}} />
             <TextField
             disabled={disabled}
              variant="outlined"
              fullWidth
              multiline
              minRows={10}
              value={data?.text || ''}
              onChange={handleOtherImagesText(index)}
             placeholder='Add Image Text'
              style={{ color: COLORS.GRAY_BLACK }}
            />
          </div>
      )
  }




const LongReads = function ({
  data, open, onClose,viewOnly, resetLongReads, handleRefresh
}) {
    const dispatch = useDispatch();
  const [state, setState] = React.useState(null);
  const [loader, setLoader] = React.useState(false);
    const { setAlert } = useContext(AlertNotificationContext);

  useEffect(() => {
    if(viewOnly) {
  console.log('data',data)

      setState(data);
      return;
    }
      let newData = data;
  for(var i = 0; i < newData.images.length ; i++) {
    newData.images[i].text = ''
  }    
  setState({
      title: '',
      ...newData,
  })
  },[data])


  const handleChange = (key) => (e) => {
    setState({ ...state, [key]: e.target.value });
  };

    const handleCoverText = () => (e) => {
    setState({ ...state, coverImage: {
        ...state.coverImage,
        text: e.target.value 
    }});
  };

  const handleOtherImagesText = (i) => (e) => {
      let dup = state;
      let item = dup.images[i]; 
      item.text = e.target.value;
      setState({...dup})
  };

  const goBack = (noCreate) => {
onClose();
setState(null);
resetLongReads();
if(!noCreate) {
setAlert('success','Long Reads Created Successfully.')
}
  }

    const goBackEdit = (noCreate) => {
      handleRefresh();
onClose();
setState(null);
resetLongReads();
if(!noCreate) {
setAlert('success','Long Reads Updated Successfully.')
}
  }


  const handleSave = () => {
   setLoader(true);   
   let body = {};
   body['storyId'] = state._id;
   body['postPage'] = state.postPage._id;
   body['title'] = state.title;
   body['coverImage'] = {
       text: state.coverImage.text,
       image: state.coverImage.image
   }
   body['images'] = state.images.map(function(obj) {
  return { text: obj.text, image: obj.image };
});
dispatch(postAction.createLongReads(body, () => setLoader(false), goBack))
  }

  const handleUpdate = () => {
      setLoader(true);   
   let body = {};
   body['storyId'] = state._id;
   body['postPage'] = state.postPage._id;
   body['title'] = state.title;
   body['coverImage'] = {
       text: state.coverImage.text,
       image: state.coverImage.image
   }
   body['images'] = state.images.map(function(obj) {
  return {_id: obj._id, text: obj.text, image: obj.image };
});
dispatch(postAction.editLongReads(data?._id, body, () => setLoader(false), goBackEdit))
  }

 
  return (
    <div>
      <Dialog
        onClose={() => goBack('noCreate')}
        // aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth='lg'
        // style={{width: 800}}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => goBack('noCreate')}
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
              Add Long Reads
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
         <Typography
              gutterBottom
              variant="body1"
              style={{ fontWeight: 600, color: COLORS.TEXT, }}
            >
              Story Title*
            </Typography>
            <TextField
            disabled={loader}
              variant="outlined"
              fullWidth
              multiline
              value={state?.title}
              onChange={handleChange('title')}
             placeholder='Add Story Title'
              style={{ color: COLORS.GRAY_BLACK }}
            />

            <CoverImageEdit state={state} handleCoverText={handleCoverText} disabled={loader} />

            {state && state.images.length && state.images.map((item, index) => {
                return <OtherImagesEdit index={index} data={item} disabled={loader} handleOtherImagesText={handleOtherImagesText} />
            })}
       
          {/* <Box
            style={{
              width: '45%',
              backgroundColor: 'white',
              margin: '16px 8px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            
          
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
              style={{ color: COLORS.GRAY_BLACK }}
              InputProps={{
                boxShadow: 'none',
              }}
              inputProps={{
                maxLength: 60,
              }}
            />
            </Box> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => goBack('noCreate')}
            color="primary"
            variant="outlined"
            style={{ fontSize: 16, textTransform: 'capitalize' }}
          >
            Cancel
          </Button>
         
            <ButtonWithLoader
              onClick={() => viewOnly ? handleUpdate() : handleSave()}
              disabled={!state?.title || !state?.coverImage.text || state?.images?.some((item) => item.text === '' || item.text === undefined)}
              color="primary"
              variant="contained"
              style={{ fontSize: 16, textTransform: 'capitalize' }}
            >
              {viewOnly ? 'Update' : 'Save'}
            </ButtonWithLoader>
        </DialogActions>
   
      </Dialog>

    </div>
  );
};

export default LongReads;

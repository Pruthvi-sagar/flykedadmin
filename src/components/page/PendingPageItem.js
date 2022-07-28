import React, { useState,useContext } from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import makeStyles from '@material-ui/core/styles/makeStyles';
import { IMAGES } from '../../assets';
import { COLORS } from '../../constants/color';
import Merge from './Merge';
import moment from 'moment-mini';
import { useDispatch, useSelector } from 'react-redux';
import Confirm from '../Confirm';
import stringAvatar from '../../elements/stringAvatar'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '47%',
    display: 'flex',
    margin: '12px 15px',
    justifyContent: 'space-between',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: '15px',
  },
  btn: {
    width: '100%',
  },
}));

function PendingPageItem({
  page,
  onApprove,
  onReject,
  onMerge,
  handlePage,
  editOpen,
}) {
   const { setAlert } = useContext(AlertNotificationContext);
  const classes = useStyles();
  const searchList = useSelector((state) => state.page.searchList);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [text, setText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState({});
  const [btnText, setBtnText] = useState('');
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const [loading, setLoading] = useState(false);
  const body = {
    parentPage: selectedPage?._id,
  }
  // useEffect(() => {
  //   dispatch(pageAction.searchPages(searchTerm))
  // }, [searchTerm])


  const onSelect = (item) => {
    // setSearchTerm(item.title)
    setSelectedPage(item);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedPage({});
    setSearchTerm('');
  };

  const handleConfirmApporve = (e) => {
    if(!page.category) {
      setAlert('error','Please add page category before approving')
       editOpen('approve', page?._id);
       handlePage(page);
       return;
    }
    //  if(!page.image) {
    //   setAlert('error','Please add page image before approving')
    //    editOpen('approve', page?._id);
    //    handlePage(page);
    //    return;
    // }
    setOpenConfirm(true);
    setBtnText(e.target.innerText);
    setText('Do you want to approve this page?');
  };

  const handleConfirmReject = (e) => {
    setOpenConfirm(true);
    setBtnText(e.target.innerText);
    setText('Do you want to reject this page?');
  };

  const handleConfirmMerge = (e) => {
    setOpenConfirm(true);
    setBtnText(e.target.innerText);
    setText(`Do you want to merge ${page.title} page with ${selectedPage.title}?`);
  };

  const handleConfirmClose = () => {
    setLoading(false);
    setOpen(false);
    setOpenConfirm(false);
    setBtnText('');
  };

  const onConfirm = () => {
    setLoading(true);
    if (btnText === 'Approve') {
      onApprove(page._id, page, handleConfirmClose);
      return;
    } 
    if(btnText === 'Reject') {
      onReject(page._id, handleConfirmClose);
      return;
    } 
    if(btnText === 'Merge Page') {
      onMerge(page._id, body, handleConfirmClose)
      return;
    }
    return false;
  };
  const date = moment(page?.createdAt).format('DD MMM YYYY');

  const pendingPageCard = () => (
    <Box display='flex' alignItems='center' marginBottom='15px'>
      <Avatar {...stringAvatar(page?.title)} className={classes.avatar} src={page?.image} alt={page?.title} />
      <Box>
        <Typography
          variant='body1'
          style={{
            color: COLORS.GRAY_BLACK,
            fontWeight: 600,
            paddingBottom: 3,
          }}
        >
          {page?.title}
        </Typography>
        <Typography
          variant='body2'
          style={{
            marginBottom: '8px',
            maxWidth: 200,
            width: 'auto',
            wordWrap: 'break-word',
          }}
        >
          {page?.description}
        </Typography>
        <Box display='flex' alignItems='center'>
          <img
            src={IMAGES.TAG_ICON}
            alt='tag icon'
            style={{ fontSize: '15px', marginRight: '5px' }}
          />
          <Typography variant='body2' style={{ color: COLORS.GRAY_BLACK }}>
            {page?.category?.title}
          </Typography>
          <img
            src={IMAGES.RIGHT_ARROW_ICON}
            alt='right arrow'
            style={{ margin: 4 }}
          />
          <Typography variant='body2' style={{ color: COLORS.GRAY_BLACK }}>
            {page?.subCategory?.title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Card className={classes.root}>
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          padding='10px'
        >
          <Box>
            {pendingPageCard()}
            <Typography
              variant='body2'
              color='secondary'
              style={{ fontSize: 11 }}
            >
              {` requested by ${page?.createdBy?.name}   on ${date}`}
            </Typography>
          </Box>
          <Box>
            <img
              src={IMAGES.EDIT_ICON}
              onClick={() => {
                editOpen('approve', page?._id);
                handlePage(page);
              }}
              alt='edit icon'
              fontSize='small'
              style={{
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='space-evenly'
          style={{
            borderLeft: '1px solid lightgray',
          }}
        >
          <Button
            startIcon={
              <img
                src={IMAGES.GREEN_TICK_ICON}
                alt='tick icon'
                style={{ marginTop: 2, marginRight: 3 }}
              />
            }
            onClick={handleConfirmApporve}
            style={{
              color: COLORS.SUCCESS,
              padding: '10px 25px',
              textTransform: 'capitalize',
              fontWeight: 600,
            }}
          >
            Approve
          </Button>
          <Button
            startIcon={
              <img
                src={IMAGES.RED_CROSS_ICON}
                alt='closeIcon'
                style={{ marginRight: 8, marginLeft: -8 }}
              />
            }
            onClick={handleConfirmReject}
            style={{
              borderTop: '1px solid lightgray',
              borderBottom: '1px solid lightgray',
              borderRadius: 0,
              color: COLORS.ERROR,
              padding: '10px 20px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            Reject
          </Button>
          <Button
            onClick={handleClickOpen}
            startIcon={
              <img
                src={IMAGES.MERGE_ICON}
                alt='merge icon'
                style={{ marginRight: 8, marginLeft: -8 }}
              />
            }
            style={{
              color: COLORS.SUB_TEXT,
              padding: '10px 20px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            Merge
          </Button>
        </Box>
      </Card>
      {open && (
        <Merge
          open={open}
          handleClose={handleClose}
          pendingPageCard={pendingPageCard}
          handleConfirmMerge={handleConfirmMerge}
          searchList={searchList}
          onSelect={onSelect}
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          selectedPage={selectedPage}
          onMerge={onMerge}
          id={page._id}
        />
      )}
      {openConfirm && <Confirm
        open={openConfirm}
        handleClose={handleConfirmClose}
        text={text}
        loading={loading}
        handleConfirm={onConfirm}
      />}

    </>
  );
}

export default PendingPageItem;

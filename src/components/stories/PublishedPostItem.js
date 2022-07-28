import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector} from 'react-redux';
import moment from 'moment-mini';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { StyledTableRow, StyledTableCell } from '../utilitiies/StyledTable';
import viewEyeIcon from '../../assets/images/View.svg';
import './post.css';
import ViewPublishedPost from '../utilitiies/ViewItemModal.js';
import EditPublishedPost from './EditPublishedPost';
import stringAvatar from '../../elements/stringAvatar';
import unCheckImage from '../../assets/checkbox/checkUn.svg';
import CheckBoxIcon from '../../assets/checkbox/checkbox.svg';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';


const useStyles = makeStyles(() => ({
  iconHover: {
    position: 'relative',
  },
}));

export default function PublishedPostItem(props) {
  const published = useSelector((state) => state.post.publishedPostList);
  const archived = useSelector((state) => state.post.archivedPostList);
  const didyouknow = useSelector((state) => state.post.didYouKnowPostList)
  const getPostList = () => {
  if(window.location.pathname === '/admin/posts/archived') {
    return archived;
  }
  if(window.location.pathname === '/admin/posts/didyouknow') {
    return didyouknow;
  }
  return published
  }
  const publishedPosts = getPostList();
  const { row, index } = props;
  const classes = useStyles();
  const [eyeIcon, setEyeIcon] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [current, setCurrent] = useState(0);
  const [post, setPost] = useState({});
  const handleItem = (i) => {
    const selectedItem = publishedPosts?.results?.find((item, index) => {
      if (index === i) {
        return item;
      }
    });
    setPost(selectedItem);
  };

  const handleOpen = (postDetails) => {
    setOpen(true);
    setCurrent(index);
    handleItem(index);
  };

    const handleEdit = () => {
    setEyeIcon(false);
    setCurrent(index);
    setEdit(true);
    handleItem(index);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setEyeIcon(false);
  };

  const nextBtnHandler = () => {
    if (current !== publishedPosts.results.length - 1) {
      setCurrent(current + 1);
      handleItem(current + 1);
    }
  };

  const previousBtnHandler = () => {
    if (current !== 0) {
      setCurrent(current - 1);
      handleItem(current - 1);
    }
  };


   const handleSelectDidYouKnow = (row) => {
      if(props.didYouKnow === row) {
            props.setDidYouKnow(null)
            return;
        }
        // if(props.didYouKnow.includes(row)) {
        //      let tempData = props.didYouKnow.filter(i => i !== row)
        //     // const index = tempData.indexOf(item);
        //     // if (index > -1) {
        //     // tempData.splice(index, 1);
        //     // }
        //     // tempData.pop(index);
        //     props.setDidYouKnow([...tempData])
        //     return;
        // }
        // const newArray = [...new Set(selectedItems)]
         props.setDidYouKnow(row);
    }

  // Post content details function
  const postContents = (postDetails) => {
    return (
      <Box display='flex' alignItems='center' position='relative' style={{width: props?.showLongReads ? '500px' : '420px',}}>
        <Avatar
          {...stringAvatar(postDetails?.coverImage?.shortTitle)}
          alt='Remy Sharp'
          src={postDetails?.coverImage?.image}
          style={{ marginRight: '10px' }}
          className={`iconHoverimg ${classes.iconHover}`}
        />
        {eyeIcon === true && (
          <Avatar
            alt='Eye view icon'
            src={viewEyeIcon}
            style={{ marginRight: '10px' }}
            className={`viewIconImg ${classes.viewIcon}`}
            onClick={() => props?.showLongReads ? props?.showLongReads(postDetails) : handleEdit() }
          />
        )}

        {/* view post modal */}
        {open && (
          <ViewPublishedPost
            open={open}
            handleClose={handleClose}
            previousBtnHandler={previousBtnHandler}
            nextBtnHandler={nextBtnHandler}
            row={post}
            // srcImage={post?.image}
            // postText={post?.text}
            // likesCount={post?.likesCount}
            // commentCount={post?.commentCount}
            // _id={post?._id}
          />
        )}

        <Typography variant='body1' className='postTitle' style={{textTransform: 'none'}} noWrap={!props?.showLongReads}>
           {postDetails?.title || postDetails?.coverImage?.shortTitle}
        </Typography>
        
      </Box>
    );
  };

  // Page details function
  const pageName = (pageTitle, pageImage) => {
    return (
      <Box display='flex' alignItems='center' className='pageBox'>
        <Avatar
          {...stringAvatar(pageTitle)}
          alt='Remy Sharp'
          src={pageImage}
          className={`pageAvatar ${classes.small}`}
          style={{ marginRight: '10px', fontSize: '12px', width:'32px', height:'32px' }}
        />
        <Typography>{pageTitle}</Typography>
      </Box>
    );
  };

  // Contributor details function
  const contributor = (contributorTitle, contributorImage) => {
    return (
      <Box display='flex' alignItems='center' className='contributorBox'>
        <Avatar
          {...stringAvatar(contributorTitle)}
          alt='Remy Sharp'
          src={contributorImage}
          className={`contributorAvatar ${classes.small}`}
          style={{ marginRight: '10px', fontSize:'12px', width:'32px', height:'32px' }}
        />
        <Typography>{contributorTitle}</Typography>
      </Box>
    );
  };

  const date = moment(row?.createdAt).format('DD-MM-YYYY');

  return (
    <>
       
    <StyledTableRow
    style={{position: 'relative'}}
     key={row.pageTitle} 
       onMouseEnter={() => {
          setEyeIcon(true);
        }}
        onMouseLeave={() => {
          setEyeIcon(false);
        }}>

         {window.location.pathname === '/admin/stories/published' &&
        <StyledTableCell>
        <Checkbox
          style={{ color: '', }}
          color="primary"
          onChange={(e) => handleSelectDidYouKnow(row)}
          disableRipple
          checked={props.didYouKnow === row}
          icon={<img src={unCheckImage} alt="crash" style={{ height: '18px', width: '18px' }} />}
          checkedIcon={<img src={CheckBoxIcon} alt="crash" color="primary" style={{ height: '18px', width: '18px' }} />}
        /> 
        </StyledTableCell>}
  

      <StyledTableCell style={{width: '35%'}}>
        {postContents(row)}
      </StyledTableCell>
      <StyledTableCell>
        {pageName(row?.postPage?.title, row?.postPage?.image)}
      </StyledTableCell>
      {!props?.showLongReads && <>
       <StyledTableCell>
        {contributor(row?.createdBy?.name, row?.createdBy?.profileImage)}
      </StyledTableCell>
      {/* <StyledTableCell>
        <Typography>{row?.storyType}</Typography>
      </StyledTableCell> */}
      </>}
     
      <StyledTableCell>
        {date}
      </StyledTableCell>
      {!props?.showLongRead && <>
      <StyledTableCell>
        {row?.likesCount}
      </StyledTableCell>
      <StyledTableCell>
        {row?.commentCount}  
        { eyeIcon === true &&  row?.longRead && (
          <CheckCircleOutlineOutlinedIcon style={{color: '#EF613B', marginLeft: 20, bottom: 14, position: 'absolute'}} />
        )}
      </StyledTableCell>
      </>}
      
  
          {edit && (
          <EditPublishedPost
            open={edit}
            handleClose={handleClose}
            previousBtnHandler={previousBtnHandler}
            nextBtnHandler={nextBtnHandler}
            row={post}
            // srcImage={post?.image}
            // postText={post?.text}
            // likesCount={post?.likesCount}
            // commentCount={post?.commentCount}
            // _id={post?._id}
          />
        )}
    </StyledTableRow>
    </>
  );
}

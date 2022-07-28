import React, { useState, useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import moment from 'moment-mini';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { StyledTableRow, StyledTableCell } from '../utilitiies/StyledTable';
import viewEyeIcon from '../../assets/images/View.svg';
import '../post/post.css';
import ViewPublishedPost from '../utilitiies/ViewItemModal.js';
import { getPostTypeText } from '../../utils/common';
import { IMAGES } from '../../assets'
import ConfirmDialog from '../../elements/confirmModel';
import EditPublishedPost from '../post/EditPublishedPost';
import * as postActions from '../../actions/postAction';
import * as pageActions from '../../actions/pageAction';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';

const useStyles = makeStyles(() => ({
  iconHover: {
    position: 'relative',
  },
}));

export default function PublishedPagePostItem(props) {
  const dispatch = useDispatch();
  const publishedPagePosts = useSelector((state) => state.page.pagePostList);
  const { row, index } = props;
  const classes = useStyles();
  const { setAlert } = useContext(AlertNotificationContext);
  const [loading, setLoading] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);
  const filter = useSelector((state) => state.filter);
  const { id } = useParams();
  const currentPage = useSelector((state) => state.page.publishedPagePostsCurrentPage);
  const [confirmArchive, setConfirmArchive] = useState(false);

  const handleItem = (i) => {
    const selectedItem = publishedPagePosts?.results?.find((item, index) => {
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
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setEyeIcon(false);
  };

  const nextBtnHandler = () => {
    if (current !== publishedPagePosts.results.length - 1) {
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

  const handleCallBack = () => {
    let body = ''
    if (filter.postPublished.page) {
      body = body.concat(`postPage=${filter.postPublished.page}&`)
    }
    if (filter.postPublished.contributor) {
      body = body.concat(`createdBy=${filter.postPublished.contributor}&`)
    }
    if (filter.postPublished.postType) {
      if (filter.postPublished.postType?.fact) {
        body = body.concat(`postType=fact&`)
      }
      if (filter.postPublished.postType?.birthday) {
        body = body.concat(`postType=onBirthday&`)
      }
      if (filter.postPublished.postType?.onTheDay) {
        body = body.concat(`postType=onThisDay&`)
      }
      if (filter.postPublished.postType?.inTheNews) {
        body = body.concat(`postType=inNews&`)
      }
    }
    if (
      filter.postPublished.date.startDate ||
      filter.postPublished.date.endDate
    ) {
      if (filter.postPublished.date?.startDate) {
        body = body.concat(
          `createdAt[gte]=${moment(filter.postPublished.date?.startDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
      if (filter.postPublished.date?.endDate) {
        body = body.concat(
          `createdAt[lte]=${moment(filter.postPublished.date?.endDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
    }
    dispatch(pageActions.filterPagePosts(() => setLoading(false), id, 12, currentPage, body));
    setConfirmArchive(false);
    setEyeIcon(false);
  }

   const handleArchive = () => {
    dispatch(postActions.postArchiveUnArchive('archive', row?._id, setLoading, setAlert, () => handleCallBack()));
  }


  // Post content details function
  const postContents = (postDetails) => {
    return (
      <Box display='flex' alignItems='center' position='relative'>
        <Avatar
          alt='Remy Sharp'
          src={postDetails?.image}
          style={{ marginRight: '10px' }}
          className={`iconHoverimg ${classes.iconHover}`}
          // onMouseEnter={() => {
          //   setEyeIcon(true);
          // }}
          // onMouseLeave={() => {
          //   setEyeIcon(false);
          // }}
        />
        {eyeIcon === true && (
          <Avatar
            alt='Eye view icon'
            src={viewEyeIcon}
            style={{ marginRight: '10px' }}
            className={`viewIconImg ${classes.viewIcon}`}
            onMouseEnter={() => {
              setEyeIcon(true);
            }}
            onMouseLeave={() => {
              setEyeIcon(false);
            }}
            onClick={() => handleOpen(postDetails)}
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
          />
        )}

        <Typography variant='body1' className='postTitle'>
          {postDetails?.text}
        </Typography>
      </Box>
    );
  };

  // Page details function
  const pageName = (pageTitle, pageImage) => {
    return (
      <Box display='flex' alignItems='center' className='pageBox'>
        <Avatar
          alt='Remy Sharp'
          src={pageImage}
          className={`pageAvatar ${classes.small}`}
          style={{ marginRight: '10px' }}
        />
        <Typography>{pageTitle}</Typography>
      </Box>
    );
  };

  const handleEdit = () => {
    setEyeIcon(false)
    setEdit(true);
    handleItem(index);
  };

  // Contributor details function
  const contributor = (contributorTitle, contributorImage) => {
    return (
      <Box display='flex' alignItems='center' className='contributorBox'>
        <Avatar
          alt='Remy Sharp'
          src={contributorImage}
          className={`contributorAvatar ${classes.small}`}
          style={{ marginRight: '10px' }}
        />
        <Typography>{contributorTitle}</Typography>
      </Box>
    );
  };

  const date = moment(row?.createdAt).format('DD-MM-YYYY');
  //   console.log('rttgbkjhy', row.createdAt)

  return (
    <StyledTableRow key={row?.pageTitle}
     style={{position: 'relative'}}
       onMouseEnter={() => {
          setEyeIcon(true);
        }}
        onMouseLeave={() => {
          setEyeIcon(false);
        }}>
      <StyledTableCell component='th' scope='row'>
        {postContents(row)}
      </StyledTableCell>
      <StyledTableCell>
        {pageName(row?.postPage?.title, row?.postPage?.image)}
      </StyledTableCell>
      <StyledTableCell>
        {contributor(row?.createdBy?.name, row?.createdBy?.profileImage)}
      </StyledTableCell>
      <StyledTableCell>
        <Typography>{getPostTypeText(row?.postType)}</Typography>
      </StyledTableCell>
      <StyledTableCell>{date}</StyledTableCell>
      <StyledTableCell>{row?.likesCount}</StyledTableCell>
      <StyledTableCell>{row?.commentCount}</StyledTableCell>
        <StyledTableCell>
      <Box style={{ width: 35, cursor: 'pointer' }}>
        {eyeIcon && (
          <div style={{ width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', direction: 'row' }}>
          <img
            src={IMAGES.EDIT_ICON}
            alt='edit icon'
            style={{ width: '14px', height: '14px' }}
            onClick={handleEdit}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img
            src={IMAGES.DELETE_ICON}
            alt='edit icon'
            style={{ width: '14px', height: '14px' }}
            onClick={() => setConfirmArchive(true)}
          />
        </div>
        )}
      </Box>
    </StyledTableCell>
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
        {confirmArchive ? (
          <ConfirmDialog loading={loading} open={confirmArchive} cancel={() => setConfirmArchive(false)} confirm={handleArchive} title="Archive" content="Are you sure want to archive the post?" cancelLabel="Cancel" confirmLabel="Archive"  />
        ) : null}
    </StyledTableRow>
  );
}

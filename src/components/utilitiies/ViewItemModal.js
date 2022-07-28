import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   Avatar,
//   Box,
//   Typography,
//   Modal,
//   Card,
//   CardContent,
//   CardMedia,
// } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import Modal from '@material-ui/core/Modal'
import InfiniteScroll from 'react-infinite-scroll-component';
import LeftArrow from '../../assets/images/leftArrow.svg';
import RightArrow from '../../assets/images/rightArrow.svg';
import Heart from '../../assets/images/heart.svg';
import Message from '../../assets/images/message.svg';
import '../post/post.css';
import * as postActions from '../../actions/postAction';
import useEvent from '../../elements/useEventListner';
// import moment from 'moment';
import CommentTImeConverter from '../../elements/commentTime';

function ViewItemModal(props) {
  const dispatch = useDispatch();
  const { open, handleClose, previousBtnHandler, nextBtnHandler, row } = props;
  const [loadingComments, setLoadingComments] = useState(false);
  const comments = useSelector((state) => state.post.postComments);

  useEffect(() => {
    setLoadingComments(true);
    dispatch(
      postActions.fetchPostComments(
        row._id,
        () => setLoadingComments(false),
        1,
        [],
      ),
    );
  }, [row]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.key === 'ArrowLeft') {
      previousBtnHandler();
    }
    else if (e.key === 'ArrowRight') {
      nextBtnHandler();
    } else {
      return true;
    }
  }

  useEvent('keydown', handleKeyDown);

  const fetchComments = () => {
    if (comments?.hasNextPage) {
      setLoadingComments(true);
      const PageNo = parseInt(comments?.nextPage, 10) || 1;
      const previousRecords = comments?.results || [];
      dispatch(
        postActions.fetchPostComments(
          row._id,
          () => setLoadingComments(false),
          PageNo,
          previousRecords,
        ),
      );
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card className='modal-card-block'>
          <Box>
            <div style={{display: row?.postType === 'onThisDay' || row?.postType === 'inNews' ? '' : 'none', padding: '5px', textAlign: 'center',}}>
              <Typography style={{fontSize: 16}}>{row?.shortTitle ? row?.shortTitle : 'No Short Title'}</Typography>
            </div>
            {/* <div
              style={{
                padding: '10px 10px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div className='postImg-div'>
                <CardMedia
                  component='img'
                  image={row?.createdBy?.profileImage}
                  alt='Contributor'
                  className='contributor-profile'
                />
              </div>
              <CardContent style={{ padding: 0 }} className='contributorName'>
                <Typography variant='h5'>
                  {row?.createdBy?.name} <span className='betweenText'>on</span>{' '}
                  <span className='pageTitle-name'>{row?.postPage?.title}</span>
                </Typography>
              </CardContent>
            </div> */}
            <div className='postImg-block'>
            <div
              style={{
                padding: '10px 10px',
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                background: 'rgba(28, 33, 33, 0.2)',
                width: '100%',
              }}
            >
              <div className='postImg-div'>
                <CardMedia
                  component='img'
                  image={row?.createdBy?.profileImage}
                  alt='Contributor'
                  className='contributor-profile'
                />
              </div>
              <CardContent style={{ padding: '0' }} className='contributorName'>
                <Typography variant='h5'>
                  {row?.createdBy?.name} <span className='betweenText'>on</span>{' '}
                  <span className='pageTitle-name'>{row?.postPage?.title}</span>
                  {/* <span className='post-content' style={{ fontFamily: 'Lexend Deca' }}>{row?.text}</span> */}
                </Typography>
                <IconButton onClick={handleClose} size="small" style={{position: 'absolute', right: 5, top: 12, zIndex: 100 }}><CloseIcon style={{ color: 'white' }} /></IconButton>
              </CardContent>
            </div>
              <img
                src={row?.image}
                alt='post image'
                style={{aspectRatio: '3/4', width:'100%'}}
              />
              {/* <img src={Dummy} alt="post image" style={{ width: '520px', height: '390px' }} /> */}
              <div className='postTest'>
                <Typography component='div' className='post-content' style={{ fontFamily: 'Poppins' }}>
                  {row?.text}
                </Typography>
              </div>
            </div>
            <div
              className='shareBlock'
              style={{ display: 'flex', padding: '10px 10px' }}
            >
              <div className='shareItem' disabled>
                <img src={Heart} alt='heart' />
                <Typography variant='h5'>{row?.likesCount}</Typography>
              </div>
              <div className='shareItem' disabled>
                <img src={Message} alt='heart' />
                <Typography variant='h5'>{row?.commentCount}</Typography>
              </div>
              {/* <div className='shareItem'>
                <img src={Share} alt='heart' />
                <Typography variant='h5'>Share</Typography>
              </div> */}
            </div>
            <div
              className='comments-block'
              style={{
                padding: '10px 10px',
                height: comments?.results?.length >= 2 ? '135px' : 'auto',
                overflowY: 'auto',
              }}
              id='commentsInfinateScrollModel'
            >
              <InfiniteScroll
                scrollableTarget='commentsInfinateScrollModel'
                dataLength={parseInt(comments?.results?.length, 10) || 0}
                style={{ overflow: 'hidden' }}
                next={fetchComments}
                hasMore={comments?.hasNextPage || false}
                // loader={<CircularProgress style={{ textAlign: 'center' }} size={20} />}
                endMessage={
                  <p
                    style={{
                      textAlign: 'center',
                      display: comments?.results?.length ? '' : 'none',
                      fontSize: '14px'
                    }}
                  >
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {comments?.results?.map((items, id) => {
                  return (
                    <div className='comments-section-block' key={items?._id}>
                      <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '90%', }}>
                        <Box display='flex'>
                          <Avatar
                            alt='Remy Sharp'
                            src={items?.user?.profileImage}
                            style={{
                              marginRight: '10px',
                              width: '25px',
                              height: '25px',
                            }}
                          />
                          <Typography style={{ fontSize: 12, }}>
                            {items?.user?.name} <span style={{ fontSize: 12, fontWeight: 500, flexGrow: '1', textAlign: 'left', padding: '0px 5px', }}>
                            {items.text}
                            </span>
                          </Typography>
                        </Box>
                      </div>
                      {/* <Typography style={{ fontSize: 12, fontWeight: 500, flexGrow: '1', textAlign: 'left', padding: '0px 5px', }}>
                        {items.text}
                      </Typography> */}
                      <div className='time-div' style={{ textAlign: 'right', width:'20%'}}>
                        <Typography variant='h5'>
                          {CommentTImeConverter(items.createdAt)}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
                {comments?.results?.length === 0 && (
                  <div className='comments-section-block'>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flex: 1,
                      }}
                    >
                      <Typography>No Comments to show</Typography>
                    </div>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </Box>

          <div
            className='arrowiv leftArrowDiv'
            onClick={previousBtnHandler}
            style={{}}
          >
            <img src={LeftArrow} alt='left arrow' />
          </div>
          <div
            className='arrowiv rightArrowDiv'
            onClick={nextBtnHandler}
            style={{}}
          >
            <img src={RightArrow} alt='right arrow' />
          </div>
        </Card>
      </Modal>
    </>
  );
}

export default ViewItemModal;

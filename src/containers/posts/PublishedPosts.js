import React, { useEffect, useState,useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga';
import * as postActions from '../../actions/postAction'
import MainContainer from '../../components/utilitiies/MainContainer'
import Pagination from '../../components/utilitiies/Pagination'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  StyledTableCell,
  useStyles,
} from '../../components/utilitiies/StyledTable'
import PublishedPostItem from '../../components/post/PublishedPostItem'
import moment from 'moment-mini'
import { COLORS } from '../../constants/color'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';

export default function PublishedPosts() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filter = useSelector((state) => state.filter)
  const publishedPosts = useSelector((state) => state.post.publishedPostList)
  const currentPage = useSelector(
    (state) => state.post.publishedPostCurrentPage
  )
  const { setAlert } = useContext(AlertNotificationContext);

  const [pageLoader, setPageLoader] = useState(true)
  const [limit, setLimit] = useState(30)
  const [didYouKnow, setDidYouKnow] = useState([])

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // const [currentPage, setCurrentPage] = useState(
  //   useSelector((state) => state.post.publishedPostCurrentPage),
  // );

  const setCurrentPage = (page) => {
    dispatch(postActions.setPublishedPostCurrentPage(page))
  }

  useEffect(() => {
    setPageLoader(true)
    let body = ''
    if (filter.postPublished.page) {
      body = body.concat(`postPage=${filter.postPublished.page}&`)
    }
    if (filter.postPublished.contributor) {
      body = body.concat(`createdBy=${filter.postPublished.contributor}&`)
    }
     if (filter.postPublished.segmentType) {
      body = body.concat(`segmentType=${filter.postPublished.segmentType}&`)
    }
    if (filter.postPublished.postType) {
      if (filter.postPublished.postType?.fact) {
        body = body.concat(`postType=fact&`)
      }
      if (filter.postPublished.postType?.birthday) {
        body = body.concat(`toBirthday=true&`)
      }
      if (filter.postPublished.postType?.onTheDay) {
        body = body.concat(`postType=onThisDay&`)
      }
      if (filter.postPublished.postType?.inTheNews) {
        body = body.concat(`postType=inNews&`)
      }
       if (filter.postPublished.postType?.didYouKnow) {
        body = body.concat(`didYouKnow=true&`)
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

    dispatch(
      postActions.filterPublishedPost(
        () => setPageLoader(false),
        limit,
        currentPage,
        body
      )
    )
  }, [
    currentPage,
    filter.postPublished.page,
    filter.postPublished.contributor,
    filter.postPublished.postType,
    filter.postPublished.date,
     filter.postPublished.segmentType,
  ])

  const handleMarkAsDidYouKnow = (data) => {
      dispatch(postActions.markAsDidYouKnow('add',data, setAlert,handleRefresh))
  }

  const handleRefresh = () => {
     setPageLoader(true)
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
        body = body.concat(`toBirthday=true&`)
      }
      if (filter.postPublished.postType?.onTheDay) {
        body = body.concat(`postType=onThisDay&`)
      }
      if (filter.postPublished.postType?.inTheNews) {
        body = body.concat(`postType=inNews&`)
      }
      if (filter.postPublished.postType?.didYouKnow) {
        body = body.concat(`didYouKnow=true&`)
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

     dispatch(
      postActions.filterPublishedPost(
        () => {
          setDidYouKnow([]);
          setPageLoader(false);
        },
        limit,
        currentPage,
        body
      )
    )
  }


  return (
    <MainContainer
      footer={
        !pageLoader && publishedPosts?.results?.length !== 0 && (
          <Pagination
            limit={limit}
            totalResults={publishedPosts?.totalResults}
            totalPages={publishedPosts?.totalPages}
            currentPage={publishedPosts?.currentPage}
            pagingCounter={publishedPosts?.pagingCounter}
            onClickPrevious={() => setCurrentPage(publishedPosts?.prevPage)}
            onClickNext={() => setCurrentPage(publishedPosts?.nextPage)}
            hasPrevPage={publishedPosts?.hasPrevPage}
            hasNextPage={publishedPosts?.hasNextPage}
            switchPage={(page) => setCurrentPage(page)}
          />
        )
      }
    >
      {didYouKnow.length > 0 && 
      <did style={{display: 'flex', cursor: 'pointer', justifyContent: 'flex-end', marginBottom: 10}} onClick={() => handleMarkAsDidYouKnow(didYouKnow)}>
       <Typography
                gutterBottom
                variant="body1"
                style={{ fontWeight: 600, color: COLORS.PRIMARY}}
            >
             Mark as did you know
            </Typography>
      </did>}
     
      {
        publishedPosts?.results?.length !== 0 ? <TableContainer
        className='published-posts-table'
        style={{
          borderRadius: '10px',
          border: '1px solid #EDEDED',
          background: '#FFFF',
        }}
      >
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell style={{width: 50,}}></StyledTableCell> */}
              <StyledTableCell style={{ width: '20%' }}>Post Contents</StyledTableCell>
              <StyledTableCell>Page</StyledTableCell>
              <StyledTableCell>Contributor</StyledTableCell>
              <StyledTableCell>Post Type</StyledTableCell>
              <StyledTableCell>Date posted</StyledTableCell>
              <StyledTableCell>Likes</StyledTableCell>
              <StyledTableCell>Comments</StyledTableCell>
              {/* <StyledTableCell></StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageLoader ? (
              <CircularProgress
                size={32}
                color='primary'
                className='loaderClass'
              />
            ) : (
              publishedPosts?.results &&
              publishedPosts?.results?.map((row, index) => {
                return (  
                  <>
                  <PublishedPostItem
                    row={row}
                    key={row.id}
                    id={row.id}
                    index={index}
                    didYouKnow={didYouKnow}
                    setDidYouKnow={setDidYouKnow}
                  />
                  </>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer> : <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>Records not found</Typography> 
      }
    </MainContainer>
  )
}

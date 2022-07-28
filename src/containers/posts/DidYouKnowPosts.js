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

export default function DidYouKnowPosts() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filter = useSelector((state) => state.filter)
  const didYouKnowPosts = useSelector((state) => state.post.didYouKnowPostList)
  const currentPage = useSelector(
    (state) => state.post.didYouKnowPostCurrentPage
  )
  const { setAlert } = useContext(AlertNotificationContext);

  const [pageLoader, setPageLoader] = useState(true)
  const [limit, setLimit] = useState(12)
  const [didYouKnow, setDidYouKnow] = useState([])

    useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  // const [currentPage, setCurrentPage] = useState(
  //   useSelector((state) => state.post.publishedPostCurrentPage),
  // );

  const setCurrentPage = (page) => {
    dispatch(postActions.setDidYouKnowCurrentPage(page))
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

    dispatch(
      postActions.filterDidYouKnowPost(
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
  ])

  const handleMarkAsDidYouKnow = (data) => {
      dispatch(postActions.markAsDidYouKnow('remove',data, setAlert,handleRefresh))
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
      postActions.filterDidYouKnowPost(
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
        !pageLoader && didYouKnowPosts?.results?.length !== 0 && (
          <Pagination
            limit={limit}
            totalResults={didYouKnowPosts?.totalResults}
            totalPages={didYouKnowPosts?.totalPages}
            currentPage={didYouKnowPosts?.pagingCounter}
            onClickPrevious={() => setCurrentPage(didYouKnowPosts?.prevPage)}
            onClickNext={() => setCurrentPage(didYouKnowPosts?.nextPage)}
            hasPrevPage={didYouKnowPosts?.hasPrevPage}
            hasNextPage={didYouKnowPosts?.hasNextPage}
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
             Remove from Did you know
            </Typography>
      </did>}
     
      {
        didYouKnowPosts?.results?.length !== 0 ? <TableContainer
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
              <StyledTableCell style={{width: 50,}}></StyledTableCell>
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
              didYouKnowPosts?.results &&
              didYouKnowPosts?.results?.map((row, index) => {
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

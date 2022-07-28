import React, { useEffect, useState,useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import ReactGA from 'react-ga';
import {
  StyledTableCell,
  useStyles,
} from '../../components/utilitiies/StyledTable'
import PublishedPostItem from '../../components/stories/PublishedPostItem'
import moment from 'moment-mini'
import { COLORS } from '../../constants/color'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import LongReads from './CreateLongReads'

export default function LongReadPosts() {
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
  const [didYouKnow, setDidYouKnow] = useState(null);
  const [showLongReads, setShowLongReads] = useState(false)

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
      postActions.filterPublishedStories(
        () => setPageLoader(false),
        limit,
        currentPage,
        body,
        'longReads'
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
      postActions.filterPublishedStories(
        () => {
          setDidYouKnow([]);
          setPageLoader(false);
        },
        limit,
        currentPage,
        body,
          'longReads'
      )
    )
  }

  const resetLongReads = () => {
    setDidYouKnow(null);
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
              <StyledTableCell style={{ width: '60%' }}>Title</StyledTableCell>
              <StyledTableCell>Page</StyledTableCell>
              {/* <StyledTableCell>Contributor</StyledTableCell> */}
              {/* <StyledTableCell>Story Type</StyledTableCell> */}
              <StyledTableCell>Date posted</StyledTableCell>
              {/* <StyledTableCell>Likes</StyledTableCell> */}
              {/* <StyledTableCell>Comments</StyledTableCell> */}
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
                    showLongReads={(data) =>
                        {
                        setDidYouKnow(data); 
                        setShowLongReads(true);
                        }
                    }
                  />
                  </>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer> : <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>Records not found</Typography> 
      }

      {showLongReads && <LongReads handleRefresh={handleRefresh} viewOnly open={showLongReads} resetLongReads={resetLongReads} onClose={() => setShowLongReads(false)} data={didYouKnow} />}
    </MainContainer>
  )
}

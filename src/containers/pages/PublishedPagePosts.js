import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga';
import * as pageActions from '../../actions/pageAction'
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
import PublishedPagePostItem from '../../components/page/publishedPagePostItem'
import { useParams } from 'react-router'
import moment from 'moment-mini'

export default function PublishedPagePosts(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filter = useSelector((state) => state.filter)
  const publishedPagePosts = useSelector((state) => state.page.pagePostList)
  const { id } = useParams()
  const currentPage = useSelector(
    (state) => state.page.publishedPagePostsCurrentPage
  )

   useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const [pageLoader, setPageLoader] = useState(true)
  const [limit, setLimit] = useState(12)
  // const [currentPage, setCurrentPage] = useState(
  //   publishedPagePosts?.currentPage || 1
  // )

  const setCurrentPage = (page) => {
    dispatch(pageActions.setPublishedPagePostsCurrentPage(page))
  }

  useEffect(() => {
    setPageLoader(true)
    let body = ''
    if (filter.pagePosts.contributor) {
      body = body.concat(`createdBy=${filter.pagePosts.contributor}&`)
    }
    if (filter.pagePosts.postType) {
      if (filter.pagePosts.postType?.fact) {
        body = body.concat(`postType=fact&`)
      }
      if (filter.pagePosts.postType?.birthday) {
        body = body.concat(`postType=onBirthday&`)
      }
      if (filter.pagePosts.postType?.onTheDay) {
        body = body.concat(`postType=onThisDay&`)
      }
      if (filter.pagePosts.postType?.inTheNews) {
        body = body.concat(`postType=inNews&`)
      }
    }
    if (filter.pagePosts.date.startDate || filter.pagePosts.date.endDate) {
      if (filter.pagePosts.date?.startDate) {
        body = body.concat(
          `createdAt[gte]=${moment(filter.pagePosts.date?.startDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
      if (filter.pagePosts.date?.endDate) {
        body = body.concat(
          `createdAt[lte]=${moment(filter.pagePosts.date?.endDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
    }

    dispatch(
      pageActions.filterPagePosts(
        () => setPageLoader(false),
        id,
        limit,
        currentPage,
        body
      )
    )
  }, [
    currentPage,
    filter.pagePosts.contributor,
    filter.pagePosts.postType,
    filter.pagePosts.date,
  ])

  return (
    <MainContainer
      footer={
        !pageLoader && publishedPagePosts?.results?.length !== 0 && (
          <Pagination
            limit={limit}
            totalResults={publishedPagePosts?.totalResults}
            totalPages={publishedPagePosts?.totalPages}
            currentPage={publishedPagePosts?.pagingCounter}
            onClickPrevious={() => setCurrentPage(publishedPagePosts?.prevPage)}
            onClickNext={() => setCurrentPage(publishedPagePosts?.nextPage)}
            hasPrevPage={publishedPagePosts?.hasPrevPage}
            hasNextPage={publishedPagePosts?.hasNextPage}
          />
        )
      }
    >
      {pageLoader ? <CircularProgress
                size={32}
                color='primary'
                className='loaderClass'
              /> :
        publishedPagePosts?.results?.length !== 0 ? <TableContainer
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
              <StyledTableCell style={{ width: '30%' }}>
                Post Contents
              </StyledTableCell>
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
              publishedPagePosts.results &&
              publishedPagePosts.results.map((row, index) => {
                return (
                  <PublishedPagePostItem
                    row={row}
                    key={row.id}
                    id={row.id}
                    index={index}
                  />
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

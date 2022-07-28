import React, { useEffect, useState } from 'react'
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

export default function ArchivedPosts() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filter = useSelector((state) => state.filter)
  const archivePostList = useSelector((state) => state.post.archivedPostList)
  const currentPage = useSelector((state) => state.post.archivedPostCurrentPage)

  const [pageLoader, setPageLoader] = useState(true)
  const [limit, setLimit] = useState(12)
  // const [currentPage, setCurrentPage] = useState(
  //   useSelector((state) => state.post.publishedPostCurrentPage),
  // );

    useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const setCurrentPage = (page) => {
    dispatch(postActions.setArchivedPostCurrentPage(page))
  }

  useEffect(() => {
    setPageLoader(true)
    let body = ''
    if (filter.postPublished.page) {
      body = body.concat(`postPage=${filter.postPublished.page}&`)
    }
     if (filter.postPublished.segmentType) {
      body = body.concat(`segmentType=${filter.postPublished.segmentType}&`)
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
      postActions.fetchArchivePosts(
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


  return (
    <MainContainer
      footer={
        !pageLoader && archivePostList?.results?.length !== 0 && (
          <Pagination
            limit={limit}
            totalResults={archivePostList?.totalResults}
            totalPages={archivePostList?.totalPages}
            currentPage={archivePostList?.pagingCounter}
            onClickPrevious={() => setCurrentPage(archivePostList?.prevPage)}
            onClickNext={() => setCurrentPage(archivePostList?.nextPage)}
            hasPrevPage={archivePostList?.hasPrevPage}
            hasNextPage={archivePostList?.hasNextPage}
          />
        )
      }
    >
      {
        archivePostList?.results?.length !== 0 ? <TableContainer
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
              archivePostList?.results &&
              archivePostList?.results?.map((row, index) => {
                return (
                  <PublishedPostItem
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

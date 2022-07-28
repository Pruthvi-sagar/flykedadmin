import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactGA from 'react-ga';
import * as pageActions from '../../actions/pageAction'
import MainContainer from '../../components/utilitiies/MainContainer'
import Pagination from '../../components/utilitiies/Pagination'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import Edit from '../../components/Edit'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import {
  StyledTableCell,
  useStyles,
} from '../../components/utilitiies/StyledTable'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState'
import PublishedPageItem from '../../components/page/PublishedPageItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment-mini'

export default function PublishedPages() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { setAlert } = useContext(AlertNotificationContext);
  const filter = useSelector((state) => state.filter)
  const publishedPages = useSelector((state) => state.page.publishedPageList)
  const [isEdit, setIsEdit] = useState(false)
  const pageDetails = useSelector((state) => state.page.pageDetails)
  const [editPage, setEditPage] = useState({})
  const [pageLoader, setPageLoader] = useState(true);
  const [limit, setLimit] = useState(25);
  const [editLoading, setEditLoading] = useState(false)
  // const [currentPage, setCurrentPage] = useState(
  //   publishedPages?.currentPage || 1
  // )
  const currentPage = useSelector(
    (state) => state.page.publishedPageCurrentPage
  )

    useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const refresh = () => {
    setPageLoader(true)
    let body = ''
    if (filter.published.page) {
      body = body.concat(`title=${filter.published.page}&`)
    }
    if (filter.published.selectedCategory) {
      body = body.concat(`category=${filter.published.selectedCategory}&`)
    }
    if (filter.published.selectedSubCategory) {
      body = body.concat(`subCategory=${filter.published.selectedSubCategory}&`)
    }
    if (filter.published.date.startDate || filter.published.date.endDate) {
      if (filter.published.date?.startDate) {
        body = body.concat(
          `createdAt[gte]=${moment(filter.published.date?.startDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
      if (filter.published.date?.endDate) {
        body = body.concat(
          `createdAt[lte]=${moment(filter.published.date?.endDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
    }

    dispatch(
      pageActions.filterPublishedPage(
        () => setPageLoader(false),
        limit,
        currentPage,
        body
      )
    )
  }

  const setCurrentPage = (page) => {
    dispatch(pageActions.setPublishedPageCurrentPage(page))
  }

  useEffect(() => {
    setPageLoader(true)

    refresh()
  }, [
    currentPage,
    filter.published.selectedSubCategory,
    filter.published.selectedCategory,
    filter.published.page,
    filter.published.date,
  ])

  const editClose = () => {
    setEditLoading(false);
    setIsEdit(false)
    dispatch(pageActions.setThumbnailsCurrentPage(1));
    dispatch(pageActions.clearPageDetails());
  }
  const editOpen = (id) => {
    dispatch(pageActions.viewPageDetails(id, () => {}))
    setIsEdit(true)
  }

  const handlePage = (page) => {
    setEditPage(page)
  }

  const onEdit = (id, body, thumbnails) => {
    setEditLoading(true)
    let data = {...body, 
      post: thumbnails, 
      // dob: moment(body?.dob).format('DD-MM-YYYY') !== 'Invalid date' ? moment(body?.dob).format('DD-MM-YYYY') :  body?.dob,
    }
    dispatch(pageActions.editPage(id, data, refresh, editClose, setAlert,handleLoader))
  }

  const handleLoader = () => {
    setEditLoading(false);
  }

  return (
    <MainContainer
      footer={
        !pageLoader && publishedPages?.results?.length !== 0 && (
          <Pagination
            limit={limit}
            totalResults={publishedPages?.totalResults}
            totalPages={publishedPages?.totalPages}
            currentPage={publishedPages?.pagingCounter}
            onClickPrevious={() => setCurrentPage(publishedPages?.prevPage)}
            onClickNext={() => setCurrentPage(publishedPages?.nextPage)}
            hasPrevPage={publishedPages?.hasPrevPage}
            hasNextPage={publishedPages?.hasNextPage}
          />
        )
      }
    > {
      publishedPages?.results?.length !== 0 ? <TableContainer
      style={{
        borderRadius: '10px',
        border: '1px solid #EDEDED',
        background: '#FFFF',
      }}
    >
      <Table className={classes.table} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>PAGE</StyledTableCell>
            <StyledTableCell>CREATED BY</StyledTableCell>
            <StyledTableCell>CATEGORY</StyledTableCell>
            <StyledTableCell>SUBCATEGORY</StyledTableCell>
            <StyledTableCell>NO OF POST</StyledTableCell>
            <StyledTableCell>CREATED ON</StyledTableCell>
            <StyledTableCell>FOLLOWERS</StyledTableCell>
            {/* <StyledTableCell>VIEW POST</StyledTableCell> */}
            <StyledTableCell></StyledTableCell>
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
            publishedPages.results && (
              <>
                {publishedPages.results.length > 0 ? (
                  publishedPages.results.map((page) => (
                    <PublishedPageItem
                      row={page}
                      key={page?._id}
                      id={page?._id}
                      handlePage={handlePage}
                      editOpen={editOpen}
                    />
                  ))
                ) : (
                  <div styles={{ width: '100%' }}>No pages found</div>
                )}
              </>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer> : <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>Records not found</Typography>
    }
      {isEdit && (
        <Edit
          page={pageDetails}
          editClose={editClose}
          isEdit={isEdit}
          onEdit={onEdit}
          approveEditLoader={editLoading}
        />
      )}
    </MainContainer>
  )
}

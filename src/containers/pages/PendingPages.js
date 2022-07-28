import React, { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as pageActions from '../../actions/pageAction'
import Box from '@material-ui/core/Box';
import ReactGA from 'react-ga';
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography';
import Edit from '../../components/Edit'
import PendingPageItem from '../../components/page/PendingPageItem'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState'
import MainContainer from '../../components/utilitiies/MainContainer'
import Pagination from '../../components/utilitiies/Pagination'
import MergeSuccess from '../../components/page/MergeSuccess'
import moment from 'moment-mini'

export default function PendingPages() {
  const dispatch = useDispatch()
  const { setAlert } = useContext(AlertNotificationContext);
  const pendingPages = useSelector((state) => state.page.pendingPageList);
   const pageDetails = useSelector((state) => state.page.pageDetails)
  const filter = useSelector((state) => state.filter)
  const [pageLoader, setPageLoader] = useState(true)
  const [limit, setLimit] = useState(6)
  const [merge, setMerge] = useState(false)
  const [approve, setApprove] = useState(false)
  const [reject, setReject] = useState(false)
  // const [currentPage, setCurrentPage] = useState(pendingPages?.currentPage || 1)
  const currentPage = useSelector((state) => state.page.pendingPageCurrentPage)
  const [isEdit, setIsEdit] = useState(false)
  const [editPage, setEditPage] = useState({})
  const [approveEdit, setApproveEdit] = useState(false);
  const [approveEditLoader, setApproveEditLoader] = useState(false);

   useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const editOpen = (approveFlow, id) => {
    if(approveFlow) {
      setApproveEdit(true)
    }
    else {
      setApproveEdit(false)
    }
    dispatch(pageActions.viewPageDetails(id, () => {}))
    setIsEdit(true)
  }

  const editClose = () => {
    setApproveEditLoader(false)
    setIsEdit(false);
    if(approveEdit) {
      handleApprove();
    }
    dispatch(pageActions.setThumbnailsCurrentPage(1));
    dispatch(pageActions.clearPageDetails());
  }

  const handlePage = (page) => {
    setEditPage(page)
  }

  const refresh = () => {
    setPageLoader(true)
    let body = ''
    if (filter.pending.selectedCategory) {
      body = body.concat(`category=${filter.pending.selectedCategory}&`)
    }
    if (filter.pending.selectedSubCategory) {
      body = body.concat(`subCategory=${filter.pending.selectedSubCategory}&`)
    }
    if (filter.pending.date.startDate || filter.pending.date.endDate) {
      if (filter.pending.date?.startDate) {
        body = body.concat(
          `createdAt[gte]=${moment(filter.pending.date?.startDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
      if (filter.pending.date?.endDate) {
        body = body.concat(
          `createdAt[lte]=${moment(filter.pending.date?.endDate).format(
            'YYYY-MM-DD'
          )}&`
        )
      }
    }

    dispatch(
      pageActions.filterPendingPage(
        () => setPageLoader(false),
        limit,
        currentPage,
        body
      )
    )
  }

  useEffect(() => {
    refresh()
  }, [
    currentPage,
    filter.pending.selectedCategory,
    filter.pending.selectedSubCategory,
    filter.pending.date,
  ])

  const handleClickOpen = () => {
    setMerge(true)
  }

  const handleOnApproveOpen = () => {
    setApprove(true)
  }
  const handleOnRejectOpen = () => {
    setReject(true)
  }

  const handleMerge = () => {
    setMerge(false)
  }
  const handleApprove = () => {
    setApprove(false)
  }
  const handleReject = () => {
    setReject(false)
  }

  const setCurrentPage = (page) => {
    dispatch(pageActions.setPendingPageCurrentPage(page))
  }

  const handleEditAndApprove = (id,body,thumbnails) => {
    setApproveEditLoader(true);

     let data = {...body, 
      post: thumbnails, 
      // pagedob: moment(body?.pagedob).format('DD-MM-YYYY') !== 'Invalid date' ? moment(body?.pagedob).format('DD-MM-YYYY') :  body?.pagedob,
    }
    // setEditPage(false);
    dispatch(pageActions.editAndApprovePage(id, data, () => onApprove(id, data, () => {
      setApproveEditLoader(false)
      editClose();
    }), () => setApproveEditLoader(false), setAlert))
  }

  const onApprove = (id, page, callback) => {
    const body = {
      title: page?.title,
      image: page?.image,
      pagedob: page?.pagedob,
      category: page?.category?._id,
      subCategory: page?.subCategory?._id || null,
      priority: page?.priority || 'high',
      dod: page?.dod || null,
      tags: page?.tags || [],
      post: page?.post
    }
    dispatch(pageActions.approvePages(id, body, refresh, handleOnApproveOpen, callback))
  }

  const onReject = (id, callback) => {
    // console.log('id',id)
    dispatch(pageActions.rejectPages(id, refresh, handleOnRejectOpen, callback))
  } 

  const onMerge = (id, body, callback) => {
    // console.log('id',id,body);
    dispatch(pageActions.mergePage(id, body, refresh, handleClickOpen, callback))
  }

  const onEdit = (id, body,thumbnails) => {
     let data = {...body, 
      post: thumbnails || [], 
      // pagedob: moment(body?.pagedob).format('DD-MM-YYYY') !== 'Invalid date' ? moment(body?.pagedob).format('DD-MM-YYYY') :  body?.pagedob,
    }
    setApproveEditLoader(true);
    dispatch(pageActions.editPage(id, data, refresh, editClose, setAlert,handleLoader))
    setApproveEditLoader(false);
  }


  const handleLoader = () => {
    setApproveEditLoader(false);
  }

  return (
    <MainContainer
      footer={
        !pageLoader && pendingPages?.results?.length !== 0 &&  (
          <Pagination
            limit={limit}
            totalResults={pendingPages?.totalResults}
            totalPages={pendingPages?.totalPages}
            currentPage={pendingPages?.pagingCounter}
            onClickPrevious={() => setCurrentPage(pendingPages?.prevPage)}
            onClickNext={() => setCurrentPage(pendingPages?.nextPage)}
            hasPrevPage={pendingPages?.hasPrevPage}
            hasNextPage={pendingPages?.hasNextPage}
          />
        )
      }
    >
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='flex-start'
        style={{
          width: '100%',
          margin: '0 auto',
          backgroundColor: '#FFFF',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        {pageLoader ? (
          <CircularProgress size={32} color='primary' className='loaderClass' />
        ) : (
          pendingPages.results && (
            <>
              {pendingPages.results.length > 0 ? (
                pendingPages.results.map((item) => (
                  <PendingPageItem
                    page={item}
                    key={item._id}
                    onApprove={onApprove}
                    onReject={onReject}
                    onMerge={onMerge}
                    handlePage={handlePage}
                    editOpen={editOpen}
                  />
                ))
              ) : (
                <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>Records not found</Typography>
              )}
            </>
          )
        )}
      </Box>
      {merge && <MergeSuccess
        open={merge}
        handleClose={handleMerge}
        text='Page Merged Successfully'
        subText='Page have been published, you can see them in respective pages.'
      />}
      {approve && <MergeSuccess
        open={approve}
        handleClose={handleApprove}
        text='Page Approved Successfully'
        subText='Page have been published, you can see them in respective pages.'
      />}
      {reject && <MergeSuccess
        open={reject}
        handleClose={handleReject}
        text='Page Rejected Successfully'
        subText='Page has not published, and it has been rejected.'
      />}
      {isEdit && (
        <Edit
          page={pageDetails}
          editClose={editClose}
          isEdit={isEdit}
          onEdit={onEdit}
          approveEdit={approveEdit}
          editAndApprove={handleEditAndApprove}
          approveEditLoader={approveEditLoader}
        />
      )}
    </MainContainer>
  )
}

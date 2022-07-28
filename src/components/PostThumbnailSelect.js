import React, {useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import { COLORS } from '../constants/color';
import CircularProgress from '@material-ui/core/CircularProgress'
import * as pageActions from '../actions/pageAction'
import Pagination from '../components/utilitiies/Pagination'
import Tick from '../assets/Tick.svg'
import { AlertNotificationContext } from '../elements/alert-notfication/alertState'


function PostThumbnailSelect({pageId,selected,setSelected,celebrityPage}) {
    const dispatch = useDispatch();
    const { setAlert } = useContext(AlertNotificationContext);
    const pagePostThumbnailsLoading = useSelector((state) => state.page.pagePostThumbnailsLoader)
    const pagePostThumbnails = useSelector((state) => state.page.pagePostThumbnails)
    const currentPage = useSelector((state) => state.page.thumbnailsCurrentPage)
    // const [selected,setSelected] = useState([]);

    // console.log('pagePostThumbnails',selected)
 
    useEffect(() => {
    dispatch(pageActions.viewPagePostThumbnails(pageId))
    },[currentPage])

  const setThumbnailPage = (page) => {
    dispatch(pageActions.setThumbnailsCurrentPage(page))
  }

  useEffect(() => {
    if(!selected.length)
    setSelected(pagePostThumbnails?.results?.filter((item, index) => item?.toBirthday === true)?.map((item) => item?._id) || [])
  },[pagePostThumbnailsLoading])


    const handleSelectThumbnail = (item) => {
        if(selected.includes(item)) {
             let tempData = selected.filter(i => i !== item)
            // const index = tempData.indexOf(item);
            // if (index > -1) {
            // tempData.splice(index, 1);
            // }
            // tempData.pop(index);
            setSelected([...tempData])
            return;
        }
        if(selected.length === 5) {
            setAlert('error','Cannot add more than 5 posts')
            return;
        }
        // const newArray = [...new Set(selectedItems)]
        setSelected([...selected, item])
    }

    if(pagePostThumbnails?.results?.length === 0) {
        return (
      <>
         <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography
                gutterBottom
                variant="body1"
                style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
                Set images for birthday posts
            </Typography>
             <Typography
                gutterBottom
                variant="body1"
                style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              {selected?.length}/5 selected
            </Typography>
          </div>
           <Typography
                gutterBottom
                variant="body1"
                style={{ fontWeight: 400, color: COLORS.TEXT, marginTop: 15 }}
            >
                No images found for this page.
            </Typography>
        </>
        )
    }

    if(!celebrityPage) {
      return null
    }

    return (
        <>
           {pagePostThumbnailsLoading ? (
               <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px'}}>
                 <CircularProgress size={32} color='primary' />
               </div>
            ) : (
            <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography
                gutterBottom
                variant="body1"
                style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
                Set images for birthday posts
            </Typography>
             <Typography
                gutterBottom
                variant="body1"
                style={{ fontWeight: 600, color: COLORS.TEXT, marginTop: 15 }}
            >
              {selected?.length}/5 selected
            </Typography>
          </div>
          <div style={{display: 'flex', width: '100%', flex: 1, flexWrap: 'wrap'}}>
         {pagePostThumbnails?.results?.map((item, i) => {
            return (
                <div style={{margin: '10px 10px 0px 0px', cursor: 'pointer',width: '7.9vw', position: 'relative', height: '10vw',borderRadius: 8,border: selected.includes(item?._id) ? '2px solid #EF613B' : '2px solid #FFF'}} onClick={() => handleSelectThumbnail(item?._id)}>
                    <img src={Tick} style={{position: 'absolute', right: 4, top: 4, display: selected.includes(item?._id) ? '' : 'none'}} />
                    <img src={item?.image} style={{width: '100%', height: '100%',borderRadius: 4 }} />
                </div>
            )
            })}  
          </div>
        <Pagination
            limit={10}
            totalResults={pagePostThumbnails?.totalResults}
            totalPages={pagePostThumbnails?.totalPages}
            currentPage={pagePostThumbnails?.pagingCounter}
            onClickPrevious={() => setThumbnailPage(pagePostThumbnails?.prevPage)}
            onClickNext={() => setThumbnailPage(pagePostThumbnails?.nextPage)}
            hasPrevPage={pagePostThumbnails?.hasPrevPage}
            hasNextPage={pagePostThumbnails?.hasNextPage}
          />
          </>
            )} 
        </>
    )
}

export default PostThumbnailSelect

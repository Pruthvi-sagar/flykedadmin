import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment-mini'
import {
  StyledTableRow,
  useStyles,
  StyledTableCell,
} from '../utilitiies/StyledTable'
import { IMAGES } from '../../assets'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import * as pageActions from '../../actions/pageAction'
import viewpost from '../../assets/viewpost.svg'
import stringAvatar from '../../elements/stringAvatar'

export default function PublishedPageItem(props) {
  const { row, handlePage, editOpen } = props
  const classes = useStyles()
  const history = useHistory()
  const [hover, setHover] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [pageLoader, setPageLoader] = useState(false)
  const dispatch = useDispatch()

  const viewPostBtn = (id, title) => {
    
    const pagePostHandler = () => {
      history.push(`/admin/page/${id}/postList`, {title});
      dispatch(pageActions.getSelectedPageTitle(title))
    }

    return (
      <Button
        color='primary'
        style={{ textTransform: 'capitalize' }}
        onClick={pagePostHandler}
      >
        view post
      </Button>
    )
  }

  const pageNameAndImage = (pageImage, pageTitle) => {
    return (
      <Box display='flex' alignItems='center'>
        <Avatar
          alt='Remy Sharp'
          src={pageImage}
          style={{ marginRight: '15px' }}
          {...stringAvatar(pageTitle)}
        />
        <Typography style={{ marginLeft: '10px' }}>
          {pageTitle?.length > 15 ? `${pageTitle?.slice(0, 15)}..` : pageTitle}
        </Typography>
      </Box>
    )
  }
  const createdBy = (title, image) => {
    return (
      <Box display='flex' alignItems='center'>
        <Avatar alt='Remy Sharp' {...stringAvatar(title)} src={image} className={classes.small} />
        <Typography>
          {title?.length > 15 ? `${title?.slice(0, 15)}..` : title}
        </Typography>
      </Box>
    )
  }

  const date = moment(row?.createdAt).format('DD-MM-YYYY')
  return (
    <>
      <StyledTableRow
        key={row?.title}
        onMouseEnter={() => {
          setHover(true)
        }}
        onMouseLeave={() => {
          setHover(false)
        }}
      >
        <StyledTableCell component='th' scope='row'>
          {pageNameAndImage(row?.image, row?.title)}
        </StyledTableCell>
        <StyledTableCell>
          {createdBy(row?.createdBy?.name, row?.createdBy?.profileImage)}
        </StyledTableCell>
        <StyledTableCell>
          <Typography>{row?.category?.title}</Typography>
        </StyledTableCell>
        <StyledTableCell>
          <Typography>
            {row?.subCategory?.title?.length > 15
              ? `${row?.subCategory?.title.slice(0, 15)}..`
              : row?.subCategory?.title}
          </Typography>
        </StyledTableCell>
        <StyledTableCell>{row?.postCount}</StyledTableCell>
        <StyledTableCell>{date}</StyledTableCell>
        <StyledTableCell>{row?.followerCount}</StyledTableCell>
        {/* <StyledTableCell>{viewPostBtn(row?._id, row?.title)}</StyledTableCell> */}
        <StyledTableCell>
          <Box style={{ width: 20, cursor: 'pointer' }}>
            {hover && (
              <div style={{display: 'flex', alignItems: 'center'}}> 
                <img
                style={{marginLeft: -14}}

                src={viewpost}
                alt='viewpost icon'
                onClick={() => {
                  history.push(`/admin/page/${row?._id}/postList`, {title: row?.title} );
                  dispatch(pageActions.getSelectedPageTitle(row?.title))
                }}
              />
              <img
                style={{marginLeft: 10}}
                src={IMAGES.EDIT_ICON}
                alt='edit icon'
                onClick={() => {
                  handlePage(row)
                  editOpen(row?._id)
                }}
              />
  
              </div>
            )}
          </Box>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

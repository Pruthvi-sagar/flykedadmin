import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { COLORS } from '../constants/color'
import Search from './utilitiies/Search'
import * as categoryActions from '../actions/categoryAction'
import * as pageAction from '../actions/pageAction'
import * as filterAction from '../actions/filterAction'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  selectEmpty: {
    color: COLORS.SECONDARY,
  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  boldText: {
    fontWeight: 600,
  },
  date: {
    width: '48%',
  },
}))

function Filter(props) {
  const { onClose, open, handleClose, type } = props
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.category.categoryList)
  const subCategoryList = useSelector((state) => state.category.subCategoryList)
  const searchList = useSelector((state) => state.page.searchList)
  const selectedPage = useSelector((state) => state.filter.published.page)
  const publishedCategory = useSelector(
    (state) => state.filter.published.selectedCategory
  )
  const publishedSubcategory = useSelector(
    (state) => state.filter.published.selectedSubCategory
  )
  const pendingCategory = useSelector(
    (state) => state.filter.pending.selectedCategory
  )
  const pendingSubcategory = useSelector(
    (state) => state.filter.pending.selectedSubCategory
  )
  const publishedStartDate = useSelector(
    (state) => state.filter.published.date.startDate
  )
  const publishedEndDate = useSelector(
    (state) => state.filter.published.date.endDate
  )
  const pendingStartDate = useSelector(
    (state) => state.filter.pending.date.startDate
  )
  const pendingEndDate = useSelector(
    (state) => state.filter.pending.date.endDate
  )
  const history = useHistory()
  const contributorList = useSelector(
    (state) => state.post.searchContributorsList
  )
  const [term, setTerm] = useState('')
  const [pageTitle, setPageTitle] = useState(selectedPage)
  const [categoryLoader, setCategoryLoader] = useState(true)
  const [subCategoryLoader, setSubCategoryLoader] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(
    type === 0 ? publishedCategory : pendingCategory
  )
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    type === 0 ? publishedSubcategory : pendingSubcategory
  )

  const classes = useStyles()
  const [startDate, setStartDate] = useState(
    type === 0 ? publishedStartDate : pendingStartDate
  )

  const [endDate, setEndDate] = useState(
    type === 0 ? publishedEndDate : pendingEndDate
  )

  useEffect(() => {
    // API Call for Categories here
    dispatch(categoryActions.getCategories(() => setCategoryLoader(false)))
  }, [])

  useEffect(() => {
    // API Call for SubCategories onChange
    // if (type === 0) {
    //   dispatch(
    //     categoryActions.getSubCategories(selectedCategory, () =>
    //       setSubCategoryLoader(false)
    //     )
    //   )
    // } else {
      dispatch(
        categoryActions.getSubCategories(selectedCategory, () =>
          setSubCategoryLoader(false)
        )
      )
    // }
  }, [selectedCategory])

  useEffect(() => {
    // API Call for search onChange
    dispatch(pageAction.searchPages(term))
  }, [term])

  const handleTerm = (e, value) => {
    setTerm(e.target.value)
  }

  const handlePageTitle = (e, value) => {
    setPageTitle(value)
  }

  const handleStartDate = (date) => {
    setStartDate(date)
  }

  const handleEndDate = (date) => {
    setEndDate(date)
  }

  const handleChangeCategory = (e) => {
    // if (type === 0) {
    //   setSelectedCategory(e.target.value)
    // } else {
      setSelectedCategory(e.target.value)
    // }
  }
  const handleChangeSubCategory = (e) => {
    // if (type === 0) {
    //   setSelectedSubCategory(e.target.value)
    // } else {
      setSelectedSubCategory(e.target.value)
    // }
  }

  const onApply = () => {
    if (history.location.pathname.includes('published') || history.location.pathname.includes('archived')  || history.location.pathname.includes('didyouknow')) {
      const body = {
        date: {
          startDate: startDate,
          endDate: endDate,
        },
        page: pageTitle,
        selectedCategory: selectedCategory,
        selectedSubCategory: selectedSubCategory,
      }
      dispatch(filterAction.filterPublishedPage(body, handleClose))

      dispatch(filterAction.isFilteredPublished(true))
    } else {
      const body = {
        date: {
          startDate: startDate,
          endDate: endDate,
        },
        selectedCategory: selectedCategory,
        selectedSubCategory: selectedSubCategory,
      }

      dispatch(filterAction.filterPendingPage(body, handleClose))
      dispatch(filterAction.isFilteredPending(true))
    }
  }

  const onClear = () => {
    if (history.location.pathname.includes('published') || history.location.pathname.includes('archived') || history.location.pathname.includes('didyouknow')) {
      const body = {
        date: {
          startDate: null,
          endDate: null,
        },
        page: '',
        selectedCategory: '',
        selectedSubCategory: '',
      }
      dispatch(filterAction.isFilteredPublished(false))
      dispatch(filterAction.filterPublishedPage(body, handleClose))
      setSelectedCategory('')
      setStartDate(null)
      setEndDate(null)
    } else {
      const body = {
        date: {
          startDate: null,
          endDate: null,
        },
        selectedCategory: '',
        selectedSubCategory: '',
      }
      dispatch(filterAction.isFilteredPending(false))
      dispatch(filterAction.filterPendingPage(body, handleClose))
      setSelectedCategory('')
      setStartDate(null)
      setEndDate(null)
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle onClose={handleClose} className={classes.root}>
          <Typography variant='subtitle2'>Filter</Typography>
          {true ? (
            <IconButton
              aria-label='close'
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <Box
            style={{
              width: '400px',
              backgroundColor: 'white',
              margin: '10px auto',
              borderRadius: '8px',
            }}
          >
            <Box
              display='flex'
              justifyContent='center'
              flexDirection='column'
              alignItems='center'
            >
              {history.location.pathname.includes('pending') ? null : (
                <>
                  <Typography
                    align='left'
                    style={{ width: '100%', color: COLORS.TEXT }}
                    variant='body1'
                    className={classes.boldText}
                  >
                    Page
                  </Typography>
                  <Search
                    options={searchList?.results}
                    placeholder='Type to select a page..'
                    term={term}
                    pageTitle={pageTitle}
                    handleTerm={handleTerm}
                    handlePageTitle={handlePageTitle}
                  />
                </>
              )}

              <Typography
                align='left'
                style={{ width: '100%', color: COLORS.TEXT }}
                variant='body1'
                className={classes.boldText}
              >
                Category
              </Typography>

              <Select
                variant={'outlined'}
                fullWidth
                displayEmpty
                style={{ margin: '16px 16px' }}
                value={selectedCategory}
                className={!selectedCategory && classes.selectEmpty}
                onChange={handleChangeCategory}
              >
                <MenuItem disabled value={''}>
                  Select the category
                </MenuItem>
                {categoryList.map((item) => {
                  return (
                    <MenuItem value={item._id} key={item._id}>
                      {item.title}
                    </MenuItem>
                  )
                })}
              </Select>
              <Typography
                align='left'
                variant='body1'
                style={{ width: '100%', color: COLORS.TEXT }}
                className={classes.boldText}
              >
                Subcategory
              </Typography>
              <Select
                variant={'outlined'}
                fullWidth
                displayEmpty
                style={{ margin: '16px 16px' }}
                value={selectedSubCategory}
                disabled={!selectedCategory}
                className={!selectedSubCategory && classes.selectEmpty}
                onChange={handleChangeSubCategory}
              >
                <MenuItem disabled value={''}>
                  Select the subcategory
                </MenuItem>
                {subCategoryList.map((item) => {
                  return (
                    <MenuItem value={item._id} key={item._id}>
                      {item.title}
                    </MenuItem>
                  )
                })}
              </Select>

              <Typography
                align='left'
                style={{ width: '100%', color: COLORS.TEXT }}
                variant='body1'
                className={classes.boldText}
              >
                Created between
              </Typography>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent='space-between'>
                  <KeyboardDatePicker
                    margin='normal'
                    inputVariant='outlined'
                    id='date-picker-dialog'
                    format='dd/MM/yyyy'
                    minDate="1000-01-01"
                    value={startDate}
                    onChange={handleStartDate}
                    className={classes.date}
                    maxDate={new Date()}
                    InputProps={{
                      disableUnderline: true,
                      placeholder: 'Start Date',
                    }}
                  />
                  <KeyboardDatePicker
                    margin='normal'
                    maxDate={new Date()}
                    inputVariant='outlined'
                    id='date-picker-dialog'
                    format='dd/MM/yyyy'
                    minDate="1000-01-01"
                    value={endDate}
                    onChange={handleEndDate}
                    className={classes.date}
                    InputProps={{
                      disableUnderline: true,
                      placeholder: 'End Date',
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Box>
            {startDate > endDate ? (
              <Typography style={{ color: 'red', textAlign: 'center' }}>
                Start date should be less than end date
              </Typography>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            style={{
              textTransform: 'capitalize',
              fontSize: 16,
              color: COLORS.SUB_TEXT,
            }}
            onClick={onClear}
          >
            Clear all
          </Button>
          <Button
            color={'primary'}
            variant={'contained'}
            style={{ textTransform: 'capitalize', fontSize: 16 }}
            onClick={onApply}
            disabled={
              type === 0
                ? !pageTitle && !selectedCategory && (!startDate || !endDate)
                : !selectedCategory && (!startDate || !endDate)
            }
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Filter

Filter.protoTypes = {
  type: PropTypes.number.isRequired,
}

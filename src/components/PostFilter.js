import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
import withStyles from '@material-ui/core/styles/withStyles'
import * as postAction from '../actions/postAction'
import * as filterAction from '../actions/filterAction'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
// import './PostFilter.css'

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
  checkboxClass: {
    '& .MuiCheckbox-root': {
      padding: '6px',
    },
  },
  date: {
    width: '48%',
  },
}))

const checkBoxStyles = (theme) => ({
  root: {
    '&$checked': {
      color: COLORS.PRIMARY,
    },
  },
  checked: {},
})

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox)

function PostFilter(props) {
  const dispatch = useDispatch()
  const selectedContributor = useSelector(
    (state) => state.filter.pagePosts.contributor
  )
  const selectedPostTypes = useSelector(
    (state) => state.filter.pagePosts.postType
  )
  const selectedStartDate = useSelector(
    (state) => state.filter.pagePosts.date.startDate
  )
  const selectedEndDate = useSelector(
    (state) => state.filter.pagePosts.date.endDate
  )
  const history = useHistory()
  const location = useLocation()
  const contributorList = useSelector(
    (state) => state.post.searchContributorsList
  )

  const [term, setTerm] = useState('')
  const [contributorTerm, setContributorTerm] = useState(
    contributorList?.results?.find((obj) => {
      return obj?._id === selectedContributor
    })?.name || ''
  )
  const [contributorTitle, setContributorTitle] = useState(
    contributorList?.results?.find((obj) => {
      return obj?._id === selectedContributor
    })?.name || null
  )

  const classes = useStyles()
  const [startDate, setStartDate] = useState(selectedStartDate)
  const [endDate, setEndDate] = useState(selectedEndDate)
  const { open, handleClose } = props

  const [checkValue, setCheckValue] = useState({
    fact: selectedPostTypes?.fact || false,
    birthday: selectedPostTypes?.birthday || false,
    onTheDay: selectedPostTypes?.onTheDay || false,
    inTheNews: selectedPostTypes?.inTheNews || false,
  })

  const checkboxHandleChange = (event) => {
    setCheckValue({
      ...checkValue,
      [event.target.name]: event.target.checked,
    })
  }
  const { fact, birthday, onTheDay, inTheNews } = checkValue

  useEffect(() => {
    // API Call for contributor search
    dispatch(postAction.searchContributors(contributorTerm))
  }, [contributorTerm])

  const handleTerm = (e, value) => {
    setTerm(e.target.value)
  }

  const handleContributorTerm = (e, value) => {
    setContributorTerm(e.target.value)
  }

  const handleContributorTitle = (e, value) => {
    setContributorTitle(value)
  }

  const handleStartDate = (date) => {
    setStartDate(date)
  }

  const handleEndDate = (date) => {
    setEndDate(date)
  }

  const onApply = () => {
    const body = {
      date: {
        startDate: startDate,
        endDate: endDate,
      },
      contributor: contributorList?.results?.find((obj) => {
        return obj?.name === contributorTitle
      })?._id,
      postType: checkValue,
    }
    dispatch(filterAction.filterPagePosts(body, handleClose))
    dispatch(filterAction.isFilteredPagePosts(true))
  }

  const onClear = () => {
    const body = {
      date: {
        startDate: null,
        endDate: null,
      },
      contributor: null,
      postType: null,
    }
    dispatch(filterAction.filterPagePosts(body, handleClose))
    dispatch(filterAction.isFilteredPagePosts(false))
  }

  const getContributorValue = (value) => {
    const contributor = contributorList?.results?.find(
      (item) => item?._id === value
    )
    return contributorTitle
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
              <Typography
                align='left'
                style={{ width: '100%' }}
                className={classes.boldText}
              >
                Contributor
              </Typography>
              <div style={{ width: '100%', marginBottom: '16px' }}>
                <Autocomplete
                  // disabled={contributorList?.results?.length === 0}
                  freeSolo
                  fullwidth
                  value={getContributorValue(selectedContributor)}
                  onChange={(event, value) =>
                    handleContributorTitle(event, value)
                  }
                  options={contributorList?.results?.map((item) => item.name)}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        placeholder='Type to select an user..'
                        InputProps={{
                          ...params.InputProps,
                          value: contributorTerm,
                          onChange: handleContributorTerm,
                        }}
                      />
                    )
                  }}
                />
              </div>
              <Typography
                align='left'
                style={{ width: '100%', marginBottom: '10px' }}
                className={classes.boldText}
              >
                Post Type
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '16px',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  control={<CustomCheckbox checked={fact} name='fact' />}
                  label='Fact'
                  onChange={checkboxHandleChange}
                  className={classes.checkboxClass}
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox checked={birthday} name='birthday' />
                  }
                  label='Birthday'
                  onChange={checkboxHandleChange}
                  className={classes.checkboxClass}
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox checked={onTheDay} name='onTheDay' />
                  }
                  label='On this day'
                  onChange={checkboxHandleChange}
                  className={classes.checkboxClass}
                />
                <FormControlLabel
                  control={
                    <CustomCheckbox checked={inTheNews} name='inTheNews' />
                  }
                  label='In the news'
                  onChange={checkboxHandleChange}
                  className={classes.checkboxClass}
                />
              </div>

              <Typography
                align='left'
                style={{ width: '100%' }}
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
                    }}
                    placeholder='Start Date'
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
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    placeholder='End Date'
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
              !contributorTitle &&
              !checkValue.fact &&
              !checkValue.birthday &&
              !checkValue.onTheDay &&
              !checkValue.inTheNews &&
              (!startDate || !endDate)
            }
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default PostFilter

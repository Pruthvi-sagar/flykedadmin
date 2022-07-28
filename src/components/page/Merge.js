import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { COLORS } from '../../constants/color'
import { IMAGES } from '../../assets'
import * as pageAction from '../../actions/pageAction'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: '4px 10px',
    boxShadow: `0 5px 8px 1px rgb(217, 217, 217)`,
  },
  selected: {
    backgroundColor: `${COLORS.PRIMARY}10`,
  },
}))

function Merge({
  open,
  handleClose,
  pendingPageCard,
  searchList,
  searchTerm,
  selectedPage,
  handleSearch,
  onSelect,
  onMerge,
  handleConfirmMerge,
  id,
}) {
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(pageAction.searchPages(searchTerm))
  }, [searchTerm])


  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
          style={{ width: 420 }}
        >
          <Typography variant='subtitle2' style={{ fontWeight: 600 }}>
            Merge page
          </Typography>
          {/* {onClose ? (
            <IconButton
              aria-label='close'
              className={classes.closeButton}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null} */}
        </DialogTitle>
        <DialogContent dividers>
          {pendingPageCard()}
          <Box>
            <Typography
              variant='body1'
              style={{ color: COLORS.TEXT, marginBottom: 5 }}
            >
              Merge to
            </Typography>
            <Box
              style={{
                backgroundColor: COLORS.SECONDARY_GREY,
                borderRadius: 6,
                alignItems: 'center',
                height: 40,
                display: 'flex',
                padding: '2px 10px',
              }}
            >
              <img src={IMAGES.SEARCH_ICON} alt='search icon' />
              <InputBase
                className={classes.input}
                placeholder='Type to search page'
                value={searchTerm}
                onChange={handleSearch}
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Box>
          </Box>
          <Box style={{ marginTop: 10, height: 260, overflowY: 'scroll' }}>
            {searchList.results &&
              searchList?.results.map((page) => {
                return (
                  <Box
                    display='flex'
                    alignItems='center'
                    key={page?._id}
                    className={
                      page?._id === selectedPage?._id && classes.selected
                    }
                    style={{ marginBottom: 10, cursor: 'pointer' }}
                    onClick={() => onSelect(page)}
                  >
                    <Avatar src={page?.image} className={classes.avatar} />
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      style={{ flexGrow: 1 }}
                    >
                      <Box>
                        <Typography
                          variant='body1'
                          style={{
                            fontWeight: 'bold',
                            color: COLORS.GRAY_BLACK,
                          }}
                        >
                          {page?.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          style={{
                            color: COLORS.PRIMARY_GREY,
                          }}
                        >
                          {page?.description}
                        </Typography>
                      </Box>
                      {page?._id === selectedPage?._id && (
                        <Box style={{ marginRight: 10 }}>
                          <img
                            src={IMAGES.PINK_TICK_ICON}
                            alt='pink tick icon'
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                )
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant='outlined'
            onClick={handleClose}
            style={{ textTransform: 'capitalize' }}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant='contained'
            style={{ textTransform: 'capitalize' }}
            color='primary'
            onClick={handleConfirmMerge}
            disabled={!selectedPage._id}
          >
            Merge page
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Merge

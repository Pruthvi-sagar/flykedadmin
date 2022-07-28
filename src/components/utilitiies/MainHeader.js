import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { IMAGES } from '../../assets'
import { COLORS } from '../../constants/color'
import * as authAction from '../../actions/authAction'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: COLORS.WHITE,
    boxshadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  Toolbar: {
    maxWidth: '1200px',
    width: '84vw',
    margin: '0px auto',
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    color: 'gray',
    '& a': {
      width: '100px',
    },
  },
  tabs: {
    cursor: 'pointer',
    padding: '5px 0px',
    fontSize: '18px',
    color: '#4D586F',
    fontWeight: '400',
    textAlign: 'center',
    height: '40px',
  },

  select: {
    cursor: 'pointer',
    color: COLORS.PRIMARY,
    background: COLORS.SECONDARY_GREY,
    fontSize: '18px',
    padding: '5px 0px',
    borderRadius: '4px',
    fontWeight: '600',
    height: '40px',
    textAlign: 'center',
  },

  button: {
    color: COLORS.TEXT,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  admin: {
    display: 'flex',
  },
}))
const tabs = [
  { key: 'posts', title: 'Posts', path: '/admin/posts/pending' },
  { key: 'stories', title: 'Stories', path: '/admin/stories/pending' },
  { key: 'page', title: 'Pages', path: '/admin/page/pending' },
  { key: 'config', title: 'Configs', path: '/admin/config' },
  { key: 'Pruthvi', title: 'Pruthvi', path: '/admin/test/testing1' },
]

function MainHeader(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const token = useSelector((state) => state.auth.token)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const history = useHistory()
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar className={classes.Toolbar}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        >
          <img
            src={IMAGES.FLYKED_LOGO}
            style={{ width: 88, height: 20 }}
            alt='flyked-logo'
          />
        </IconButton>
        {token && (
          <>
            <Box className={classes.title}>
              <Box
                display='flex'
                justifyContent='space-between'
                style={{
                  marginLeft: '30px',
                  width: '320px',
                }}
              >
                {tabs.map((item, index) => (
                  <Link
                    to={item.path}
                    key={index}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                  >
                    <Typography
                      variant='subtitle2'
                      className={
                        history.location.pathname.includes(item.key)
                          ? classes.select
                          : classes.tabs
                      }
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Box>
            <Box className={classes.admin}>
              <Avatar variant='rounded' src={IMAGES.USER_ICON} alt='admin-logo'/>
              <Button
                id='basic-button'
                aria-controls='basic-menu'
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={classes.button}
                endIcon={<ExpandMoreIcon style={{ color: COLORS.SECONDARY }} />}
              >
                Admin
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                style={{ marginTop: 40 }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose()
                    dispatch(authAction.sessionLogout())
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
                }
export default MainHeader

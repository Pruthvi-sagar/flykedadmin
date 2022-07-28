import React from 'react'
import makeStyles from '@material-ui/core/makeStyles'
import { SnackbarContent } from 'notistack'
import { COLORS } from '../../constants/color'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
  },
  card: {
    width: '100%',
    padding: 12,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    fontWeight: 700,
    // fontFamily: 'Manrope',
    marginLeft: 10,
    fontSize: 12,
  },
  icon: {
    width: 20,
  },
}))

const getAlertBg = (variant) => {
  if (variant === 'success') {
    return COLORS.SUCCESS
  }
  if (variant === 'error') {
    return COLORS.ERROR
  }
}

const getAlertText = (variant) => {
  if (variant === 'success') {
    return COLORS.SUCCESS
  }
  if (variant === 'error') {
    return COLORS.ERROR
  }
}

// const getAlertIcon = (variant) => {
//   if (variant === 'success') {
//     return successIcon
//   }
//   if (variant === 'error') {
//     return errorIcon
//   }
// }

const SnackMessage = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { message, variant } = props
  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <div
        style={{ backgroundColor: getAlertBg(variant) }}
        className={classes.card}
      >
        {/* <img className={classes.icon} src={getAlertIcon(variant)} alt='icon' /> */}
        <div
          style={{ color: getAlertText(variant) }}
          className={classes.typography}
        >
          {message}
        </div>
      </div>
    </SnackbarContent>
  )
})

export default SnackMessage

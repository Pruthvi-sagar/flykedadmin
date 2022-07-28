import makeStyles from '@material-ui/core/styles/makeStyles'
import { COLORS } from '../constants/color'
export const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
  },
  formControl: {
    minWidth: 190,
  },

  select: {
    width: 190,
    borderRadius: '4px',
    // border: `1px solid ${COLORS.BORDER}`,
    color: COLORS.GRAY_BLACK,
    // paddingLeft: '5px',
    fontSize: '14px',
  },

  fields: {
    borderRadius: '4px',
    fontSize: '14px',
    color: COLORS.GRAY_BLACK,
    // border: `1px solid ${COLORS.BORDER}`,
    // paddingLeft: '5px',
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  image: {
    position: 'relative',
    width: '100px',
    height: '100px',
    cursor: 'pointer',
    borderRadius: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: theme.palette.common.white,
  },

  imageBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: '50%',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    borderRadius: '50%',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: '50%',
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    borderRadius: '50%',
    transition: theme.transitions.create('opacity'),
  },
  input: {
    display: 'none',
  },
  label: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: 8,
  },
}))

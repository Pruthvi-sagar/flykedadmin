import { COLORS } from '../../constants/color'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'


export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    // color: theme.palette.common.gray,
    fontSize: 12,
    padding: '4px 8px',
    color: COLORS.SECONDARY,
  },
  body: {
    fontSize: 14,
    padding: '6px 8px',
    color: COLORS.GRAY_BLACK,
    textTransform: 'none !important'
  },
}))(TableCell)

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: '15px',
  },
  table: {
    minWidth: 600,
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(22, 48, 72, 0.1)',
  },
}))

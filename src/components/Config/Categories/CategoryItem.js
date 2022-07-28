import React from 'react'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import { IMAGES } from '../../../assets'
import makeStyles from '@material-ui/styles/makeStyles'
import { COLORS } from '../../../constants/color'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  category: {
    display: 'flex',
    bgcolor: 'background.paper',
    alignItems: 'center',
    paddingBottom: '0px',
    paddingTop: '0px',
    borderLeft: `5px solid ${COLORS.WHITE}`,
  },
  subCategory: {
    display: 'flex',
    background: 'background.paper',
    alignItems: 'center',
    paddingBottom: '0px',
    paddingTop: '0px',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: COLORS.SECONDARY_GREY,
    borderLeft: `5px solid ${COLORS.PRIMARY}`,
    paddingBottom: '0px',
    paddingTop: '0px',
  },
  subSelect: {
    display: 'flex',
    backgroundColor: COLORS.SECONDARY_GREY,
    borderLeft: `0px solid ${COLORS.WHITE}`,
    paddingBottom: '0px',
    paddingTop: '0px',
  },
  iconContainer: {
    display: 'flex',
    width: '100px',
    justifyContent: 'space-around',
  },
  noDisplay: {
    display: 'none',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}))

function CategoryItem(props) {
  const classes = useStyles()

  const { selected, isMainCategory, item, onChange, index, onEdit } = props
  return (
    <Box key={index} style={{ width: '100%' }}>
      <Box
        p={1}
        className={
          isMainCategory
            ? selected?._id === item?._id
              ? classes.select
              : classes.category
            : selected?._id === item?._id
            ? classes.subSelect
            : classes.subCategory
        }
      >
        <Box p={1} style={{ paddingRight: 15 }}>
          <Avatar
            sx={{
              width: isMainCategory ? 58 : 32,
              height: isMainCategory ? 58 : 32,
            }}
            className={isMainCategory ? classes.large : classes.small}
            src={item?.image}
            variant={isMainCategory ? 'rounded' : 'round'}
          />
        </Box>
        <Box
          display='flex'
          alignItems='center'
          flexGrow={1}
          style={{
            borderBottom: `1px solid ${COLORS.BORDER}`,
            cursor: 'pointer',
            paddingBottom: 6,
            paddingTop: 6,
          }}
        >
          <Box flexGrow={1} onClick={() => onChange(item)}>
            <Typography
              variant='subtitle2'
              style={{
                fontSize: isMainCategory ? 18 : 14,
                fontWeight: '500',
              }}
            >
              {item?.title}
            </Typography>
            <Typography variant='caption'>
              {isMainCategory
                ? `${item?.subcategoryCount || 0} subcategories`
                : ''}
            </Typography>
          </Box>
          <Box p={1} className={classes.iconContainer}>
            <img src={IMAGES.EDIT_ICON} alt='edit icon' onClick={onEdit} />
            {isMainCategory ? (
              <img
                src={IMAGES.RIGHT_ARROW_PRIMARY}
                alt='right arrow'
                onClick={() => onChange(item)}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CategoryItem

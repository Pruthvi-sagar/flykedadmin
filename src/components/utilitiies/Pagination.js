import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select';
import _ from "lodash";
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles'
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'center',
  },
  select: {
    border: '1px solid',
  },
}))

export default function Pagination(props) {
  const classes = useStyles()
  const {
    totalResults,
    limit,
    currentPage,
    onClickPrevious,
    onClickNext,
    hasPrevPage,
    hasNextPage,
    switchPage,
    pagingCounter
  } = props
  const end = pagingCounter ? pagingCounter + limit - 1 : currentPage + limit - 1;
  let totalPages = Math.ceil(totalResults / limit);
  let pages = _.range(1, totalPages + 1);

  console.log('currentPage',currentPage)

  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flex: 1,
        height: 48,
      }}
    >
      <Grid className={classes.root}>
        <Typography>
          {totalResults === 0 ? 0 : pagingCounter ? pagingCounter : currentPage}-
          {end > totalResults ? totalResults : end} of {totalResults}
        </Typography>
        <IconButton
          onClick={onClickPrevious}
          disabled={!hasPrevPage}
          aria-label='previous'
        >
          <ChevronLeftOutlinedIcon />
        </IconButton>
        <IconButton
          disabled={!hasNextPage}
          onClick={onClickNext}
          aria-label='next'
        >
          <ChevronRightOutlinedIcon />
        </IconButton>
        {switchPage && <div style={{display: 'flex', alignItems: 'center', marginRight: 30}}>     <Select
          value={parseInt(currentPage)}
          onChange={(e) => switchPage(e?.target?.value)}
           MenuProps={{
      style: {
         maxHeight: 400,
            },
      }}
        >
           {pages &&
                  pages.map((page, index) => {
                    return (
                      <MenuItem key={index} value={parseInt(page)}>
                        {page}
                      </MenuItem>
                    );
                  })}
        </Select>
          <Typography>
            of {totalPages}
        </Typography></div>}
      </Grid>
    </Grid>
  )
}

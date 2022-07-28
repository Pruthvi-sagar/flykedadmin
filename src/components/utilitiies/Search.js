/* eslint-disable no-use-before-define */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: '100%',
    },
  },
}))

export default function Search(props) {
  const classes = useStyles()
  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        freeSolo
        className={classes.root}
        fullwidth
        // defaultValue={props?.options?.find((item) => {
        //   if(item._id === props.value) {
        //     return item.title
        //   }
        //   })}
        value={props.pageTitle}
        onChange={(event, value) => props.handlePageTitle(event, value)}
        options={props?.options?.map((option) => option.title)}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              // defaultValue={props?.options?.find((item) => {
              //   if(item._id === props.value) {
              //     return item.title
              //   }
              //   })}
              fullWidth
              margin='normal'
              variant='outlined'
              placeholder={props.placeholder}
              InputProps={{
                ...params.InputProps,
                value: props.term,
                onChange: props.handleTerm,
              }}
            />
          )
        }}
      />
    </div>
  )
}

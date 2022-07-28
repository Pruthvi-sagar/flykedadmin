/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  buttonProgress: {
    position: 'absolute',
  },
}));

const ButtonWithLoader = ({ ...props }) => {
  const classes = useStyles();
  return (
  <Button {...props}>
    {props.children}
    {props.loading ? <CircularProgress size={24} className={classes.buttonProgress} /> : ''}
  </Button>
  );
};
ButtonWithLoader.defaultProps = {
  loading: false,
};

ButtonWithLoader.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

export default ButtonWithLoader;

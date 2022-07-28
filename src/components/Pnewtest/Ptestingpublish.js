import React, { useState, useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch} from 'react-redux';
import moment from 'moment-mini';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'


import './post.css';
import ViewPublishedPost from '../utilitiies/ViewItemModal.js';
import ConfirmDialog from '../../elements/confirmModel';
import EditPublishedPost from './EditPublishedPost';
import * as postActions from '../../actions/postAction'
import { IMAGES } from '../../assets'
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import stringAvatar from '../../elements/stringAvatar';
import unCheckImage from '../../assets/checkbox/checkUn.svg';
import CheckBoxIcon from '../../assets/checkbox/checkbox.svg';
import { getPostTypeText } from '../../utils/common';
import { StyledTableRow, StyledTableCell } from '../utilitiies/StyledTable';
import viewEyeIcon from '../../assets/images/View.svg';
const useStyles = makeStyles(() => ({
    iconHover: {
      position: 'relative',
    },
}));
  import React from 'react'
  
  export const Testing1item = () => {
    return (
        <>
            
        </>
    )
  }
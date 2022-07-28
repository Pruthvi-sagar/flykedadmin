import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from '@material-ui/icons/Add';
import CategoryItem from './CategoryItem';
import { COLORS } from '../../../constants/color';

export default function CategoryList(props) {
  const {
    onAdd,
    isAdd,
    loader,
    data,
    onChange,
    selected,
    isCategory,
    title,
    onEdit,
  } = props;
  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        style={{ margin: '8px 20px', height: 45 }}
      >
        <Typography
          variant='subtitle2'
          style={{ color: COLORS.TEXT, fontWeight: 600, fontSize: '18px' }}
        >
          {title}
        </Typography>
        {isAdd ? (
          <Button
            onClick={onAdd}
            color='primary'
            style={{ textTransform: 'capitalize', fontSize: '18px' }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        ) : null}
      </Box>

      <Box
        style={{
          overflowY: 'scroll',
          height: '65vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loader ? (
          <CircularProgress size={32} color='primary' />
        ) : data.length >= 1 ? (
          data.map((item, index) => (
            <CategoryItem
              selected={selected}
              isMainCategory={isCategory}
              onChange={onChange}
              item={item}
              index={index}
              onEdit={() => onEdit(item)}
              key={item._id}
            />
          ))
        ) : (
          <Typography variant={'body1'}>No Subcategories Found</Typography>
        )}
      </Box>
    </Box>
  );
}

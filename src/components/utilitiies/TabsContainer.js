import React, { useState } from 'react';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import withStyles from '@material-ui/core/styles/withStyles'
import { useHistory, useLocation } from 'react-router';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { COLORS } from '../../constants/color';
import { IMAGES } from '../../assets';
import Filter from '../Filter';
import { useSelector } from 'react-redux';
import PublishedPostFilter from '../PublishedPostFilter';
import { Link } from 'react-router-dom';
import PostFilter from '../PostFilter';

const CustomTabs = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  indicator: {
    height: '2px',
    backgroundColor: COLORS.PRIMARY,
  },
})(Tabs);

const TabItem = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 120,
    fontSize: 16,
    color: COLORS.SUB_TEXT,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: COLORS.SECONDARY,
      opacity: 1,
    },
    '&$selected': {
      color: COLORS.PRIMARY,
      fontWeight: theme.typography.fontWeightBold,
    },
    '&:focus': {
      color: COLORS.PRIMARY,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8',
    width: '100%',
    display: 'flex',
    // marginBottom: 30,
  },
  padding: {
    padding: theme.spacing(3),
  },
  selectedTabClass: {
    fontWeight: '600 !important',
  },
}));

export default function TabsContainer(props) {
  const classes = useStyles();
  const history = useHistory();
  const filter = useSelector((state) => state.filter);
  const { selected, list, onChange } = props;

  // console.log('history', history.location?.state?.title);
  const [open, setOpen] = useState(false);
  const [publishedPostFilterOpen, setPublishedPostFilterOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  // const selectedPageName = useSelector((state) => state.page.selectedPageName);

  const handlePublishedPostFilterToggle = () => {
    setPublishedPostFilterOpen(!publishedPostFilterOpen);
  };

  const BtnColor = () => {
    if (history.location.pathname.includes('page/published')) {
      if (filter.published.isFilteredPublished) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else if (history.location.pathname.includes('page/pending')) {
      if (filter.pending.isFilteredPending) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else if (history.location.pathname.includes('posts/published')) {
      if (filter.postPublished.isFilteredPublishedPosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else if (history.location.pathname.includes('posts/pending')) {
      if (filter.postPublished.isFilteredPublishedPosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else if (history.location.pathname.includes('posts/unassigned')) {
      if (filter.postPublished.isFilteredPublishedPosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else if (history.location.pathname.includes('posts/archived')) {
      if (filter.postPublished.isFilteredPublishedPosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else if (history.location.pathname.includes('posts/didyouknow')) {
      if (filter.postPublished.isFilteredPublishedPosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    }  else if (history.location.pathname.includes('postList')) {
      if (filter.pagePosts.isFilteredPagePosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    }  else if (history.location.pathname.includes('stories')) {
      if (filter.postPublished.isFilteredPublishedPosts) {
        return COLORS.PRIMARY;
      } else {
        return COLORS.PRIMARY_GREY;
      }
    } else {
      return COLORS.PRIMARY_GREY;
    }
  };

  const PageFilterBtn = () => {
    return (
      <>
        <Button
          style={{
            fontSize: 16,
            marginTop: 5,
            textTransform: 'capitalize',
            padding: 8,
            color: BtnColor(),
            fontWeight: 500,
            marginRight: 16,
          }}
          startIcon={
            <img
              src={IMAGES.FILTER_ICON}
              alt='filter icon'
              style={{ marginBottom: 2, color: COLORS.PRIMARY }}
            />
          }
          onClick={handleOpen}
        >
          Filters
        </Button>
        {open && (
          <Filter open={open} handleClose={handleClose} type={selected} />
        )}
      </>
    );
  };

  const PostFilterBtn = () => {
    return (
      <>
        <Button
          style={{
            fontSize: 16,
            marginTop: 5,
            textTransform: 'capitalize',
            padding: 8,
            color: BtnColor(),
            fontWeight: 500,
            marginRight: 16,
          }}
          startIcon={
            <img
              src={IMAGES.FILTER_ICON}
              alt='filter icon'
              style={{ marginBottom: 2, color: COLORS.PRIMARY }}
              width={20}
              height={13}
            />
          }
          onClick={handlePublishedPostFilterToggle}
        >
          Filters
        </Button>
        {publishedPostFilterOpen && (
          <PublishedPostFilter
            open={publishedPostFilterOpen}
            handleClose={handlePublishedPostFilterToggle}
            type={selected}
          />
        )}
      </>
    );
  };

  const PagePostsFilterBtn = () => {
    return (
      <>
        <Button
          style={{
            fontSize: 16,
            marginTop: 5,
            textTransform: 'capitalize',
            padding: 8,
            color: BtnColor(),
            fontWeight: 500,
            marginRight: 16,
          }}
          startIcon={
            <img
              src={IMAGES.FILTER_ICON}
              alt='filter icon'
              style={{ marginBottom: 2, color: COLORS.PRIMARY }}
            />
          }
          onClick={handlePublishedPostFilterToggle}
        >
          Filters
        </Button>
        {publishedPostFilterOpen && (
          <PostFilter
            open={publishedPostFilterOpen}
            handleClose={handlePublishedPostFilterToggle}
            type={selected}
          />
        )}
      </>
    );
  };

  const breadcrumbs = [
    <Link
      key='1'
      to='/admin/page/published'
      style={{ textDecoration: 'none', color: '#EF613B', fontSize: '16px' }}
    >
      Pages
    </Link>,
    <Typography key='2' style={{ fontSize: '16px' }}>
      {history.location?.state?.title}
    </Typography>,
    <Typography key='3' color='textPrimary' style={{ fontSize: '16px' }}>
      Posts
    </Typography>,
  ];

  return (
    <Box style={{ width: '100%' }}>
      {location.pathname.split('/')[2] === 'page' &&
      location.pathname.split('/')[4] === 'postList' ? (
        <Box style={{ border: 'none' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize='small' />}
              aria-label='breadcrumb'
            >
              {breadcrumbs}
            </Breadcrumbs>
            <Box
              style={{
                height: '100%',
              }}
            >
              <div className='pagePostsFilterClass'>
                <PagePostsFilterBtn />
              </div>
            </Box>
          </div>
        </Box>
      ) : (
        <Box className={classes.root} style={{ width: '100%' }}>
          <CustomTabs value={selected} onChange={onChange}>
            {list &&
              list.map((item) => {
                return (
                  <TabItem
                    label={item?.name}
                    className={classes.selectedTabClass}
                    key={item.key}
                  />
                );
              })}
          </CustomTabs>
          <Box
            style={{
              height: '100%',
            }}
          >
            {history.location.pathname === '/admin/page/published' ? (
              <PageFilterBtn />
            ) : history.location.pathname === '/admin/page/pending' ? (
              <PageFilterBtn />
            ) : history.location.pathname === '/admin/posts/published' ? (
              <PostFilterBtn />
            ) : history.location.pathname === '/admin/posts/pending' ? (
              <PostFilterBtn />
            ) : history.location.pathname === '/admin/posts/unassigned' ? (
               <PostFilterBtn /> 
            ) : history.location.pathname === '/admin/posts/archived' ? (
               <PostFilterBtn /> 
            ) :  history.location.pathname === '/admin/posts/didyouknow' ? (
               <PostFilterBtn /> 
            ) : history.location.pathname === '/admin/stories/pending' ? (
               <PostFilterBtn /> 
            ) : history.location.pathname === '/admin/stories/published' ? (
               <PostFilterBtn /> 
            ) : history.location.pathname === '/admin/stories/unassigned' ? (
               <PostFilterBtn /> 
            ): null}
          </Box>
        </Box>
      )}
    </Box>
  );
}

import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router'
import Box from '@material-ui/core/Box'
import { useDispatch } from 'react-redux';
import Loader from '../../components/utilitiies/Loader'
import TabsContainer from '../../components/utilitiies/TabsContainer'
import { PENDING_POST_LIST, SELECTED_PENDING_POSTS, CURRENT_PAGE_NUMBER, UNASSIGNED_POST_LIST } from '../../actions/types';
import { PUBLISHED_POSTS_FILTER } from '../../actions/filterAction';

const PendingPosts = lazy(() => import("../../containers/posts/PendingPosts"));
const PublishedPosts = lazy(() => import("../../containers/posts/PublishedPosts"));
const UnassignedPosts = lazy(() => import("../../containers/posts/UnassignedPosts"));
const ArchivedPosts = lazy(() => import("../../containers/posts/ArchivedPosts"));
const DidYouKnowPosts = lazy(() => import("../../containers/posts/DidYouKnowPosts"));

const menuItems = [
    {
        key: 0,
        name: 'Published Posts',
        path: '/published'
    },
    {
        key: 1,
        name: 'Pending Posts',
        path: '/pending'
    },
    {
        key: 2,
        name: 'Unassigned Posts',
        path: '/unassigned'
    },
     {
        key: 3,
        name: 'Archived Posts',
        path: '/archived'
    },
    //  {
    //     key: 4,
    //     name: 'Did you know Posts',
    //     path: '/didyouknow'
    // }
]
export default function PostRoutes() {
    const { path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(1);
    const dispatch = useDispatch();


    const handleChange = (event, newValue) => {
        history.push(`${path}${menuItems[newValue]?.path}`)
        setSelectedTab(newValue);
        dispatch({ type: CURRENT_PAGE_NUMBER, payload: 1 });
        dispatch({ type: PUBLISHED_POSTS_FILTER, payload: {
          date: {
            startDate: null,
            endDate: null,
          },
          contributor: null,
          postType: null,
          page: null,
        } });
        dispatch({ type: PENDING_POST_LIST, payload: [] });
        dispatch({ type: SELECTED_PENDING_POSTS, payload: [] });
        dispatch({ type: CURRENT_PAGE_NUMBER, payload: 1 });
        dispatch({ type: UNASSIGNED_POST_LIST, payload: [] });
    };

    useEffect(() => {
        if(location?.pathname === '/admin/posts/published') {
            setSelectedTab(0);
        } else if(location?.pathname === '/admin/posts/pending') {
            setSelectedTab(1);
        } else if(location?.pathname === '/admin/posts/unassigned') {
            setSelectedTab(2);
        } else if(location?.pathname === '/admin/posts/archived') {
            setSelectedTab(3);
        }
        else if(location?.pathname === '/admin/posts/didyouknow') {
            setSelectedTab(4);
        }
    },[location]);


    return (
        <Box style={{ width:'80%', maxWidth:'1150px' }}>
      <TabsContainer
        list={menuItems}
        selected={selectedTab}
        onChange={handleChange}
      />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={`${path}/published`} component={PublishedPosts} />
                    <Route path={`${path}/pending`} component={PendingPosts} />
                    <Route path={`${path}/unassigned`} component={UnassignedPosts} />
                    <Route path={`${path}/archived`} component={ArchivedPosts} />
                    <Route path={`${path}/didyouknow`} component={DidYouKnowPosts} />
                </Switch>
            </Suspense>
        </Box >
    )
}

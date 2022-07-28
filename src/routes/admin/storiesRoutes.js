import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router'
import Box from '@material-ui/core/Box'
import { useDispatch } from 'react-redux';
import Loader from '../../components/utilitiies/Loader'
import TabsContainer from '../../components/utilitiies/TabsContainer'
import { PENDING_POST_LIST, SELECTED_PENDING_POSTS, CURRENT_PAGE_NUMBER, UNASSIGNED_POST_LIST } from '../../actions/types';
import { PUBLISHED_POSTS_FILTER } from '../../actions/filterAction';

const PendingPosts = lazy(() => import("../../containers/stories/PendingPosts"));
const PublishedPosts = lazy(() => import("../../containers/stories/PublishedPosts"));
const UnassignedPosts = lazy(() => import("../../containers/stories/UnassignedPosts"));
const LongReadPosts = lazy(() => import("../../containers/stories/LongReads"));


const menuItems = [
    {
        key: 0,
        name: 'Published Stories',
        path: '/published'
    },
    {
        key: 1,
        name: 'Pending Stories',
        path: '/pending'
    },
    {
        key: 2,
        name: 'Unassigned Stories',
        path: '/unassigned'
    },
     {
        key: 4,
        name: 'Long Reads',
        path: '/longreads'
    }
]
export default function StoriesRoutes() {
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
        if(location?.pathname === '/admin/stories/published') {
            setSelectedTab(0);
        } else if(location?.pathname === '/admin/stories/pending') {
            setSelectedTab(1);
        } else if(location?.pathname === '/admin/stories/unassigned') {
            setSelectedTab(2);
        }  else if(location?.pathname === '/admin/stories/longreads') {
            setSelectedTab(3);
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
                      <Route path={`${path}/longreads`} component={LongReadPosts} />
                </Switch>
            </Suspense>
        </Box >
    )
}

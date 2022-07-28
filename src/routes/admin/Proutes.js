import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch, useLocation } from 'react-router'
import Box from '@material-ui/core/Box'

import Loader from '../../components/utilitiies/Loader'
import TabsContainer from '../../components/utilitiies/TabsContainer'



const Testing1 = lazy(() => import("../../containers/Pnewtest/Ptest"));


const menuItems = [
    {
        key: 0, 
        name: 'publish',
        path: '/testing1'
    },
  
]
export default function PostRoutes() {
    const { path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(1);



    

    useEffect(() => {
        if(location?.pathname === '/admin/test/testing1') {
            setSelectedTab(0);
        } else if(location?.pathname === '/admin/test/testing2') {
            setSelectedTab(1);
        } else if(location?.pathname === '/admin/test/testing3') {
            setSelectedTab(2);
        } 
    },[location]);

    const handleChange = (event, newValue) => {  
        console.log(newValue);   
        console.log((menuItems[newValue].path));
        history.push(`${path}${menuItems[newValue]?.path}`)
        setSelectedTab(newValue);
    }


    return (
        <Box style={{ width:'80%', maxWidth:'1150px' }}>
      <TabsContainer
        list={menuItems}
        selected={selectedTab}
        onChange={handleChange}
      />
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={`${path}/testing1`} component={Testing1} />
                                       
                </Switch>
            </Suspense>
        
        </Box>
    )
}
import React, { lazy, Suspense, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import Loader from '../../components/utilitiies/Loader'
import MainContainer from '../../components/utilitiies/MainContainer'
import TabsContainer from '../../components/utilitiies/TabsContainer'

const Config = lazy(() => import('../../containers/config'))

const menuItems = [
    {
        key: 0,
        name: 'Categories',
        path: ''
    },
]
export default function ConfigRoutes() {
    const { path } = useRouteMatch();
    const [selectedTab, setSelectedTab] = useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }
    return (
        <MainContainer
            header={
                <TabsContainer
                    list={menuItems}
                    selected={selectedTab}
                    onChange={handleChange}
                />
            }
        >
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path={`${path}`} component={Config} />
                </Switch>
            </Suspense>
        </MainContainer>
    )
}

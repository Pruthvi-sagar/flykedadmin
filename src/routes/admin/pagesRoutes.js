import Box from '@material-ui/core/Box'
import React, { lazy, Suspense, useState } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import { useParams } from 'react-router-dom';
import Loader from '../../components/utilitiies/Loader'
import TabsContainer from '../../components/utilitiies/TabsContainer'

const PendingPages = lazy(() => import('../../containers/pages/PendingPages'))
const PublishedPagePosts = lazy(() => import('../../containers/pages/PublishedPagePosts'))
const PublishedPages = lazy(() =>
  import('../../containers/pages/PublishedPages')
)

const menuItems = [
  {
    key: 0,
    name: 'Published Pages',
    path: '/published',
  },
  {
    key: 1,
    name: 'Pending Pages',
    path: '/pending',
  },
]
export default function PagesRoutes() {
  const { path } = useRouteMatch()
  const history = useHistory()

  const lastPath = history.location.pathname.substring(
    history.location.pathname.lastIndexOf('/') + 1
  )
  const defaultTab =
    menuItems.find((item) => item?.path?.includes(lastPath))?.key || 0
  const [selectedTab, setSelectedTab] = useState(defaultTab)
  const handleChange = (event, newValue) => {
    history.push(`${path}${menuItems[newValue]?.path}`)
    setSelectedTab(newValue)
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
          <Route path={`${path}/published`} exact component={PublishedPages} />
          <Route path={`${path}/pending`} exact component={PendingPages} />
          <Route path={`${path}/:id/postList`} component={PublishedPagePosts} />
        </Switch>
      </Suspense>
    </Box>
  )
}

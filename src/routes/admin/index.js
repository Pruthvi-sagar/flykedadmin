import React, { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from 'react-router';
import Loader from "../../components/utilitiies/Loader";
import MainLayout from '../../layouts/mainLayout';



const Posts = lazy(() => import("./postRoutes"));
const Stories = lazy(() => import("./storiesRoutes"));
const Page = lazy(() => import("./pagesRoutes"));
const Config = lazy(() => import("./configRoutes"));
const Test = lazy(()=> import("./Proutes"))
export default function AdminRoutes() {
    const { path } = useRouteMatch();
    return (
        <MainLayout>
            <Suspense fallback={<Loader />}>

                <Switch>
                    <Route path={`${path}/posts`} component={Posts} />
                    <Route path={`${path}/stories`} component={Stories} />
                    <Route path={`${path}/page`} component={Page} />
                    <Route path={`${path}/config`} component={Config} />
                    <Route path={`${path}/test`} component={Test}/>
                </Switch>
            </Suspense>

        </MainLayout>
    )
}

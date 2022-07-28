import { createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import ProtectedRoute from './components/utilitiies/ProtectedRoute'
import ThemeConfig from './config/theme'
import AdminRoutes from './routes/admin'
import AuthRoutes from './routes/authRoutes'
import store from './store'
import AlertNotificationProvider from './elements/alert-notfication/alertState';

const flykedTheme = createTheme(ThemeConfig)

ReactGA.initialize('UA-217060050-1');

const ProviderConfig = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (<ThemeProvider theme={flykedTheme}>
    <Router basename={process.env.PUBLIC_URL}>
      {!isLoggedIn ? (
        <Route path="/" component={AuthRoutes} />
      ) : (
        <ProtectedRoute path="/admin" component={AdminRoutes} />
      )}
      {isLoggedIn &&
        (path === process.env.PUBLIC_URL ||
          path === `${process.env.PUBLIC_URL}/` ||
          path === `${process.env.PUBLIC_URL}/admin` || path === `${process.env.PUBLIC_URL}/admin/posts`) && (
          <Redirect to="/admin/posts/published" />
        )}
    </Router>
  </ThemeProvider>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AlertNotificationProvider>
        <ProviderConfig />
      </AlertNotificationProvider>
    </Provider>
  )
}

export default App

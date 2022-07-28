import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactGA from 'react-ga';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as authAction from '../actions/authAction'
import { IMAGES } from '../assets'
import MainLayout from '../layouts/mainLayout'

const useStyles = makeStyles((theme) => ({
  loginSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },

  imgContainer: {
    textAlign: 'center',
    paddingTop: '30px',
    paddingBottom: '25px',
  },

  // .imgContainer img {
  //   display: inline-block;
  //   padding-bottom: 15px;
  // },

  login: {
    backgroundColor: 'white',
    boxShadow:
      '0px 2px 2px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(22, 48, 72, 0.1)',
    borderRadius: '20px',
    width: '500px',
    height: '500px',
    padding: '20px',
  },

  loginFormDiv: {
    display: 'flex',
    padding: '10px 20px',
    margin: '0 auto',
    marginTop: '30px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: '20px',
  },

  error: {
    height: '10px',
  },
  button: {
    width: '100%',
    height: 42,
    marginTop: 10,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
}))
const styles = {
  image: {
    width: 88,
    height: 22,
  },
}

export default function Login() {

  const [pageLoader, setPageLoader] = useState(false)
  
  const classes = useStyles()
  const dispatch = useDispatch()
  const message = useSelector((alert) => alert.common.alertMessage)
  const history = useHistory()

     useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


  const [state, setState] = useState({
    email: '',
    password: '',
  })

  const handleChange = (key) => (e) => {
    setState({ ...state, [key]: e.target.value })
  }


  const handleLogin = () => {
    setPageLoader(true);
    dispatch(
      authAction.login(
        state.email, 
        state.password, 
        () => history.push('/admin/posts/pending'),
        () => setPageLoader(false),
      )
    )

  }
  
  return (
    <MainLayout>
      <Box className={classes.loginSection}>
        <Box className={classes.login}>
          <Box className={classes.imgContainer}>
            <img
              src={IMAGES.FLYKED_LOGO}
              style={styles.image}
              alt='flyked-logo'
            />
            <Typography align='center' gutterBottom>
              Life is all about interesting bits
            </Typography>
          </Box>

          <Typography variant='subtitle2' align='center'>
            Admin Login
          </Typography>
          
          <Box style={{ height: 10 }}>
            {
              pageLoader ?
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '6 rem',
                }}
              >
                <CircularProgress />
              </div> : 
                message && (
                  <Typography align='center' style={{ color: 'red' }}>
                    {message}
                  </Typography>
                )
            }
          </Box>
            

          <Box className={classes.loginFormDiv}>
            <TextField
              value={state.email}
              onChange={handleChange('email')}
              placeholder='Email'
              name='email'
              type='email'
              variant='outlined'
              fullWidth
              className={classes.input}
            />
            <TextField
              value={state.password}
              onChange={handleChange('password')}
              placeholder='password'
              name='password'
              type='password'
              variant='outlined'
              fullWidth
              className={classes.input}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleLogin}
              className={classes.button}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

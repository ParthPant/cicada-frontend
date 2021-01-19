import * as React from 'react';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useDispatch} from 'react-redux'
import axiosInstance from '../../axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Cicada
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface SignInData {
    email? :String
    password? :String
}

export default function SignIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory()
  const [signInData, setSignInData] = React.useState<SignInData | undefined>(undefined);

  const handleEmailChange = (e :React.ChangeEvent<HTMLInputElement>) =>{
      setSignInData({...signInData, email: e.target.value});
  }

  const handelPwChange = (e :React.ChangeEvent<HTMLInputElement>) =>{
      setSignInData({...signInData, password: e.target.value});
  }

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        axiosInstance.post(
            'api/token/',
            signInData
        ).then(res=>{
            if (res.status === 200) {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] = 'JWT '+res.data.access;
            }
            history.push("/");
            dispatch({type: 'auth/login', payload: signInData});
        }).catch(e => {
            console.log('error loggin in')
            console.error(e)
        })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            placeholder="user@example.com"
            autoComplete="email"
            onChange = {handleEmailChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange = {handelPwChange}
            autoComplete="current-password"
          />
        {/*
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
             <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
} 

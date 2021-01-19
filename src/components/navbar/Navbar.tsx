import * as React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
import NotesIcon from '@material-ui/icons/Notes';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux'
import axiosInstance from '../../axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const authSelector = (state :any) => state.auth.loggedIn;

export default function MenuAppBar() {
  const classes = useStyles();
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    axiosInstance.post('/users/logout/', 
                       {refresh_token: localStorage.getItem('refresh_token')})
                .then(()=>{
                   localStorage.removeItem('refresh_token');
                   localStorage.removeItem('access_token');
                   dispatch({type:'auth/logout'});
                }).catch(e=>console.error(e));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} component={Link} to='/'>
            Cicada
          </Typography>
          {auth && (
            <div>
              <IconButton
                  aria-label="Quizes"
                  aria-controls="menu-appbar"
                  color="inherit"
                  component = {Link}
                  to = '/list'
              >
                  <NotesIcon />
              </IconButton>
              <IconButton
                  aria-label="Leaderboard"
                  aria-controls="menu-appbar"
                  color="inherit"
              >
                  <BarChartIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        {!auth && (
            <Button component={Link} to={'/login'} variant="contained" color="secondary" aria-labe="Login">
                    Login
            </Button>
        )}
        </Toolbar>
      </AppBar>
    </div>
  );
}


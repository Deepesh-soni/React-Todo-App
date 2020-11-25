import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './Header.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Todo App
          </Typography>
          <Link to="/Add" className="nav-buttons"><Button color="inherit">Add</Button></Link>
          <Link to="/Search" className="nav-buttons"><Button color="inherit">Search</Button></Link>
          <Link to="/Home" className="nav-buttons"><Button color="inherit">Priority Tasks</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
} 

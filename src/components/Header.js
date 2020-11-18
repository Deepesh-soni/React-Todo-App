import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

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
  
  var bgColors = { "Default": "#81b71a",
                      "Blue": "#00B1E1",
                      "Cyan": "#37BC9B",
                      "Green": "#8CC152",
                      "Red": "#E9573F",
                      "Yellow": "#F6BB42",
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Todo App
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit"><Link to="/Search">Search</Link></Button>
          <Link to="/Add" className="nav-buttons">Add</Link>
          <Link to="/Home"><Button color="inherit">Priority Tasks</Button></Link>
          {/* <Link to="/Home"><Button color="inherit" style={backgroundColor={bgColors.Blue}}>Home</Button></Link> */}
        </Toolbar>
      </AppBar>
    </div>
  );
} 

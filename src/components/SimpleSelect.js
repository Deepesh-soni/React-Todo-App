import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const setStatus=props.setStatus;
  const updateStatus=props.updateStatus;

  const handleChange = (event) => {
    setStatus(event.target.value);
    if(props.updateStatus){
      updateStatus(event.target.value);
    }
  };

  return (
    <div>

      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Task Status</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={props.status}
          onChange={handleChange}
        >
          <MenuItem value={"Completed"} >Completed</MenuItem>
          <MenuItem value={"Under Progress"} >Under Progress</MenuItem>
          <MenuItem value={"Failed"}>Failed</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

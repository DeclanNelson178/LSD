import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'

import { connect } from 'react-redux'
import { addSem, remSem, sellThread} from '../redux/actions/index'

// Generate Order Data
function createData(id, name, credits) {
  return { id, name, credits };
}

const rows = [
  createData('CS 1301', 'Intro to Computing', 3),
  createData('ENGL 1101', 'English I', 3),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const threads = [
  "Theory",
  "Intelligence",
  "System Architecture",
  "Devices",
  "People",
  "Media",
  "Models and Simulations",
  "Infonetworks"
]

const mapStateToProps = state => {
  return { sems: state.sems }
}

const mapDispatchToProps = dispatch => {
  return {
    addSem: () => dispatch(addSem()),
    remSem: () => dispatch(remSem()),
    selThread: (threads) => dispatch(sellThread())
  }
}

const ConnectedSemesterControls = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState([])
  const threadClicked = () => {
    console.log('Thread clicked')
    setValues(['test'])
  }
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="threads-simple">Threads</InputLabel>
        <Select onChange={threadClicked} id="threads-multi" multiple input={<Input />} value={values}>
          {threads.map(thread => (
            <MenuItem key={thread} value={thread}>
              {thread}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button color="primary" variant="contained" onClick={props.addSem}>Add Semester</Button>
      <Button color="secondary" variant="contained" onClick={props.remSem}>Remove Semester</Button>
          <h3>Number of Semesters: {props.sems.length} </h3>
    </React.Fragment>
  );
}

const SemesterControls = connect(mapStateToProps, mapDispatchToProps)(ConnectedSemesterControls)

export default SemesterControls
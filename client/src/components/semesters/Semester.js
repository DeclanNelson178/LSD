 
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../Title';
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import { connect } from 'react-redux'
import { selSem, remCourse } from '../../redux/actions/index'

function mapStateToProps(state) {
  return { sel: state.selSem, sems: state.sems }
}

function mapDispatchtoProps(dispatch) {
  return {
    selSem: num => dispatch(selSem(num)),
    remCourse: course => dispatch(remCourse(course))
  }
}

// Generate Order Data
function createData(id, name, credits) {
  return { id, name, credits };
}

// const rows = [];
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


const ConnectedSemester = (props) => {
  const [del, setDelete] = useState(false)

  const onCheck = (c) => {
    props.selSem(props.num)
  }

  var rows = []
  if (props.sems[props.num-1].courses.length > 0) {
    rows = props.sems[props.num-1].courses.map(course => createData(course.id, course.name, course.credits))
  }

  const delClick = (c) => {
    console.log(delClick)
    const course = props.sems[props.num-1].courses.find(val => val.id === c.id)
    console.log(course)
    props.remCourse({course: course, num: props.num})
  }


  const classes = useStyles();
  return (
    <React.Fragment>
      <Title><Radio onChange={onCheck} checked={props.sel === props.num}/>Semester #{props.num}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>Remove?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.credits}</TableCell>
              <TableCell><Button onClick={(e) => delClick(row)}>X</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
      </div>
    </React.Fragment>
  );
}

const Semester = connect(mapStateToProps, mapDispatchtoProps)(ConnectedSemester)
export default Semester
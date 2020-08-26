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
import { selSem, remTakenPrev } from '../../redux/actions/index'

const mapStateToProps = (state) => {
  return { sel: state.selSem, prevTaken: state.prevTaken }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    selSem: num => dispatch(selSem(num)),
    remTakenPrev: c => dispatch(remTakenPrev(c))
  }
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
}));

const ConnectedTaken = (props) => {
  const classes = useStyles()
  
  const onCheck = (c) => {
    props.selSem(props.num)
  }
  const remCourse = (c) => {
    console.log('Removing course')
    props.remTakenPrev(c)
  }

  return(
    <React.Fragment>
      <Title><Radio checked={props.sel === props.num} onChange={onCheck}/>Previously Taken Courses</Title>
      Enter courses you previously have taken or have credit for.
      {props.prevTaken.map(c => {
        return (<Button onClick={(e) => remCourse(c)}>{c.id}</Button>)
      })}
    </React.Fragment>
  )
}

const Taken = connect(mapStateToProps, mapDispatchToProps)(ConnectedTaken)
export default Taken
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { List, Divider, ListSubheader } from '@material-ui/core';
import { addCourse, addTakenPrev } from '../redux/actions/index'

const mapStateToProps = state => {
  return { avail: state.avail, taken: state.taken, res: state.res, courses: state.courses, sel: state.selSem }
}

const mapDispatchToProps = dispatch => {
  return {
    addCourse: course => dispatch(addCourse(course)),
    addTakenPrev: c => dispatch(addTakenPrev(c))
  }
}

const ConnectedCourseList = ({ avail, taken, res, courses, addCourse, sel, addTakenPrev }) => {

  const courseClick = (c) => {
    if (sel === 0) {
      console.log('Trying to add a course to taken dump')
      addTakenPrev(c)
    } else {
      addCourse(c)
    }
  }

  const alphaSort = (a, b) => {
    return a.id.localeCompare(b.id)
  }

  return (
    <React.Fragment>
      <List>
        {courses.map(section => {
          return (<>
            <Divider></Divider>
            <ListSubheader>{section.name}</ListSubheader>
            {section.courses.map(c => {
              if (res.some(course => course.id === c.split('/')[0])) {
                return <ListItem key={c}><ListItemText primary={c} style={{"color":"red"}}></ListItemText></ListItem>
              } else if (taken.some(course => course.id === c.split('/')[0])) {
                return <ListItem key={c}><ListItemText primary={c} style={{"color":"grey"}}></ListItemText></ListItem>
              } else {
                return <ListItem key={c} onClick={(e) =>courseClick(c)} button><ListItemText primary={c}></ListItemText></ListItem>
              }
            })}
            </>)
        })}
      </List>
    </React.Fragment>
  )
}

const CourseList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCourseList)

export default CourseList

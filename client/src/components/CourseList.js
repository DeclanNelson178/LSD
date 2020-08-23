import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { List, Divider, ListSubheader } from '@material-ui/core';
import { addCourse } from '../redux/actions/index'

const mapStateToProps = state => {
  return { avail: state.avail, taken: state.taken, res: state.res }
}

const mapDispatchToProps = dispatch => {
  return {
    addCourse: course => dispatch(addCourse(course))
  }
}

const ConnectedCourseList = ({ avail, taken, res, addCourse }) => {

  const courseClick = (c) => {
    addCourse(c)
  }

  const alphaSort = (a, b) => {
    return a.id.localeCompare(b.id)
  }

  return (
    <React.Fragment>
      <List>
        <ListSubheader>Available Courses</ListSubheader>
        {avail.sort(alphaSort).map(c => {
          if (c.multi.length === 0) {
            return <ListItem key={c.id} onClick={(e) => courseClick(c, e)} button><ListItemText primary={c.id.toUpperCase() + ': '  + c.name} /></ListItem>
          } else {
            return (<ListItem button><ListItemText primary={'Multi Course Option'} />
            </ListItem>)
          }
        })}
        <Divider></Divider>
        <ListSubheader>Restricted</ListSubheader>
        {res.sort(alphaSort).map(c => {  
          return <ListItem key={c.id}><ListItemText primary={c.id.toUpperCase() + ': '  + c.name} style={{"color":"grey"}}/></ListItem>
        })}
        <Divider></Divider>
        <ListSubheader>Taken</ListSubheader>
        {taken.sort(alphaSort).map(c => {
          return <ListItem key={c.id}><ListItemText primary={c.id.toUpperCase() + ': '  + c.name} style={{"color":"grey"}}/></ListItem>
        })}
      </List>
    </React.Fragment>
  )
}

const CourseList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCourseList)

export default CourseList

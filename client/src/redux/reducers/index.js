import { ADD_SEM, REM_SEM, SEL_SEM, SEL_THREAD, ADD_COURSE, REM_COURSE } from '../constants/action-type'
import courseData from '../../courses.json'
import { AccordionActions } from '@material-ui/core'
import { resSort } from '../../helper/restrictedSort'

const initAvail = resSort(courseData.courses, [], [])
console.log(initAvail)



const initialState = {
  sems: [{
    courses: []
  }],
  avail: initAvail.avail,
  taken: [],
  res: initAvail.res,
  selSem: 1,
  threads: ''
}

function rootReducer(state = initialState, action) {
  if (action.type === ADD_SEM) {
    return Object.assign({}, state, {
      sems: state.sems.concat([{courses: []}])
    })
  }

  if (action.type === REM_SEM) {

    if (state.sems.length > 0) {
      return Object.assign({}, state, {
        sems: state.sems.slice(0, state.sems.length - 1)
      })
    } else {
      return state
    }
  }

  if (action.type === SEL_SEM) {
    console.log('sel_sem triggered')
    console.log(action.payl)
    return {
      ...state,
      selSem: action.payload
    }
  }

  if (action.type === SEL_THREAD) {
    return {
      ...state,
      threads: action.payload
    }
  }

  if (action.type === ADD_COURSE) {
    // remove course from avail
    var newAvail = [...state.avail]
    var index = newAvail.findIndex(c => c.id === action.payload.id)
    if (index != -1) {
      newAvail.splice(index, 1)
    }

    // add course to taken
    const newTaken = [...state.taken]
    newTaken.push(action.payload)

    // add course to semester
    const cpSems = [...state.sems]
    cpSems[state.selSem-1].courses.push(action.payload)
    const ret = resSort(newAvail, [...state.res], newTaken)
    return {
      ...state,
      avail: ret.avail,
      res: ret.res,
      taken: newTaken,
      sems: cpSems
    }
  }

  if (action.type === REM_COURSE) {
    // remove from semester
    const tempSems = [...state.sems]
    var index = tempSems[action.payload.num-1].courses.findIndex(c => c.id === action.payload.course.id)
    tempSems[action.payload.num-1].courses.splice(index, 1)
    console.log(tempSems)

    // remove from taken
    const newTaken = [...state.taken]
    index = newTaken.findIndex(c => c.id === action.payload.course.id)
    newTaken.splice(index, 1)
    console.log(newTaken)

    // add to avail
    const newAvail = [...state.avail]
    newAvail.push(action.payload.course)

    const ret = resSort(newAvail, [...state.res], newTaken)

    return {
      ...state,
      avail: ret.avail,
      taken: newTaken,
      res: ret.res,
      sems: tempSems
    }

  }

  return state
}

export default rootReducer
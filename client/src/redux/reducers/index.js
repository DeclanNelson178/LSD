import { ADD_SEM, REM_SEM, SEL_SEM, SEL_THREAD, ADD_COURSE, REM_COURSE, ADD_PREV, REM_PREV } from '../constants/action-type'
import {courses} from '../../course_data/theory_intel_map.json'
import {totalCourses} from '../../course_data/total_courses.json'
import { resSort } from '../../helper/restrictedSort'
import { initCourses } from '../../helper/initialCourses'

const ret = initCourses(courses, totalCourses)

const initialState = {
  sems: [{
    courses: []
  }],
  avail: ret[0],
  taken: [],
  res: ret[1],
  courses: courses,
  selSem: 0,
  threads: '',
  prevTaken: []
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
    // course is given as just an id
    const id = action.payload.split('/')[0]
    const course = totalCourses.find(course => course.id === id)

    // add course to taken
    const newTaken = [...state.taken]
    newTaken.push(course)

    // add course to semester
    const cpSems = [...state.sems]
    cpSems[state.selSem-1].courses.push(course)
    const ret = resSort(newTaken, [...state.courses], totalCourses)
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

    const ret = resSort(newTaken, [...state.courses], totalCourses)

    return {
      ...state,
      avail: ret.avail,
      taken: newTaken,
      res: ret.res,
      sems: tempSems
    }
  }

  if (action.type === ADD_PREV) {
    // given course id
    const id = action.payload.split('/')[0]
    const course = totalCourses.find(c => c.id === id)
    console.log(course)

    // add to taken
    const newTaken = [...state.taken]
    newTaken.push(course)
    // add to taken previously taken
    const prevTaken = [...state.prevTaken]
    prevTaken.push(course)

    const ret = resSort(newTaken, [...state.courses], totalCourses)

    return {
      ...state,
      taken: newTaken,
      prevTaken: prevTaken,
      avail: ret.avail,
      res: ret.res
    }
  }

  if (action.type === REM_PREV) {
    // given course id
    const course = action.payload
    // remove from taken
    const newTaken = [...state.taken]
    var i = newTaken.findIndex(c => c.id === course.id)
    newTaken.splice(i, 1)

    // remove from prevTaken
    const newPrev = [...state.prevTaken]
    i = newPrev.findIndex(c => c.id === course.id)
    newPrev.splice(i, 1)

    const ret = resSort(newTaken, [...state.courses], totalCourses)

    return {
      ...state,
      taken: newTaken,
      prevTaken: newPrev,
      avail: ret.avail,
      res: ret.res
    }
  }

  return state
}

export default rootReducer
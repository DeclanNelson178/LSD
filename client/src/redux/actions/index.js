import { ADD_SEM, REM_SEM, SEL_SEM, SEL_THREAD, ADD_COURSE, REM_COURSE, ADD_PREV, REM_PREV} from '../constants/action-type'

export function addSem(payload) {
  return { type: ADD_SEM }
}

export function remSem(payload) {
  return { type: REM_SEM }
}

export function selSem(payload) {
  return { type: SEL_SEM, payload: payload }
}

export function sellThread(payload) {
  return { type: SEL_THREAD, payload: payload }
}

export function addCourse(payload) {
  return { type: ADD_COURSE, payload: payload }
}

export function remCourse(payload) {
  return { type: REM_COURSE, payload: payload }
}

export function addTakenPrev(payload) {
  return { type: ADD_PREV, payload: payload }
}

export function remTakenPrev(payload) {
  return { type: REM_PREV, payload: payload }
}
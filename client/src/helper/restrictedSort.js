export function resSort(taken, courses, totalCourses) {
  const avail = []
  const res = []
  courses.forEach(sec => {
    sec.courses.forEach(c => {
      c = c.split('/')[0]
      c = totalCourses.find(course => course.id === c)
      console.log(c)
      if (checkPrereqs(c.prereqs, taken)) {
        avail.push(c)
      } else {
        res.push(c)
      }
    })
  })

  return { avail, res }

  // return avail and res as an object
}

const checkPrereqs = (prereqs, taken) => {
  if (prereqs.length === 0) {
    return true
  }
  var i = 0
  while (i < prereqs.length) {
      var j = i
      var course = ''
      while (j < prereqs.length && prereqs[j] != '(' && prereqs[j] != ')' && prereqs[j] != '+' && prereqs[j] != '*') {
          course += prereqs[j]
          j += 1
      }
      if (course.length > 0) {
          if (taken.some(c => c.id === course)) {
              prereqs = prereqs.replace(course, '1')
          } else {
              prereqs = prereqs.replace(course, '0')
          }
          i += 1
      } else {
          i = j + 1
      }
  }
  return eval(prereqs) > 0
}
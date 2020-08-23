export function resSort(avail, res, taken) {
  // combine avail and res classes into a single array
  const courses = avail.concat(res)
  console.log(courses)
  avail = []
  res = []
  // comb through array checking if each class has prereqs in taken
  // if true: add to avail, else: add to res
  courses.forEach(c => {
    if (c.prereqs.length === 0) {
      avail.push(c)
    }
    else if (checkPrereqs(c.prereqs, taken)) {
      avail.push(c)
    } else {
      res.push(c)
    }
  })

  return { avail, res }

  // return avail and res as an object
}

const checkPrereqs = (prereqs, taken) => {
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
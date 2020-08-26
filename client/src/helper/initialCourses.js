export function initCourses(map, total) {
  const avail = []
  const restricted = []

  map.forEach(sec => {
    sec.courses.forEach(c => {
      // check if c is multi course
      c = c.split('/')[0]
      // find c in total
      const course = total.find(course => course.id === c)
      
      
      // check the length of prereqs
      if (course.prereqs.length === 0) {
        avail.push(course)
      } else {
        restricted.push(course)
      }
    })
  })

  console.log(avail)
  console.log(restricted)

  return [avail, restricted]


}
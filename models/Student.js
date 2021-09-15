class Student {
  constructor(file, data) {
    if (file) {
      this.createStudentFromFile(file)
    } else {
      this.createStudentFromData(data)
    }
  }

  createStudentFromFile(file) {
    console.log(file)
  }

  createStudentFromData(data) {
    console.log(data)
  }
}

module.exports = Student

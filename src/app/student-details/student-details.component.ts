import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  studentList: any = [];
  grade: string = '';
  showSucessMessage: boolean = false;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.grade = this.route.snapshot.params['grade'];
    this.studentService.setStudentDetail();
    this.setStudentListData();
  };

  setStudentListData() {
    if (this.grade) {
        let studentData = this.studentService.getStudentListByGrade(this.grade);
        if(studentData == 'Error') {
          alert('problem in fetching student data please try again ...')
          return
        }else {
          this.studentList = studentData.map((student: any) => {
            return { ...student, isEdited: false };
          });
        }
    } 
  }

  OnSave(index: number) {
    let student = {...this.studentList[index] };
    delete student.isEdited;
    this.studentService.setStudentListByGrade(student, index, this.grade);
    this.studentList[index] = {...this.studentList[index], isEdited : false}
    this.showSucessMessage = true;
    setTimeout(() => {
      this.showSucessMessage = false;
    }, 800);
  }

  onCancel(index: number) {
    let studentData = this.studentService.getStudentDataByGradeAndIndex(
      this.grade,
      index
    );
    if(studentData == 'Error') {
      alert('problem in fetching student data please try again ...')
      return
    } else {
      this.studentList[index] = { ...studentData, isEdited: false };
    }
    
  }

  validateStudentData(fieldName: string, value: any, index: number) {
    this.validateAndUpdate(fieldName, value, index);
    this.validateAll(index);
  }

  validateAndUpdate(fieldName: string, value: any, index: number) {
    switch (fieldName) {
      case 'name':
        if (!value) {
          alert(`Name can't be empty`);
        }

        break;
      case 'age':
        if (value) {
          this.validateNumberAndUpdate(fieldName, value, index);
        } else {
          alert(`Age can't be empty`);
        }

        break;
      case 'email':
        if (value) {
          if (!this.validateEmail(value)) {
            alert('Please enter a valid email');
          } 
        } else {
          alert(`Email can't be empty`);
        }
        break;
      case 'English':
        if (value) {
          this.validateNumberAndUpdate(fieldName, value, index);
        } else {
          alert('English must contain a valid number');
        }

        break;
      case 'Maths':
        if (value) {
          this.validateNumberAndUpdate(fieldName, value, index);
        } else {
          alert('Maths must contain a valid number');
        }
        break;
      case 'Science':
        if (value) {
          this.validateNumberAndUpdate(fieldName, value, index);
        } else {
          alert('Science must contain a valid number');
        }
        break;
      case 'Social_Studies':
        if (value) {
          this.validateNumberAndUpdate(fieldName, value, index);
        } else {
          alert('Social Studies must contain a valid number');
        }
        break;
      default:
        this.studentList[index].isEdited = false;
        break;
    }
  }

  validateNumberAndUpdate(fieldName: string, value: any, index: number) {
    if (isNaN(value)) {
      alert(`${fieldName} must be a number`);
    } else if (fieldName == 'age' && value <= 0) {
      alert(`${fieldName} must be a positive number`);
    } else if (value < 0) {
      alert(`${fieldName} can't be negative`);
    }
  }

  validateEmail = (email: any) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validateAll(index: number) {
    let student = this.studentList[index];
    if (
      student.name &&
      student.age &&
      student.age > 0 &&
      student.email &&
      this.validateEmail(student.email) &&
      student.English &&
      student.English >= 0 &&
      student.Maths &&
      student.Maths >= 0 &&
      student.Science &&
      student.Science >= 0 &&
      student.Social_Studies &&
      student.Social_Studies >= 0
    ) {
      this.studentList[index].isEdited = true;
    } else {
      this.studentList[index].isEdited = false;
    }
  }
}

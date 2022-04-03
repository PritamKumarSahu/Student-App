import { Injectable } from '@angular/core';
import { studentDetail } from '../util/student_data';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor() {}

  setStudentDetail() {
    let studentList = localStorage.getItem('student_data')
    if(studentList) {
      return
    } else {
      localStorage.setItem('student_data', JSON.stringify(studentDetail));
    }
    
  }

  setStudentListByGrade(studentData : any, ind : number , grade:string) {
    let studentList: any = localStorage.getItem('student_data');
    studentList = JSON.parse(studentList);
    if (studentList) {
      for (let index = 0; index < studentList.length; index++) {
        if (studentList[index].key == grade) {
           studentList[index].data[ind] = studentData ;
           localStorage.setItem('student_data', JSON.stringify(studentList));
           break;
        }
      }
    }
  }

  getStudentListByGrade(grade: string) {
    let studentList: any = localStorage.getItem('student_data');
    studentList = JSON.parse(studentList);
    if (studentList) {
      for (let index = 0; index < studentList.length; index++) {
        if (studentList[index].key == grade) {
          return studentList[index].data;
        }
      }
    } else {
      return "Error";
    }
  }

  getStudentDataByGradeAndIndex(grade : string, ind : number) {
    let studentList: any = localStorage.getItem('student_data');
    studentList = JSON.parse(studentList);
    if (studentList) {
      for (let index = 0; index < studentList.length; index++) {
        if (studentList[index].key == grade) {
          return studentList[index].data[ind];
        }
      }
    } else {
      return "Error";
    }
  }
}

import { TestBed } from '@angular/core/testing';
import { studentDetail } from '../util/student_data';

import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentService);
  });

  beforeEach(() => {
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be student service created', () => {
    expect(service).toBeTruthy();
  });

  it('check all student data saved in localstorage', () => {
    service.setStudentDetail();
    expect(localStorage.getItem('student_data')).toEqual(
      JSON.stringify(studentDetail)
    );
  });

  it('check student details saved in localstorage', () => {
    service.setStudentDetail();
    let studentData = {
      name: 'Pritam kumar ss',
      age: 9,
      email: 'pritam@gmail.com',
      English: 22,
      Maths: 95,
      Science: 92,
      Social_Studies: 78,
    };
    service.setStudentListByGrade(studentData, 0, 'Grade 1');
    let storageData: any = localStorage.getItem('student_data');
    storageData = JSON.parse(storageData);
    expect(storageData[0].data[0]).toEqual(studentData);
  });

  it('check student list by grade', () => {
    service.setStudentDetail();
    let data = service.getStudentListByGrade('Grade 1');
    expect(data).toEqual([
      {
        name: 'Pritam kumar',
        age: 9,
        email: 'pritam@gmail.com',
        English: 88,
        Maths: 95,
        Science: 92,
        Social_Studies: 78,
      },
      {
        name: 'Rishi',
        age: 10,
        email: 'rishi@gmail.com',
        English: 82,
        Maths: 97,
        Science: 88,
        Social_Studies: 82,
      },
      {
        name: 'Vikash',
        age: 10,
        email: 'vikash@gmail.com',
        English: 81,
        Maths: 97,
        Science: 91,
        Social_Studies: 79,
      },
      {
        name: 'Richa',
        age: 8,
        email: 'richa@gmail.com',
        English: 89,
        Maths: 95,
        Science: 77,
        Social_Studies: 92,
      },
      {
        name: 'Sikha',
        age: 9,
        email: 'sikha@gmail.com',
        English: 78,
        Maths: 88,
        Science: 82,
        Social_Studies: 91,
      },
    ]);
  });

  it('check when student list is empty while fetching student list by grade should throw error', () => {
    let data = service.getStudentListByGrade('Grade 1');
    expect(data).toEqual('Error');
  });

  it('Check student data by grade and index', () => {
    service.setStudentDetail();
    let data = service.getStudentDataByGradeAndIndex('Grade 1', 0);
    expect(data).toEqual({
      name: 'Pritam kumar',
      age: 9,
      email: 'pritam@gmail.com',
      English: 88,
      Maths: 95,
      Science: 92,
      Social_Studies: 78,
    });
  });

  it('check when student list is empty while fetching student data by grade and index should throw error', () => {
    let data = service.getStudentDataByGradeAndIndex('Grade 1', 0);
    expect(data).toEqual('Error');
  });
});

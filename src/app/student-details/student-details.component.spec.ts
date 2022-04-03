import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../services/student.service';

import { StudentDetailsComponent } from './student-details.component';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsComponent;
  let fixture: ComponentFixture<StudentDetailsComponent>;
  let studentService: StudentService;
  let studentData = [
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
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StudentDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsComponent);
    component = fixture.componentInstance;
    studentService = fixture.debugElement.injector.get(StudentService);
    
    fixture.detectChanges();
  });

  

  it('should have student-details object', () => {
    expect(component).toBeTruthy();
  });

  it('Check student list data to be intialized to studentList', () => {
    component.grade = 'Grade 1';
    let grade1Students: any = [...studentData]
    let studentExpectedValue = grade1Students.map((student: any) => {
      return { ...student, isEdited: false };
    });
    
    let spy = spyOn(studentService, 'getStudentListByGrade').and.returnValue(
      grade1Students
    );
    component.setStudentListData();
    expect(component.studentList).toEqual(studentExpectedValue);
  });

  it('Check studentList failed to be intialized', () => {
    spyOn(window, 'alert');
    component.grade = 'Grade 1';
    
    let spy = spyOn(studentService, 'getStudentListByGrade').and.returnValue(
      'Error'
    );
    component.setStudentListData();
    expect(window.alert).toHaveBeenCalledWith('problem in fetching student data please try again ...')
  });

  it('To save the edited student data',fakeAsync(() => {
    let spy = spyOn(studentService, 'setStudentListByGrade').and.returnValue();
    component.OnSave(0)
    tick(800)
    fixture.whenStable().then(() => {
      expect(component.showSucessMessage).toBe(false)
    })
    
  }));

  it('To undo the edited student data',() => {
    let studentActualData = {
      name: 'Pritam kumar',
      age: 9,
      email: 'pritam@gmail.com',
      English: 88,
      Maths: 95,
      Science: 92,
      Social_Studies: 78,
    }
    let spy = spyOn(studentService, 'getStudentDataByGradeAndIndex').and.returnValue(studentActualData);
    component.onCancel(0)
    let excpectedResetData= {...studentActualData, isEdited: false}
    
    expect(component.studentList[0]).toEqual(excpectedResetData)
    
  });

  it('while cancel with index student data not found',() => {
    spyOn(window, 'alert');
    let spy = spyOn(studentService, 'getStudentDataByGradeAndIndex').and.returnValue('Error');
    component.onCancel(0)
    expect(window.alert).toHaveBeenCalledWith('problem in fetching student data please try again ...')
    
  });

  it('validate correct student data to update',() => {
    let updateStudentData = [...studentData]
    component.studentList = updateStudentData;
    fixture.detectChanges();
    component.validateStudentData('name','Pritam Kumar',0)
    expect(component.studentList[0].isEdited).toBe(true);
  });

  it('validate student data with empty name while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].name = ''
    component.studentList = updateStudentData

    component.validateStudentData('name','',0)
    expect(window.alert).toHaveBeenCalledWith(`Name can't be empty`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

 

  it('validate student data with negative age while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].age = -9
    component.studentList = updateStudentData
    component.validateStudentData('age','-9',0)
    expect(window.alert).toHaveBeenCalledWith(`age must be a positive number`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with empty age while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].age = parseInt('')
    component.studentList = updateStudentData
    component.validateStudentData('age','',0)
    expect(window.alert).toHaveBeenCalledWith(`Age can't be empty`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with  age in string while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].age = parseInt('random')
    component.studentList = updateStudentData
    component.validateStudentData('age','random',0)
    expect(window.alert).toHaveBeenCalledWith(`age must be a number`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with empty email while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].email = ''
    component.studentList = updateStudentData
    component.validateStudentData('email','',0)
    expect(window.alert).toHaveBeenCalledWith(`Email can't be empty`)
    expect(component.studentList[0].isEdited).toBe(false)
  });

  it('validate student data with invalid email while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].email = 'pritam@gmail'
    component.studentList = updateStudentData
    component.validateStudentData('email','pritam@gmail',0)
    expect(window.alert).toHaveBeenCalledWith(`Please enter a valid email`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with negative english number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].English = -76
    component.studentList = updateStudentData
    component.validateStudentData('English','-76',0)
    expect(window.alert).toHaveBeenCalledWith(`English can't be negative`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with empty english number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].English = parseInt('')
    component.studentList = updateStudentData
    component.validateStudentData('English','',0)
    expect(window.alert).toHaveBeenCalledWith(`English must contain a valid number`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with negative math number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].Maths = -88
    component.studentList = updateStudentData
    component.validateStudentData('Maths','-88',0)
    expect(window.alert).toHaveBeenCalledWith(`Maths can't be negative`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with empty math number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].Maths = parseInt('')
    component.studentList = updateStudentData
    component.validateStudentData('Maths','',0)
    expect(window.alert).toHaveBeenCalledWith(`Maths must contain a valid number`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with negative science number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].Science = -56
    component.studentList = updateStudentData
    component.validateStudentData('Science','-56',0)
    expect(window.alert).toHaveBeenCalledWith(`Science can't be negative`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with empty science number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].Science = parseInt('')
    component.studentList = updateStudentData
    component.validateStudentData('Science','',0)
    expect(window.alert).toHaveBeenCalledWith(`Science must contain a valid number`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with negative social studies number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].Social_Studies = -78
    component.studentList = updateStudentData
    component.validateStudentData('Social_Studies','-78',0)
    expect(window.alert).toHaveBeenCalledWith(`Social_Studies can't be negative`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });

  it('validate student data with empty social studies number while editing',() => {
    spyOn(window, 'alert');
    let updateStudentData = [...studentData]
    updateStudentData[0].Social_Studies = parseInt('')
    component.studentList = updateStudentData
    component.validateStudentData('Social_Studies','',0)
    expect(window.alert).toHaveBeenCalledWith(`Social Studies must contain a valid number`)
    expect(component.studentList[0].isEdited).toBe(false)
    
  });


  it('validate wrong subject name to update',() => {
    component.studentList = [...studentData]
    component.validateStudentData('Physics','55',0)
    expect(component.studentList[0].isEdited).toBe(false)
    
  }); 
  
});

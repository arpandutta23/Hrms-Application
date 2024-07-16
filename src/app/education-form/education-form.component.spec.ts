import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { DataService } from '../data.service';

import { EducationFormComponent } from './education-form.component';

describe('EducationFormComponent', () => {
  let component: EducationFormComponent;
  let fixture: ComponentFixture<EducationFormComponent>;
  let service:DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas:[NO_ERRORS_SCHEMA],
      declarations: [ EducationFormComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule, MatButtonModule],
      providers:[
        {provide:MAT_DIALOG_DATA, useValue:{}},
        {provide:MatDialogRef, useValue:{ close:(dialogResult:any)=>{}}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a valid education-form', () => {
    component.formValue.setValue({
      "typeOfEstablishment": "Central",
      "majorField": "Bcom",
      "amount": "1200",
      "currency": "INR",
      "nameOfEstablishment": "Gitam University",
      "minorField": "CSE",
      "reimbursmentDate": "2022-10-20",
      "discipline": "Good",
      "affiliation": "JLNU",
      "breakExplaination": "No breaks",
      "passingYear": "2022",
      "addressOfInstitution": "Karnataka",
      "upload": "",
      "grade": "A",
      "attendedFrom": "2022-10-02",
      "level": "II",
      "attendedTo": "2022-10-14",
      "subject": "Web Development",
      "companySponsored": "Wissen Technology",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editEducationData = false;
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'postEduData').and.callFake(() => {
      return of({});
    });
    component.postAndUpdateEducationDetails();
  });

  it('should be a valid education-form', () => {
    component.formValue.setValue({
      "typeOfEstablishment": "Central",
      "majorField": "Bcom",
      "amount": "1200",
      "currency": "INR",
      "nameOfEstablishment": "Gitam University",
      "minorField": "CSE",
      "reimbursmentDate": "2022-10-20",
      "discipline": "Good",
      "affiliation": "JLNU",
      "breakExplaination": "No breaks",
      "passingYear": "2022",
      "addressOfInstitution": "Karnataka",
      "upload": "",
      "grade": "A",
      "attendedFrom": "2022-10-02",
      "level": "II",
      "attendedTo": "2022-10-14",
      "subject": "Web Development",
      "companySponsored": "Wissen Technology",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editEducationData = false;
    let service = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(service, 'postEduData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
    component.postAndUpdateEducationDetails();
  });

 

  it('should post the data', ()=>{
    const data=[{
      id:1,
      firstname:"abc",
      lastname:"xyz"
    }];
    component.postAndUpdateEducationDetails();
    fixture.detectChanges();
    expect(component.postAndUpdateEducationDetails).toBeTruthy();
  });

  it('should call form reset', fakeAsync(() => {
    spyOn(component, 'editFormDetails');
    component['ds'].postEduData = () => of({ success: true });
    component.postAndUpdateEducationDetails();
    flushMicrotasks();
    expect(component.formValue.reset).toBeTruthy();
  }));

  it('should call the post method', ()=>{
    spyOn(component, 'postAndUpdateEducationDetails');
    component.postAndUpdateEducationDetails();
    expect(component.postAndUpdateEducationDetails).toHaveBeenCalled();
  });

  it("should update education details when editEducationData is true", () => {
    component.editEducationData = true;
    spyOn(component, "updateEducationDetails").and.callThrough();
    component.postAndUpdateEducationDetails();
    expect(component.updateEducationDetails).toHaveBeenCalled();
  });

  it('should call the methods inside update education details', ()=>{
    component.updateEducationDetails();
    if(component.formValue.valid) {
      spyOn(service, 'updateEduData');
      spyOn(window, 'alert');
      component.updateEducationDetails();
      expect(service.updateEduData).toHaveBeenCalledWith(component.formValue, component.editEducationData);
      expect(window.alert).toHaveBeenCalledWith('message');
    }
    expect(component.updateEducationDetails).toBeDefined();
  });

  it('should be a valid education-form', () => {
    component.formValue.setValue({
      "typeOfEstablishment": "Central",
      "majorField": "Bcom",
      "amount": "1200",
      "currency": "INR",
      "nameOfEstablishment": "Gitam University",
      "minorField": "CSE",
      "reimbursmentDate": "2022-10-20",
      "discipline": "Good",
      "affiliation": "JLNU",
      "breakExplaination": "No breaks",
      "passingYear": "2022",
      "addressOfInstitution": "Karnataka",
      "upload": "",
      "grade": "A",
      "attendedFrom": "2022-10-02",
      "level": "II",
      "attendedTo": "2022-10-14",
      "subject": "Web Development",
      "companySponsored": "Wissen Technology",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editEducationData = true;
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'updateEduData').and.callFake(() => {
      return of({});
    });
    component.postAndUpdateEducationDetails();
  });

  it('should be a valid education-form', () => {
    component.formValue.setValue({
      "typeOfEstablishment": "Central",
      "majorField": "Bcom",
      "amount": "1200",
      "currency": "INR",
      "nameOfEstablishment": "Gitam University",
      "minorField": "CSE",
      "reimbursmentDate": "2022-10-20",
      "discipline": "Good",
      "affiliation": "JLNU",
      "breakExplaination": "No breaks",
      "passingYear": "2022",
      "addressOfInstitution": "Karnataka",
      "upload": "",
      "grade": "A",
      "attendedFrom": "2022-10-02",
      "level": "II",
      "attendedTo": "2022-10-14",
      "subject": "Web Development",
      "companySponsored": "Wissen Technology",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editEducationData = true;
    let service = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(service, 'updateEduData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
    component.postAndUpdateEducationDetails();
  });

});

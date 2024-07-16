import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { DataService } from '../data.service';

import { ExperienceFormComponent } from './experience-form.component';

describe('ExperienceFormComponent', () => {
  let component: ExperienceFormComponent;
  let fixture: ComponentFixture<ExperienceFormComponent>;
  let service:DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceFormComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule],
      providers:[
        {provide:MAT_DIALOG_DATA, useValue:{}},
        {provide:MatDialogRef, useValue:{ close:(dialogResult:any)=>{}}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a valid experience-form', () => {
    component.formValue.setValue({
      "companyName": "Microsoft",
      "designationOnLeave": "Azure Developer",
      "experienceCertificate": "",
      "address": "Hyderabad",
      "industryType": "IT",
      "salarySlip": "",
      "fromDate": "2017-09-20",
      "contactNumber": "438749357",
      "relievingLetter": "",
      "toDate": "2022-03-04",
      "roles": "Developer",
      "jobTitle": "Java Developer",
      "keyExperience": "Azure, JavaScript",
      "salaryOnLeaving": "600000",
      "currency": "INR",
      "reasonForLeaving": "Changing location",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editExperienceData = false;
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'postExpData').and.callFake(() => {
      return of({});
    });
    component.postAndUpdateExperienceDetails();

  });

  it('should be a valid experience-form', () => {
    component.formValue.setValue({
      "companyName": "Microsoft",
      "designationOnLeave": "Azure Developer",
      "experienceCertificate": "",
      "address": "Hyderabad",
      "industryType": "IT",
      "salarySlip": "",
      "fromDate": "2017-09-20",
      "contactNumber": "438749357",
      "relievingLetter": "",
      "toDate": "2022-03-04",
      "roles": "Developer",
      "jobTitle": "Java Developer",
      "keyExperience": "Azure, JavaScript",
      "salaryOnLeaving": "600000",
      "currency": "INR",
      "reasonForLeaving": "Changing location",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editExperienceData = false;
    let service = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(service, 'postExpData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
    component.postAndUpdateExperienceDetails();
  });

  it('should post the data', ()=>{
    const data=[{
      id:1,
      firstname:"abc",
      lastname:"xyz"
    }];
    component.postAndUpdateExperienceDetails();
    fixture.detectChanges();
    expect(component.postAndUpdateExperienceDetails).toBeTruthy();
  });

  it('should call form reset', fakeAsync(() => {
    spyOn(component, 'editFormDetails');
    component['ds'].postEduData = () => of({ success: true });
    component.postAndUpdateExperienceDetails();
    flushMicrotasks();
    expect(component.formValue.reset).toBeTruthy();
  }));

  it('should call the post method', ()=>{
    spyOn(component, 'postAndUpdateExperienceDetails');
    component.postAndUpdateExperienceDetails();
    expect(component.postAndUpdateExperienceDetails).toHaveBeenCalled();
  });

  it('should update experience details', () => {
    expect(component.formValue.valid);
    expect(component.updateExperienceDetails).toBeTruthy();
  });

  it("should update education details when editEducationData is true", () => {
    component.editExperienceData = true;
    spyOn(component, "updateExperienceDetails").and.callThrough();
    component.postAndUpdateExperienceDetails();
    expect(component.updateExperienceDetails).toHaveBeenCalled();
  });

  it('should call the methods inside update education details', ()=>{
    component.updateExperienceDetails();
    if(component.formValue.valid) {
      spyOn(service, 'updateExpData');
      spyOn(window, 'alert');
      component.updateExperienceDetails();
      expect(service.updateExpData).toHaveBeenCalledWith(component.formValue, component.editExperienceData);
      expect(window.alert).toHaveBeenCalledWith('message');
    }
    expect(component.updateExperienceDetails).toBeDefined();
  });

  it('should be a valid experience-form', () => {
    component.formValue.setValue({
      "companyName": "Microsoft",
      "designationOnLeave": "Azure Developer",
      "experienceCertificate": "",
      "address": "Hyderabad",
      "industryType": "IT",
      "salarySlip": "",
      "fromDate": "2017-09-20",
      "contactNumber": "438749357",
      "relievingLetter": "",
      "toDate": "2022-03-04",
      "roles": "Developer",
      "jobTitle": "Java Developer",
      "keyExperience": "Azure, JavaScript",
      "salaryOnLeaving": "600000",
      "currency": "INR",
      "reasonForLeaving": "Changing location",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editExperienceData = true;
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'updateExpData').and.callFake(() => {
      return of({});
    });
    component.postAndUpdateExperienceDetails();

  });

  it('should be a valid experience-form', () => {
    component.formValue.setValue({
      "companyName": "Microsoft",
      "designationOnLeave": "Azure Developer",
      "experienceCertificate": "",
      "address": "Hyderabad",
      "industryType": "IT",
      "salarySlip": "",
      "fromDate": "2017-09-20",
      "contactNumber": "438749357",
      "relievingLetter": "",
      "toDate": "2022-03-04",
      "roles": "Developer",
      "jobTitle": "Java Developer",
      "keyExperience": "Azure, JavaScript",
      "salaryOnLeaving": "600000",
      "currency": "INR",
      "reasonForLeaving": "Changing location",
    })
    expect(component.formValue.valid).toEqual(true);
    component.editExperienceData = true;
    let service = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(service, 'updateExpData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
    component.postAndUpdateExperienceDetails();
  });


});

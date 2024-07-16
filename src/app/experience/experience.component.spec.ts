import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DataService } from '../data.service';
import { ExperienceComponent } from './experience.component';
import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { OverlayContainer } from "@angular/cdk/overlay";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDialogHarness } from "@angular/material/dialog/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import Swal from 'sweetalert2';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let DATA:any;
  let loader:HarnessLoader;
  let overlay:OverlayContainer;
  let service:DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienceComponent, ExperienceFormComponent ],
      imports:[HttpClientTestingModule, ReactiveFormsModule,BrowserAnimationsModule, MatDialogModule]
    })
    .overrideModule(BrowserDynamicTestingModule,{
      set:{
        entryComponents:[ExperienceFormComponent]
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    overlay = TestBed.inject(OverlayContainer);
  });

  afterEach(async()=>{
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    await Promise.all(dialogs.map(async d => await d.close()));
    overlay.ngOnDestroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog component', () => {
    spyOn(component, 'openDialog')
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
   });

   it('should test for getting data value', () => {
    DATA = [
      {
        typeOfEstablishment: "State",
        majorField: "Bcom",
        amount: "1200",
        id: 1
      },
      {
        typeOfEstablishment: "State",
        majorField: "Bcom",
        amount: "1200",
        id: 2
      }
    ];
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'getExpData').and.callFake(() => {
      return of(DATA);
    });
    component.getExperienceData();
    expect(component.dataSource).toEqual(DATA);
  });

  it('should open the dialog with button click', ()=>{
    spyOn(component, 'openDialog');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.add');
    button.click();
    expect(component.openDialog).toHaveBeenCalled();
   })

   it ('should open the material dialog', async()=>{
    component.openDialog();
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toEqual(1);
   })

   it('should set buttonDisabled to false when source is checked and rowData to parsed event value', () => {
    const event = { source: { _checked: true }, value: '{"test": 1}' };
    component.radioButtonChangeEvent(event);
    expect(component.buttonDisabled).toBe(false);
    expect(component.rowData).toEqual({ test: 1 });
  });

  it('should set buttonDisabled to true when source is not checked', () => {
    const event = { source: { _checked: false } };
    component.radioButtonChangeEvent(event);
    expect(component.buttonDisabled).toBe(true);
  });

  it('should open the dialog while editing the form', () => {
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.callThrough();
    component.editExperienceDetails(component.rowData);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should close the dialog', () => {
    const dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue({afterClosed:()=> of(true)});
    component.editExperienceDetails(component.rowData);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it("should disable the button", ()=> {
    expect(component.buttonDisabled).toBe(true);
  });

  it('should return error on getExpData', () => {
    const service: DataService = TestBed.get(DataService);
    service.getExpData().subscribe({
      next: (res: any) => {
        component.dataSource = res;
      },
      error:()=>{
        expect(service.getExpData).toThrow();
      }
    })
  });

  it('should handle error while fetching data', () => {
    const ds = TestBed.inject(DataService);
    const spy = spyOn(ds, 'getExpData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
    component.getExperienceData();
    expect(spy).toHaveBeenCalled();
    expect(component.dataSource).toBeUndefined();
  })

  it('should confirm for deleting the data', (done)=>{
    component.rowData = [
      {id:1, name: 'abc', model: 'bcd'},
      {id:1, name: 'efg', model: 'pqr'},
      {id:1, name: 'xyz', model: 'def'},
    ];
    component.deleteExperienceDetails(1);
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toEqual('Are you sure ?');
    Swal.clickConfirm();
    setTimeout(()=>{
      expect(component.rowData.length).toEqual(3);
      done();
    })
  })

  it('should open dialog and fetch data', () => {
    const dialogReference = component.dialog.open(ExperienceFormComponent, {
      disableClose: true
    }).afterClosed().subscribe((val) => {
      if (val) {
        component.getExperienceData();
        component.buttonDisabled=true;
      }
    })
    expect(dialogReference.closed).toBeFalsy();
  });

});

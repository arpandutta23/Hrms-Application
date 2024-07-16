import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { of, throwError } from 'rxjs';
import { DataService } from '../data.service';
import { EducationComponent } from './education.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EducationFormComponent } from '../education-form/education-form.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialogHarness } from "@angular/material/dialog/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import Swal from 'sweetalert2';

describe('EducationComponent', () => {
  let DATA: any;
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let loader: HarnessLoader;
  let service: DataService;
  let dialog: MatDialog;
  let overlay: OverlayContainer;
  let mockDialogRef: MatDialogRef<any>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationComponent, EducationFormComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, BrowserAnimationsModule, BrowserDynamicTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [EducationFormComponent]
        }
      })
      .compileComponents();
    fixture = TestBed.createComponent(EducationComponent);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    overlay = TestBed.inject(OverlayContainer);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['Submit', 'Cancel']);
  });

  afterEach(async () => {
    const dialogs = await loader.getAllHarnesses(MatDialogHarness)
    await Promise.all(dialogs.map(async d => await d.close()));
    overlay.ngOnDestroy();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
        currency: "INR",
        id: 2
      }
    ];
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'getEduData').and.callFake(() => {
      return of(DATA);
    });
    component.getEducationData();
    expect(component.dataSource).toEqual(DATA);
  });

  it('should open the dialog component', () => {
    spyOn(component, 'openDialog')
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  });


  it('should open the dialog with button click', () => {
    spyOn(component, 'openDialog');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('.add');
    button.click();
    expect(component.openDialog).toHaveBeenCalled();
  })

  it('should open a material dialog component', async () => {
    component.openDialog();
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toEqual(1);
  });

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
    component.editEducationDetails(component.rowData);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it("should disable the button", () => {
    component.editEducationDetails(component.rowData);
    expect(component.buttonDisabled).toBe(true);
  });

  it('should handle error while fetching data', () => {
    const ds = TestBed.inject(DataService);
    const spy = spyOn(ds, 'getEduData').and.returnValue(throwError(() => new Error('Error while fetching data')));
    component.getEducationData();
    expect(spy).toHaveBeenCalled();
    expect(component.dataSource).toBeUndefined();
  });

  // it('should handle error while deleting data', () => {
  //   const ds = TestBed.inject(DataService);
  //   const spy = spyOn(ds, 'deleteEduData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
  //   component.deleteEducationDetails(component.rowData);
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should confirm for deleting the data', (done) => {
    component.rowData = [
      { id: 1, name: 'abc', model: 'bcd' },
      { id: 1, name: 'efg', model: 'pqr' },
      { id: 1, name: 'xyz', model: 'def' },
    ];
    component.deleteEducationDetails(1);
    expect(Swal.isVisible()).toBeTruthy();
    expect(Swal.getTitle()?.textContent).toEqual('Are you sure ?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(component.rowData.length).toEqual(3);
      done();
    });
  });

  it('should open dialog and fetch data', () => {
    const dialogReference = component.dialog.open(ExperienceFormComponent, {
      disableClose: true
    }).afterClosed().subscribe((val) => {
      if (val) {
        component.getEducationData();
        component.buttonDisabled = true;
      }
    })
    expect(dialogReference.closed).toBeFalsy();
  });

  it("should disable the button", () => {
    component.getEducationData();
    expect(component.buttonDisabled).toBe(true);
  });
});

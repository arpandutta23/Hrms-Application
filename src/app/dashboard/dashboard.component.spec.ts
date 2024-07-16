import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DashboardComponent } from './dashboard.component';
import { DataService } from '../data.service';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get topData from json-server', (() => {
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service, 'getTopData').and.callFake(() => {
      return of(
        {
          name: "Shubham Pawar",
          EmpId: "6110",
          joining: "Feb 2022",
          address1: "Adarsh Ecoplace",
          address2: "Bangalore, Karnataka",
          email: "shubham.pawar@wisseninfotech.com",
          mobile: "+91 9876543210",
          designation: "Trainee Engineer",
          team: "Development",
          manager: "Sindhuri Meegada"
        }
      );
    })
    component.getTopData();
    expect(component.data).toEqual({
      name: "Shubham Pawar",
      EmpId: "6110",
      joining: "Feb 2022",
      address1: "Adarsh Ecoplace",
      address2: "Bangalore, Karnataka",
      email: "shubham.pawar@wisseninfotech.com",
      mobile: "+91 9876543210",
      designation: "Trainee Engineer",
      team: "Development",
      manager: "Sindhuri Meegada"

    });
  }));

  it('should handle error while fetching topData', () => {
    const ds = TestBed.inject(DataService);
    const spy = spyOn(ds, 'getTopData').and.returnValue(throwError(()=> new Error('Error while fetching data')));
    component.getTopData();
    expect(spy).toHaveBeenCalled();
    expect(component.data).toBeUndefined();
  })


});

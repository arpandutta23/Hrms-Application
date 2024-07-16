import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let http: HttpClient;
  let httpTestControl: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    http = TestBed.inject(HttpClient);
    httpTestControl = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestControl.verify();
  })

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it("should delete education data", () => {
    const Data = [{
      id: 1,
      companyName: "abz",
      break: "no break",
    }];
    service.deleteEduData(1).subscribe(res =>
      expect(res).toEqual(Data)
    );
    const req = httpTestControl.expectOne({
      method: 'DELETE',
    })
    expect(req.request.method).toEqual('DELETE');
    req.flush(Data);
    httpTestControl.verify();
  })

  it("should delete experience data", () => {
    const Data = [{
      id: 1,
      companyName: "abz",
      break: "no break",
    }];
    service.deleteExpData(1).subscribe(res =>
      expect(res).toEqual(Data)
    );
    const req = httpTestControl.expectOne({
      method: 'DELETE',
    })
    expect(req.request.method).toEqual('DELETE');
    req.flush(Data);
    httpTestControl.verify();
  })

  it('should add education data', () => {
    const data = [{
      id: 1,
      companyName: "abz",
      break: "no break",
    }];
    service.postEduData(1).subscribe(res =>
      expect(res).toEqual(data)
    );
    const req = httpTestControl.expectOne({
      method: 'POST',
    });
    expect(req.request.method).toEqual('POST');
    req.flush(data);
    httpTestControl.verify();
  })

  it('should add experience data', () => {
    const data = [{
      id: 1,
      companyName: "abz",
      break: "no break",
    }];
    service.postExpData(1).subscribe(res =>
      expect(res).toEqual(data)
    );
    const req = httpTestControl.expectOne({
      method: 'POST',
    });
    expect(req.request.method).toEqual('POST');
    req.flush(data);
    httpTestControl.verify();
  })

  it("should update experience data", () => {
    const data = [{
      id: 1,
      companyName: "abz",
      break: "no break",
    }];
    service.updateExpData(1, 1).subscribe(res =>
      expect(res).toEqual(data)
    );
    const req = httpTestControl.expectOne({
      method: 'PUT',
    })
    expect(req.request.method).toEqual('PUT');
    req.flush(data);
    httpTestControl.verify();
  })

  it("should update education data", () => {
    const data = [{
      id: 1,
      companyName: "abz",
      break: "no break",
    }];
    service.updateEduData(1, 1).subscribe(res =>
      expect(res).toEqual(data)
    );
    const req = httpTestControl.expectOne({
      method: 'PUT',
    })
    expect(req.request.method).toEqual('PUT');
    req.flush(data);
    httpTestControl.verify();
  })


});

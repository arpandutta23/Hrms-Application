import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Education Details methods
  getEduData() {
    return this.http.get('http://localhost:3000/educationData');
  }

  postEduData(data:any) {
    return this.http.post<any>('http://localhost:3000/educationData', data);
  }

  updateEduData(data:any, id:number) {
    return this.http.put<any>('http://localhost:3000/educationData/'+id, data);
  }

  deleteEduData(id:any) {
    return this.http.delete<any>('http://localhost:3000/educationData/'+id);
  }

  // Experience Details methods
  getExpData(){
    return this.http.get('http://localhost:3000/experienceData');
  }

  postExpData(data:any){
    return this.http.post('http://localhost:3000/experienceData/', data);
  }

  updateExpData(data:any, id:any){
    return this.http.put('http://localhost:3000/experienceData/'+id, data);
  }

  deleteExpData(id:any){
    return this.http.delete('http://localhost:3000/experienceData/'+id);
  }

  // User Data methods
  getTopData() {
    return this.http.get('http://localhost:3000/topData');
  }
}

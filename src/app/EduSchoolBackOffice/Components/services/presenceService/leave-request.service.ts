import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  SERVER_URL: string = "http://localhost:8082/eduSchool"
  constructor(private http:HttpClient) { }


  public  addLeaveType(leaveTpe:any){
    return this.http.post<any>(`${this.SERVER_URL + '/LeaveType'}`, leaveTpe)
  }

  public  getLeaveTypeList(){
    return this.http.get<any>(`${this.SERVER_URL + '/LeaveType'}`)
  }

  public  getLeaveTypeById(id:any){
    return this.http.get<any>(`${this.SERVER_URL + `/LeaveType/${id}`}`)
  }
  public  deleteLeaveType(id:any){
    return this.http.delete<any>(`${this.SERVER_URL + `/LeaveType/${id}`}`)
  }

  public  updateLeaveType(id:any,leaveType:any){
    return this.http.put<any>(`${this.SERVER_URL + `/LeaveType/${id}`}`,leaveType)
  }

  public  getLeaveRequestList(){
    return this.http.get<any>(`${this.SERVER_URL + '/LeaveRequest'}`)
  }

  public  addLeaveRequest(leaveRq:any){
    return this.http.post<any>(`${this.SERVER_URL + '/LeaveRequest'}`, leaveRq)
  }

  public  updateLeaveRequestStatus(id:any,newStatus:any){
    console.log(typeof newStatus )
    const formData: FormData = new FormData();
    formData.append('newStatus', newStatus);
    return this.http.put<any>(`${this.SERVER_URL + `/LeaveRequest/${id}`}`,formData)

  }

  public  deleteLeave(id:any){
    return this.http.delete<any>(`${this.SERVER_URL + `/LeaveRequest/${id}`}`)
  }



}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveRequestService} from "../../../Services/leave-request.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit{
  leaveTypeForm!:FormGroup
  id:any
  leave:any
  constructor(private formbuilder: FormBuilder,
              private leaveTypeService:LeaveRequestService,
              private ar:ActivatedRoute,
              private router:Router,
              private dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit() {
    this.leaveTypeForm=this.formbuilder.group({
      type:[null,Validators.required],
      description:[null,Validators.required]
    })
    this.id=this.ar.snapshot.params['id'];

    this.leaveTypeService.getLeaveTypeById(this.data.id).subscribe((res:any)=>{
      this.leave=res
      this.leaveTypeForm.patchValue(this.leave)

    })




  }

  addLeaveType(leaveType:any) {
    if(this.leave){
      this.leaveTypeService.updateLeaveType(this.data.id,leaveType).subscribe((res:any)=>{
        console.log(res);

      })

    }else{
      this.leaveTypeService.addLeaveType(leaveType).subscribe((res:any)=>{
        console.log(res);
        this.leaveTypeForm.reset();

      })


    }

  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})
export class ExperienceFormComponent implements OnInit {

  public formValue !: FormGroup;
  actionButton: string = "Submit"

  constructor(private fb: FormBuilder, public ds: DataService,
    @Inject(MAT_DIALOG_DATA) public editExperienceData: any,
    public dialogRef: MatDialogRef<ExperienceFormComponent>) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      companyName: ['', Validators.required],
      designationOnLeave: ['', Validators.required],
      experienceCertificate: [''],
      address: ['', Validators.required],
      industryType: [''],
      salarySlip: [''],
      fromDate: ['', Validators.required],
      contactNumber: [''],
      relievingLetter: [''],
      toDate: ['', Validators.required],
      roles: [''],
      jobTitle: [''],
      keyExperience: [''],
      salaryOnLeaving: [''],
      currency: [''],
      reasonForLeaving: ['', Validators.required]
    });
    this.editFormDetails();
  }

  get formControls() {
    return this.formValue.controls;
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  postAndUpdateExperienceDetails() {
    if (!this.editExperienceData) {
      if (this.formValue.valid) {
        this.ds.postExpData(this.formValue.value).subscribe({
          next: (res) => {
            this.Toast.fire({ icon: 'success',background:'#b3b3ff', iconColor:'green', text: 'Added Successfully' });
            this.formValue.reset();
            this.dialogRef.close('data added');
          },
          error: () => {
            this.Toast.fire({
              icon: 'error',
              iconColor:'red',
              background:'#ffcccc',
              text: 'Error While Posting!'
            })
          }
        })
      }else {
        this.formValue.markAllAsTouched();
      }
    } else {
      this.updateExperienceDetails();
    }
  }

  editFormDetails() {
    if (this.editExperienceData) {
      this.actionButton = "Update"
      this.formValue.controls['companyName'].setValue(this.editExperienceData.companyName);
      this.formValue.controls['designationOnLeave'].setValue(this.editExperienceData.designationOnLeave);
      this.formValue.controls['experienceCertificate'].setValue(this.editExperienceData.experienceCertificate);
      this.formValue.controls['address'].setValue(this.editExperienceData.address);
      this.formValue.controls['industryType'].setValue(this.editExperienceData.industryType);
      this.formValue.controls['salarySlip'].setValue(this.editExperienceData.salarySlip);
      this.formValue.controls['fromDate'].setValue(this.editExperienceData.fromDate);
      this.formValue.controls['contactNumber'].setValue(this.editExperienceData.contactNumber);
      this.formValue.controls['relievingLetter'].setValue(this.editExperienceData.relievingLetter);
      this.formValue.controls['toDate'].setValue(this.editExperienceData.toDate);
      this.formValue.controls['roles'].setValue(this.editExperienceData.roles);
      this.formValue.controls['jobTitle'].setValue(this.editExperienceData.jobTitle);
      this.formValue.controls['keyExperience'].setValue(this.editExperienceData.keyExperience);
      this.formValue.controls['salaryOnLeaving'].setValue(this.editExperienceData.salaryOnLeaving);
      this.formValue.controls['currency'].setValue(this.editExperienceData.currency);
      this.formValue.controls['reasonForLeaving'].setValue(this.editExperienceData.reasonForLeaving);
    }
  }

  updateExperienceDetails() {
    if (this.formValue.valid) {
      this.ds.updateExpData(this.formValue.value, this.editExperienceData.id).subscribe({
        next: (res: any) => {
          this.Toast.fire({
            icon: 'success',
            background: '#b3b3ff',
            iconColor: 'green',
            title: 'Updated Succesfully'
          })
          this.formValue.reset();
          this.dialogRef.close('updated');
        },
        error: () => {
          this.Toast.fire({
            icon: 'error',
            iconColor:'red',
            background: '#ffcccc',
            title: 'Error while updating!'
          })
        }
      })
    }
  }

}

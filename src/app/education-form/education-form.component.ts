import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import Swal from "sweetalert2";

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent implements OnInit {

  formValue !: FormGroup;
  actionButton: string = "Submit"

  constructor(private fb: FormBuilder, public ds: DataService,
    @Inject(MAT_DIALOG_DATA) public editEducationData: any,
    public dialogRef: MatDialogRef<EducationFormComponent>) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      typeOfEstablishment: ['', Validators.required],
      majorField: ['', Validators.required],
      amount: [''],
      currency: [''],
      nameOfEstablishment: ['', Validators.required],
      minorField: [''],
      reimbursmentDate: [''],
      discipline: ['', Validators.required],
      affiliation: ['', Validators.required],
      breakExplaination: [''],
      passingYear: ['', Validators.required],
      addressOfInstitution: [''],
      upload: [''],
      grade: [''],
      attendedFrom: [''],
      level: [''],
      attendedTo: [''],
      subject: [''],
      companySponsored: ['']
    })
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

  postAndUpdateEducationDetails() {
    if (!this.editEducationData) {
      if (this.formValue.valid) {
        this.ds.postEduData(this.formValue.value).subscribe({
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
      } else {
        this.formValue.markAllAsTouched();
      }
    } else {
      this.updateEducationDetails();
    }
  }

  editFormDetails() {
    if (this.editEducationData) {
      this.actionButton = "Update"
      this.formValue.controls['typeOfEstablishment'].setValue(this.editEducationData.typeOfEstablishment);
      this.formValue.controls['majorField'].setValue(this.editEducationData.majorField);
      this.formValue.controls['amount'].setValue(this.editEducationData.amount);
      this.formValue.controls['currency'].setValue(this.editEducationData.currency);
      this.formValue.controls['nameOfEstablishment'].setValue(this.editEducationData.nameOfEstablishment);
      this.formValue.controls['minorField'].setValue(this.editEducationData.minorField);
      this.formValue.controls['reimbursmentDate'].setValue(this.editEducationData.reimbursmentDate);
      this.formValue.controls['discipline'].setValue(this.editEducationData.discipline);
      this.formValue.controls['affiliation'].setValue(this.editEducationData.affiliation);
      this.formValue.controls['breakExplaination'].setValue(this.editEducationData.breakExplaination);
      this.formValue.controls['passingYear'].setValue(this.editEducationData.passingYear);
      this.formValue.controls['addressOfInstitution'].setValue(this.editEducationData.addressOfInstitution);
      this.formValue.controls['upload'].setValue(this.editEducationData.upload);
      this.formValue.controls['grade'].setValue(this.editEducationData.grade);
      this.formValue.controls['attendedFrom'].setValue(this.editEducationData.attendedFrom);
      this.formValue.controls['level'].setValue(this.editEducationData.level);
      this.formValue.controls['attendedTo'].setValue(this.editEducationData.attendedTo);
      this.formValue.controls['subject'].setValue(this.editEducationData.subject);
      this.formValue.controls['companySponsored'].setValue(this.editEducationData.companySponsored);
    }
  }

  updateEducationDetails() {
    if (this.formValue.valid) {
      this.ds.updateEduData(this.formValue.value, this.editEducationData.id).subscribe({
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
            background:'#ffcccc',
            title: 'Error while updating!'
          })
        }
      })
    }
  }

}

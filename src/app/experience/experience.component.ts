import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from "@angular/material/dialog";
import { ExperienceFormComponent } from '../experience-form/experience-form.component';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { LoadingBarService } from "@ngx-loading-bar/core";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  displayedColumns: string[] = ['select', 'companyName', 'designationOnLeave', 'fromDate', 'toDate', 'reasonForLeaving'];
  dataSource:any
  rowData: any;
  buttonDisabled: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ds: DataService, public dialog: MatDialog, public loader:LoadingBarService) { }

  ngOnInit(): void {
    this.getExperienceData();
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

  getExperienceData() {
    this.ds.getExpData().subscribe({
      next: (res: any) => {
        this.dataSource = res;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
       this.Toast.fire({
        icon:'error',
        iconColor:'red',
        background:'#ffcccc',
        text: 'Error While Fetching Data'
       })       
      }
    })
  }

  editExperienceDetails(row: any) {
    this.dialog.open(ExperienceFormComponent, {
      disableClose: true,
      data: this.rowData
    }).afterClosed().subscribe((val) => {
        this.getExperienceData();
        this.buttonDisabled = true;
    })
  }

  radioButtonChangeEvent(event: any) {
    if (event.source._checked) {
      this.buttonDisabled = false;
      return this.rowData = JSON.parse(event.value);
    } else {
      this.buttonDisabled = true;
    }
  }

  deleteExperienceDetails(id: any) {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Deleted data cannot be recovered',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.value) {
        this.ds.deleteExpData(id).subscribe({
          next: (res: any) => {
            this.getExperienceData();
            this.buttonDisabled=true;
          },
          error: (err: any) => {
            this.Toast.fire({
              icon: 'error',
              text: 'Error While Deleting'
            })
          }
        })
        Swal.fire({
          icon: 'success',
          text: 'Data Deleted'
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: 'info',
          text: 'Data is Safe'
        });
      }
    })

  }

  openDialog() {
    const dialogReference = this.dialog.open(ExperienceFormComponent, {
      disableClose: true
    }).afterClosed().subscribe((val) => {
      if (val === 'data added') {
        this.getExperienceData();
        this.buttonDisabled=true;
      }
    })
  }
}
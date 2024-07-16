import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from "../data.service";
import { MatDialog } from "@angular/material/dialog";
import { EducationFormComponent } from '../education-form/education-form.component';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nameOfEstablishment', 'typeOfEstablishment', 'discipline', 'majorField', 'affiliation', 'passingYear'];
  dataSource: any;
  rowData: any;
  buttonDisabled: boolean = true;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ds: DataService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getEducationData();
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    background: 'blue',
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  getEducationData() {
    this.ds.getEduData().subscribe({
      next: (res: any) => {
        this.dataSource = res;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.Toast.fire({
          icon: 'error',
          iconColor: 'red',
          background: '#ffcccc',
          text: 'Error While Fetching!'
        })
      }
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

  editEducationDetails(row: any) {
    this.dialog.open(EducationFormComponent, {
      disableClose: true,
      data: this.rowData
    }).afterClosed().subscribe((val) => {
      if (val === 'updated') {
        this.getEducationData();
        this.buttonDisabled = true;
      }
    });
  }

  deleteEducationDetails(id: any) {
    Swal.fire({
      titleText: 'Are you sure ?',
      text: 'Deleted data cannot be recovered',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result: any) => {
      if (result.value) {
        this.ds.deleteEduData(id).subscribe({
          next: (res: any) => {
            this.getEducationData();
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
    const dialogReference = this.dialog.open(EducationFormComponent, {
      disableClose: true
    }).afterClosed().subscribe((val) => {
      if (val === 'data added') {
        this.getEducationData();
        this.buttonDisabled = true;
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any;
  disbaleProbation: boolean = true;
  disableConfirmation: boolean = true;
  disableReleased: boolean = false;
  disableFired: boolean = true;

  constructor(private ds: DataService) { }

  ngOnInit(): void {
    this.getTopData();

    // this.route.navigate(['customers'])
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

  getTopData() {
    this.ds.getTopData().subscribe({
      next: (res: any) => {
        this.data = res;
      },
      error: () => {
        this.Toast.fire({
          icon: 'error',
          iconColor: 'red',
          background: '#ffcccc',
          text: 'Error While Fetching Data!'
        })
      }
    })
  }


}




import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('counter')){
      this.i = Number(localStorage.getItem('counter')); 
    }else{
      this.i = 0;
    }
    this.getRentalsIntoArray();
  }
  i;
  rentalsArray=[];
  getRentalsIntoArray(){
    for(let i = 1; i <= this.i;i++){
      if(localStorage.getItem('rental'+i)){
        this.rentalsArray.push(JSON.parse(localStorage.getItem('rental'+i)));
      }
    }
  }
  getRentalsIntoArrayHover(){
    if(localStorage.getItem('counter')){
      this.i = Number(localStorage.getItem('counter')); 
    }else{
      this.i = 0;
    }
    this.rentalsArray = [];
    this.getRentalsIntoArray();
  }
  selectedRental;
  pastRental;
  editAndCancelButton=false;
  selectRental(count){
    this.selectedRental = JSON.parse(localStorage.getItem('rental'+count));
    document.getElementById(count).style.borderColor = "white";
    if(this.pastRental){
      document.getElementById(this.pastRental).style.borderColor = "transparent";
    }
    this.pastRental = count;
    (<HTMLInputElement>document.getElementById('unit')).value = this.selectedRental.address;
    (<HTMLInputElement>document.getElementById('expense')).value = this.selectedRental.expense;
    (<HTMLInputElement>document.getElementById('maintenance')).value = this.selectedRental.maintenance;
    this.editAndCancelButton = true;
  }
  cancelSelected(){
    this.selectedRental = {};
    (<HTMLInputElement>document.getElementById('unit')).value = "";
    (<HTMLInputElement>document.getElementById('expense')).value = "";
    (<HTMLInputElement>document.getElementById('maintenance')).value = "";
    this.editAndCancelButton = false;
    document.getElementById(this.pastRental).style.borderColor = "transparent";
    this.pastRental = 0;
  }
  createMaintenance(unit,expense,maintenance){
    let editedRental = JSON.parse(localStorage.getItem('rental'+this.selectedRental.count));
    editedRental.expense = expense;
    editedRental.maintenance = maintenance;
    localStorage.setItem('rental'+this.selectedRental.count,JSON.stringify(editedRental));
    this.cancelSelected();
    this.rentalsArray = [];
    this.getRentalsIntoArray();
  }
  hoverColor(element){
    element.style.backgroundColor = "rgb(0, 78, 88)";
  }
  hoverLeaveColor(element){
    element.style.backgroundColor = "rgb(0, 126, 143)";
  }
  toResizeDiv(){
    document.getElementById('toResize').style.width = "35vw";
  }

}

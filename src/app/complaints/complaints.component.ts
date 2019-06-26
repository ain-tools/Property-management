import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('counterTenant')){
      this.iTenant = Number(localStorage.getItem('counterTenant')); 
    }else{
      this.iTenant = 0;
    }
    this.getTenantsIntoArray();
  }
  //main functionality
  iTenant;

  tenantsArray=[];
  getTenantsIntoArray(){
    for(let i = 1; i <= this.iTenant;i++){
      if(localStorage.getItem('tenant'+i)){
        this.tenantsArray.push(JSON.parse(localStorage.getItem('tenant'+i)));
      }
    }
  }
  selectedTenant;
  pastTenant;
  editAndCancelButton=false;
  selectTenant(count){
    this.selectedTenant = JSON.parse(localStorage.getItem('tenant'+count));
    document.getElementById(count).style.borderColor = "white";
    if(this.pastTenant){
      document.getElementById(this.pastTenant).style.borderColor = "transparent";
    }
    this.pastTenant = count;
    (<HTMLInputElement>document.getElementById('name')).value = this.selectedTenant.name;
    (<HTMLInputElement>document.getElementById('complaint')).value = this.selectedTenant.complaint;
    this.editAndCancelButton = true;
  }
  cancelSelected(){
    this.selectedTenant = {};
    (<HTMLInputElement>document.getElementById('name')).value = "";
    (<HTMLInputElement>document.getElementById('complaint')).value = "";
    this.editAndCancelButton = false;
    document.getElementById(this.pastTenant).style.borderColor = "transparent";
    this.pastTenant = 0;
  }
  createComplaint(complaint){
    let editedComplaint = JSON.parse(localStorage.getItem('tenant'+this.selectedTenant.count));
    editedComplaint.complaint = complaint;
    localStorage.setItem('tenant'+this.selectedTenant.count,JSON.stringify(editedComplaint));
    this.cancelSelected();
    this.tenantsArray = [];
    this.getTenantsIntoArray();
  }
  //esthetics
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

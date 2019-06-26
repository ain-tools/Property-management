import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

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
  selectedTenant;
  pastTenant;
  tenantHistory;
  addSelectedId(count,name){
    this.selectedTenant = name; 
    document.getElementById(count).style.borderColor = "white";
    this.getTenantDetails(count);
    if(this.pastTenant){
      document.getElementById(this.pastTenant).style.borderColor = "transparent";
    }
    this.pastTenant = count;
  }
  createTenant(name,phone,email,age,pets,notes){
    let tenantObj = {
      name:name,
      phone:phone,
      email:email,
      age:age,
      pets:pets,
      notes:notes,
      count:this.iTenant + 1
    }
    this.iTenant ++;
    localStorage.setItem('tenant'+this.iTenant,JSON.stringify(tenantObj));
    localStorage.setItem('counterTenant',this.iTenant);
    this.tenantsArray=[];
    this.getTenantsIntoArray();
  }
  tenantsArray=[];
  getTenantsIntoArray(){
    for(let i = 1; i <= this.iTenant;i++){
      if(localStorage.getItem('tenant'+i)){
        this.tenantsArray.push(JSON.parse(localStorage.getItem('tenant'+i)));
      }
    }
  }
  tenantDetails;
  getTenantDetails(count){
    this.tenantDetails = JSON.parse(localStorage.getItem('tenant'+count));
    (<HTMLInputElement>document.getElementById('name')).value = this.tenantDetails.name;
    (<HTMLInputElement>document.getElementById('phone')).value = this.tenantDetails.phone;
    (<HTMLInputElement>document.getElementById('email')).value = this.tenantDetails.email;
    (<HTMLInputElement>document.getElementById('age')).value = this.tenantDetails.age;
    (<HTMLInputElement>document.getElementById('pets')).value = this.tenantDetails.pets;
    (<HTMLInputElement>document.getElementById('notes')).value = this.tenantDetails.notes;
    document.getElementById('addButton').style.display = "none";
    document.getElementById('modifyButton').style.display = "block";
    document.getElementById('cancelButton').style.display = "block";
  }

  modifyTenant(name,phone,email,age,pets,notes){
    let modifiedTenant = {
      name:name,
      phone:phone,
      email:email,
      age:age,
      pets:pets,
      notes:notes,
      count:this.tenantDetails.count
    }
    localStorage.setItem('tenant'+this.tenantDetails.count,JSON.stringify(modifiedTenant));
    this.tenantsArray=[];
    this.getTenantsIntoArray();
    this.cancelTenantSelect();
  }
  cancelTenantSelect(){
    (<HTMLInputElement>document.getElementById('name')).value = "";
    (<HTMLInputElement>document.getElementById('phone')).value = "";
    (<HTMLInputElement>document.getElementById('email')).value = "";
    (<HTMLInputElement>document.getElementById('age')).value = "";
    (<HTMLInputElement>document.getElementById('pets')).value = "";
    (<HTMLInputElement>document.getElementById('notes')).value = "";
    document.getElementById('addButton').style.display = "block";
    document.getElementById('modifyButton').style.display = "none";
    document.getElementById('cancelButton').style.display = "none";
    document.getElementById(this.tenantDetails.count).style.borderColor = "transparent";
    this.tenantsArray=[];
    this.getTenantsIntoArray();
    this.pastTenant = 0;
  }
  //esthetics
  hoverColor(element){
    element.style.backgroundColor = "rgb(0, 78, 88)";
  }
  hoverLeaveColor(element){
    element.style.backgroundColor = "rgb(0, 126, 143)";
  }
  hoverColor1(element){
    element.style.backgroundColor = "rgb(44, 47, 51)";
  }
  hoverLeaveColor1(element){
    element.style.backgroundColor = "#23272a";
  }
}

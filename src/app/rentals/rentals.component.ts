import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('counter')){
      this.i = Number(localStorage.getItem('counter')); 
    }else{
      this.i = 0;
    }
    if(localStorage.getItem('counterTenant')){
      this.iTenant = Number(localStorage.getItem('counterTenant')); 
    }else{
      this.iTenant = 0;
    }
    //get user data
    this.getRentalsIntoArray();
    this.getTenantsIntoArray();
    this.getTenantComplaints();
    //get statistics info
    this.getPaid();
    this.getIncome();
    this.initiateCharts();

  }


  //MAIN FUNCTIONALITY
  i;
  iTenant;
  selectedTenant;
  pastTenant;
  tenantHistory;
  addSelectedId(count,name){
    document.getElementById("createRental").style.display = "block";
    this.pastTenant = this.tenantHistory;
    this.tenantHistory = count;
    this.selectedTenant = name; 
    document.getElementById(count).style.borderColor = "white";
    if(document.getElementById(this.pastTenant)){
      document.getElementById(this.pastTenant).style.borderColor = "transparent";
    }
  }
  createRental(type,rent,address){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var yyyy_MM_dd = `${year}/${month}/${day}`; 
    let rentalObj = {
      type:type,
      rent:rent,
      address:address,
      tenant:this.selectedTenant,
      date: yyyy_MM_dd,
      paid: false,
      count: this.i +1
    }
    this.i ++;
    localStorage.setItem('rental'+this.i,JSON.stringify(rentalObj));
    localStorage.setItem('counter',this.i);
    document.getElementById("createRental").style.display = "none";
    this.switchPage();
    this.tenantsArray=[];
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    this.getTenantsIntoArray();
    this.getTenantComplaints();
    this.getPaid();
    this.getIncome();
    this.initiateCharts();
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
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    this.getTenantsIntoArray();
    this.getTenantComplaints();
  }
  tenantsArray=[];
  getTenantsIntoArray(){
    for(let i = 1; i <= this.iTenant;i++){
      if(localStorage.getItem('tenant'+i)){
        this.tenantsArray.push(JSON.parse(localStorage.getItem('tenant'+i)));
      }
    }
  }
  rentalsArray=[];
  getRentalsIntoArray(){
    for(let i = 1; i <= this.i;i++){
      if(localStorage.getItem('rental'+i)){
        this.rentalsArray.push(JSON.parse(localStorage.getItem('rental'+i)));
      }
    }
  }

  paidToggle(count){
    let rentalObj;
    rentalObj = JSON.parse(localStorage.getItem('rental'+count));
    rentalObj.paid = !rentalObj.paid;
    localStorage.setItem('rental'+count,JSON.stringify(rentalObj));
    this.tenantsArray=[];
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    this.getTenantsIntoArray();
    this.getTenantComplaints();
    this.getPaid();
    this.getIncome();
    this.initiateCharts();
  }

  deleteRental(count){
    localStorage.removeItem('rental'+count);
    this.tenantsArray=[];
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    this.getTenantsIntoArray();
    this.getTenantComplaints();
    this.getPaid();
    this.getIncome();
    this.initiateCharts();
  }

  paid=0;
  notPaid=0;
  getPaid(){
    this.paid = 0;
    this.notPaid = 0;
    for(let i = 1; i <= this.i; i++){
      if(localStorage.getItem('rental'+i)){
        let rentalObj;
        rentalObj = JSON.parse(localStorage.getItem('rental'+i));
        if(rentalObj.paid){
          this.paid = this.paid + 1;
        }else{
          this.notPaid = this.notPaid + 1;
        }
      }
    }
  }
  income=0;
  getIncome(){
    this.income = 0;
    for(let i = 1; i <= this.i; i++){
      if(localStorage.getItem('rental'+i)){
        let rentalObj;
        rentalObj = JSON.parse(localStorage.getItem('rental'+i));
        this.income = this.income + Number(rentalObj.rent);
      }
    }
  }

  initiateCharts(){
    document.getElementById('secondPage').style.display = "none";
    //@ts-ignore
    var ctx2 = document.getElementById('myChart').getContext('2d');
    //@ts-ignore
    var ctx3 = document.getElementById('myChart2').getContext('2d');
    //@ts-ignore
    var ctx = document.getElementById('myChart3').getContext('2d');
    //@ts-ignore
    var chart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ["Paid","Not-Paid"],
          datasets: [{
              label: "Paid vs Not-Paid",
              backgroundColor: ['rgb(0, 126, 143)','rgb(17, 83, 92)'],
              borderColor: 'white',
              data: [this.paid,this.notPaid],
          }]
          
      },
      options: {}
  });
  var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var yyyy_MM_dd = `${year}/${month}/${day}`; 
  //@ts-ignore
  var chart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ["Beginning",yyyy_MM_dd],
        datasets: [{
            label: "Total Rental Income Per Month ($)",
            backgroundColor: 'rgb(0, 126, 143)',
            borderColor: 'white',
            data: [0,this.income],
        }]
        
    },
    options: {}
});
//@ts-ignore
var chart3 = new Chart(ctx3, {
  type: 'bar',
  data: {
      labels: this.tenantsComplaintsNames,
      datasets: [{
          label: "Complaints",
          backgroundColor: 'rgb(0, 126, 143)',
          borderColor: 'white',
          data: this.tenantsComplaintsNumber,
      }]
      
  },
  options: {}
});
  this.switchPages();
  }

  addMaintenance(){
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    document.getElementById('addMaintenance').style.display = "none";
    document.getElementById('maintenance').style.display = "block";
  }
  goBackMaintenance(){
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    document.getElementById('addMaintenance').style.display = "block";
    document.getElementById('maintenance').style.display = "none";
  }

  tenantsComplaintsNames = [];
  tenantsComplaintsNumber = [];
  getTenantComplaints(){
    for(let i = 1 ; i <= this.iTenant ; i++){
        let tenantComplaintOBJ = JSON.parse(localStorage.getItem('tenant'+i));
        this.tenantsComplaintsNames.push(tenantComplaintOBJ.name);
        if(tenantComplaintOBJ.complaint){
          this.tenantsComplaintsNumber.push(1);
        }else{
          this.tenantsComplaintsNumber.push(0);
        }
      }
  }

  searchByUnit(searchTerm){
    for(let i = 1 ; i <= this.i ; i++){
      let rentalOBJ = JSON.parse(localStorage.getItem('rental'+i));
      if(rentalOBJ.address == searchTerm){
        this.matchedRentalOBJ = rentalOBJ;
        this.toggleSearchDisplay = true;
      }
    }
  }
  matchedRentalOBJ;
  toggleSearchDisplay=false;
  closeSearchDisplay(){
    this.toggleSearchDisplay = false;
  }

  pastTenantEdit;
  tenantHistoryEdit;
  selectedTenantEdit;
  addSelectedIdEdit(count,name){
    this.pastTenantEdit = this.tenantHistoryEdit;
    this.tenantHistoryEdit = count;
    this.selectedTenantEdit = name;
    this.matchedRentalOBJ.tenant = this.selectedTenantEdit;
    document.getElementById(count).style.borderColor = "white";
    if(document.getElementById(this.pastTenantEdit)){
      document.getElementById(this.pastTenantEdit).style.borderColor = "transparent";
    }
  }
  editRental(type,rent,address,tenant){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var yyyy_MM_dd = `${year}/${month}/${day}`; 
    let rentalOBJ = {
      type:type,
      rent:rent,
      address:address,
      tenant:tenant,
      date: yyyy_MM_dd,
      paid: this.matchedRentalOBJ.paid,
      count: this.matchedRentalOBJ.count,
      maintenance: this.matchedRentalOBJ.maintenance
    }
    localStorage.setItem('rental'+this.matchedRentalOBJ.count,JSON.stringify(rentalOBJ));
    this.closeSearchDisplay();
    this.tenantsArray=[];
    this.rentalsArray=[];
    this.getRentalsIntoArray();
    this.getTenantsIntoArray();
    this.getTenantComplaints();
    this.getPaid();
    this.getIncome();
    this.initiateCharts();
  }
  //ESTHETICS

  incCount = 0;
  stat1:boolean=true;
  stat2:boolean=false;
  stat3:boolean=false;
  changeStat(){
    this.incCount = this.incCount + 1;
    this.switchPages();
  }
  changeStat1(){
    this.incCount = this.incCount - 1;
    this.switchPages();
  }
  switchPages(){
    if(this.incCount==0){
      document.getElementById('titleStat').innerHTML = "Total Rental Income";
      document.getElementById('myChart').style.display = "block";
      document.getElementById('myChart2').style.display = "none";
      document.getElementById('myChart3').style.display = "none";
    }else if(this.incCount == 1){
      document.getElementById('titleStat').innerHTML = "Complaints From Tenants";
      document.getElementById('myChart2').style.display = "block";
      document.getElementById('myChart').style.display = "none";
      document.getElementById('myChart3').style.display = "none";
    }else if(this.incCount == 2){
      document.getElementById('titleStat').innerHTML = "Payment Status";
      document.getElementById('myChart2').style.display = "none";
      document.getElementById('myChart').style.display = "none";
      document.getElementById('myChart3').style.display = "block";
    }else{
      this.incCount = 0;
      this.switchPages();
    }
  }
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
  pageBool:boolean=false;
  switchPage(){
    if(!this.pageBool){
      document.getElementById('firstPage').style.display = "none";
      document.getElementById('secondPage').style.display = "block";
      this.pageBool = true;
    }else{
      document.getElementById('firstPage').style.display = "block";
      document.getElementById('secondPage').style.display = "none";
      this.pageBool = false;
    }
    
  }

}

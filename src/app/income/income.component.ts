import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('incomeCounter')){
      this.incomeCounter = Number(localStorage.getItem('incomeCounter'));
    }else{
      this.incomeCounter = 0;
      localStorage.setItem('incomeCounter','0');
    }
    if(localStorage.getItem('expenseCounter')){
      this.expenseCounter = Number(localStorage.getItem('expenseCounter'));
    }else{
      this.expenseCounter = 0;
      localStorage.setItem('expenseCounter','0');
    }
    if(localStorage.getItem('counter')){
      this.i = Number(localStorage.getItem('counter')); 
    }else{
      this.i = 0;
    }
    this.getIncomeToArray();
    this.getExpenseToArray();
    this.getNetTotal();
    this.getIncome();
    this.combineIncomeAndExpenseArray();

  }
  isExpenseOrIncome=false;
  toggleExpense(number){
    if(number == 1){
      document.getElementById('expense').style.backgroundColor = "#2c2f33";
      document.getElementById('income').style.backgroundColor = "#474c53";
      this.isExpenseOrIncome = false;
    }else{
      document.getElementById('income').style.backgroundColor = "#2c2f33";
      document.getElementById('expense').style.backgroundColor = "#474c53";
      this.isExpenseOrIncome = true;
    }
  }
  i;
  //main functionality
  incomeCounter;
  expenseCounter;
  createIncome(from,tag,date,currency,amount,note){
    this.incomeCounter = this.incomeCounter+1;
    let incomeObj = {
      from:from,
      tag:tag,
      date:date,
      currency:currency,
      amount:amount,
      note:note,
      type:'Income',
      counter: this.incomeCounter
    }
    localStorage.setItem('incomeCounter',this.incomeCounter);
    localStorage.setItem('income'+this.incomeCounter,JSON.stringify(incomeObj));
    (<HTMLInputElement>document.getElementById('from1')).value = "";
    (<HTMLInputElement>document.getElementById('tag1')).value = "";
    (<HTMLInputElement>document.getElementById('date1')).value = "";
    (<HTMLInputElement>document.getElementById('currency1')).value = "";
    (<HTMLInputElement>document.getElementById('amount1')).value = "";
    (<HTMLInputElement>document.getElementById('notes1')).value = "";
    this.incomeArray=[];
    this.expenseArray=[];
    this.combinedArray=[];
    this.netTotal = 0;
    this.getIncomeToArray();
    this.getExpenseToArray();
    this.getNetTotal();
    this.getIncome();
    this.combineIncomeAndExpenseArray();
  }
  incomeArray=[];
  getIncomeToArray(){
    for(let i = 1; i<=this.incomeCounter;i++){
      if(localStorage.getItem('income'+i)){
        this.incomeArray.push(JSON.parse(localStorage.getItem('income'+i)))
      }
    }
  }
  createExpense(from,tag,date,currency,amount,note){
    this.expenseCounter = this.expenseCounter+1;
    let expenseObj = {
      from:from,
      tag:tag,
      date:date,
      currency:currency,
      amount:amount,
      note:note,
      type:'Expense',
      counter: this.expenseCounter
    }
    localStorage.setItem('expenseCounter',this.expenseCounter);
    localStorage.setItem('expense'+this.expenseCounter,JSON.stringify(expenseObj));
    (<HTMLInputElement>document.getElementById('from')).value = "";
    (<HTMLInputElement>document.getElementById('tag')).value = "";
    (<HTMLInputElement>document.getElementById('date')).value = "";
    (<HTMLInputElement>document.getElementById('currency')).value = "";
    (<HTMLInputElement>document.getElementById('amount')).value = "";
    (<HTMLInputElement>document.getElementById('notes')).value = "";
    this.incomeArray=[];
    this.expenseArray=[];
    this.combinedArray=[];
    this.netTotal = 0;
    this.getIncomeToArray();
    this.getExpenseToArray();
    this.getNetTotal();
    this.getIncome();
    this.combineIncomeAndExpenseArray();
  }
  expenseArray=[];
  getExpenseToArray(){
    for(let i = 1; i<=this.expenseCounter;i++){
      if(localStorage.getItem('expense'+i)){
        this.expenseArray.push(JSON.parse(localStorage.getItem('expense'+i)))
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
  netTotal=0;
  getNetTotal(){
    for(let i=1;i<=this.expenseCounter;i++){
      this.netTotal = this.netTotal - Number(JSON.parse(localStorage.getItem('expense'+i)).amount);
    }
    for(let i=1;i<=this.incomeCounter;i++){
      this.netTotal = this.netTotal + Number(JSON.parse(localStorage.getItem('income'+i)).amount);
    }
  }
  combinedArray=[];
  iBounce = 0;
  combineIncomeAndExpenseArray(){
    if(this.expenseArray.length < this.incomeArray.length || this.expenseArray.length == this.incomeArray.length){
      for(let i=0; i<this.incomeArray.length;i++){
        this.incomeArray[i].count = this.iBounce;
        this.combinedArray.push(this.incomeArray[i]);
        if(this.expenseArray[i]){
          this.expenseArray[i].count = this.iBounce+1;
          this.combinedArray.push(this.expenseArray[i]);
          this.iBounce = this.iBounce+2;
        }else{
          this.iBounce = this.iBounce+1;
        }
      }
    }else{
      for(let i=0; i<this.expenseArray.length;i++){
        this.expenseArray[i].count = this.iBounce;
        this.combinedArray.push(this.expenseArray[i]);
        if(this.incomeArray[i]){
          this.incomeArray[i].count = this.iBounce+1;
          this.combinedArray.push(this.incomeArray[i]);
          this.iBounce = this.iBounce+2;
        }else{
          this.iBounce = this.iBounce+1;
        }
      }
    }
  }
  toggleNotes(count){
      document.getElementById('noteDisplay').style.display="block";
      document.getElementById('noteTest').innerHTML = this.combinedArray[count].note;
  }
  closeNote(){
    document.getElementById('noteDisplay').style.display = "none";
  }
  //esthetics
  hoverColor(element){
    element.style.backgroundColor = "rgb(0, 78, 88)";
  }
  hoverLeaveColor(element){
    element.style.backgroundColor = "rgb(0, 126, 143)";
  }


}

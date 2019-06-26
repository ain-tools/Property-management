import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ans1 = false;
  ans2 = false;
  ans3 = false;
  ans4 = false;

  showAnswer(num,element){
    if(num == 1){
      this.ans1 = !this.ans1;
      if(this.ans1){
        element.style.height = "8vw"
      }else{
      element.style.height = "3vw"
      }
    }else if(num == 2){
      this.ans2 = !this.ans2;
      if(this.ans2){
        element.style.height = "5vw"
      }else{
      element.style.height = "3vw"
      }
    }else if(num == 3){
      this.ans3 = !this.ans3;
      if(this.ans3){
        element.style.height = "10vw"
      }else{
      element.style.height = "3vw"
      }
    }
    else if(num == 4){
      this.ans4 = !this.ans4;
      if(this.ans4){
        element.style.height = "7vw"
      }else{
      element.style.height = "3vw"
      }
    }
  }

}

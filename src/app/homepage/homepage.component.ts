import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var d = new Date();
    this.dateYear = d.getFullYear();
  }
  dateYear;
  hoverColor(element){
    element.style.backgroundColor = "rgb(20, 20, 20)";
  }
  hoverLeaveColor(element){
    element.style.backgroundColor = "#2c2f33";
  }
  hoverLeaveColor1(element){
    element.style.backgroundColor = "#23272a";
  }
  page1=true;
  page2=false;
  page3=false;
  page4=false;
  page5=false;
  page6=false;
  page7=false;
  switchPage(page){
    if(page == 1){
      this.page1=true;
      this.page2=false;
      this.page3=false;
      this.page4=false;
      this.page5=false;
      this.page6=false;
      this.page7=false;
    }else if(page == 2){
      this.page1=false;
      this.page2=true;
      this.page3=false;
      this.page4=false;
      this.page5=false;
      this.page6=false;
      this.page7=false;
    }else if(page == 3){
      this.page1=false;
      this.page2=false;
      this.page3=true;
      this.page4=false;
      this.page5=false;
      this.page6=false;
      this.page7=false;
    }else if(page == 4){
      this.page1=false;
      this.page2=false;
      this.page3=false;
      this.page4=true;
      this.page5=false;
      this.page6=false;
      this.page7=false;
    }else if(page == 5){
      this.page1=false;
      this.page2=false;
      this.page3=false;
      this.page4=false;
      this.page5=true;
      this.page6=false;
      this.page7=false;
    }else if(page == 6){
      this.page1=false;
      this.page2=false;
      this.page3=false;
      this.page4=false;
      this.page5=false;
      this.page6=true;
      this.page7=false;
    }else if(page == 7){
      this.page1=false;
      this.page2=false;
      this.page3=false;
      this.page4=false;
      this.page5=false;
      this.page6=false;
      this.page7=true;
    }
  }

}

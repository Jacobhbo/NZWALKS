import { Component } from '@angular/core';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
// ng g c components/crud
// ng serve -o   starter webserver op og åbner browser
// ctrl +c stopper webserver, skal stå inde i terminal
export class CrudComponent {
  navne:string[] = ["Palle", "Lone", "Lars"];

  create(data:string):void{this.navne.push(data);}
  delete():void{ this.navne.pop(); console.log("deleting");
  }





  getall():void{ console.log(this.navne);}




  update(data:string,newdata:string):void{
    let temp = this.navne.filter(x=>x.toLowerCase().indexOf(data.toLowerCase())>-1);
    console.log(temp);
    this.navne[this.navne.indexOf(temp[0])]=newdata;
    console.log("<br>"+this.navne);
  }






  testingPrombt():void{
    let data = prompt("Skriv noget");
    console.log(data);
  }
  ngOnInit(){
    this.create("Ib");
    this.update("Lone","Lone the Great");
    this.delete();
    this.getall();
   // this.testingPrombt();
  }
}
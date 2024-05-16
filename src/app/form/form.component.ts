import { SelectorListContext } from '@angular/compiler';
import { Component,ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  todo_item: FormGroup;
  //TODO: Change todolist to include task_date, where null means no date
  todo_list = [];
  listContainer: any;
  tomorrow = new Date();
  dateControl: any;
    /*
  data = [
    todo_item: "someitem",
    is_done: false,
    date: null;
  ]
  */

    constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {

    this.listContainer = document.querySelector('.list-container');
    this.todo_item = new FormGroup({
    item: new FormControl("",[Validators.required,Validators.minLength(3)]),
  })
    this.todo_list = JSON.parse(localStorage.getItem("data") || "[]");
    this.dateControl = new FormControl('', []);
  }

    handleClick(item: any) {
    console.log(`you clicked ${item}`);
    if(item.is_done == "clicked"){
      item.is_done = "";
    }
    else{
      item.is_done = "clicked";
    }
    localStorage.setItem("data", JSON.stringify(this.todo_list));
  }

  deleteItem(index: number){
    this.todo_list.splice(index,1);
    localStorage.setItem("data", JSON.stringify(this.todo_list));
  }

    onSubmit(){
    //delete please
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
   let todo_element = {
        todo_item: this.todo_item.get('item')?.value,
        is_done: false,
        //date: this.tomorrow.toISOString().split('T')[0]
        //date: new Date().toISOString().split('T')[0]
    }
    this.todo_list.unshift(todo_element);
    this.todo_item.reset();
    localStorage.setItem("data", JSON.stringify(this.todo_list));
  //let date = new Date();
  //console.log(`${date.getTime()}:${date.getMonth() + 1}:${date.getFullYear()}`);
  }

  //Get the current date , NOTE : Day is in index 0
  test_ing(){
    let current_date = this.dateControl.value.toString().split(' ');
    console.log(`current date: ${current_date[1]}:${current_date[2]}:${current_date[3]}`);
  }

   onItemInput(event: any) {
    const enteredValue = event.target.value;
    console.log('User typed:', enteredValue);
    // Perform any additional actions based on the entered value here
  }

}

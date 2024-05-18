import { SelectorListContext } from '@angular/compiler';
import { Component,ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';

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
  dateControl: any;
  Filter= "not_filtered";
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
    date: new FormControl("")
  })
    this.todo_list = JSON.parse(localStorage.getItem("data") || "[]");
    this.dateControl = new FormControl('', []);
  }

    handleClick(item: any) {
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
   let todo_element = {
        todo_item: this.todo_item.get('item')?.value,
        is_done: false,
        date: (() => {
          //Returns a an array of either 1 (no date provided) or 4 elements
          if (this.todo_item.get('date')?.value != null) {
            let selectedDate = this.todo_item.get('date')?.value.toString().split(' ');
            if (selectedDate.length > 1)
               return date_handler(selectedDate);
            return null;
          }
          return null;
        })()
    }
    if(todo_element.date === null){
      //remove date from the list
      delete todo_element.date;
    }
    this.todo_list.unshift(todo_element);
    this.todo_item.reset();
    localStorage.setItem("data", JSON.stringify(this.todo_list));

    //hide the form after submission :: decide leave or remove
    let form_input = document.getElementsByClassName("form-input");
    form_input!.item(0)!.setAttribute("style","display:none");
  }

  //Get the current date , NOTE : Day is in index 0
  test_ing(){
    let current_date = this.dateControl.value.toString().split(' ');
    console.log(`${current_date[1]}:${current_date[2]}:${current_date[3]}`);
  }

   onItemInput(event: any) {
    const enteredValue = event.target.value;
    console.log('User typed:', enteredValue);
    // Perform any additional actions based on the entered value here
  }

  filter_setToday(){
    this.Filter = "Today";
  }
  filter_setCompleted(){
    this.Filter = "Completed";
  }
  filter_setNotcompleted(){
    this.Filter = "Not_Completed";
  }
  unfilter(){
    this.Filter = "not_filtered";
  }
  unhide(){
    //get element with id form-input and set it to display to flex
    let form_input = document.getElementsByClassName("form-input");
    form_input!.item(0)!.setAttribute("style","display:flex");
  }

}

function date_handler(selectedDate: any){
  let today = new Date();
  let today_date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  if(today_date > `${selectedDate[2]}/${selectedDate[1]}/${selectedDate[3]}`)
    return null
  return (`${selectedDate[0]}  ${selectedDate[2]}/${selectedDate[1]}/${selectedDate[3]}`);
}

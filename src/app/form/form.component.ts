import { SelectorListContext } from '@angular/compiler';
import { Component,ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  todo_item: FormGroup;
  todo_list = [];
  listContainer: any;
    /*
  data = [
    todo_item: "someitem",
    is_done: false
  ]
  */

    constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {

    this.listContainer = document.querySelector('.list-container');
    this.getData('todo_list');
    this.todo_item = new FormGroup({
    item: new FormControl("",[Validators.required,Validators.minLength(3)]),
  })
  this.todo_list = JSON.parse(localStorage.getItem("data") || "[]");
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
    //console.log(this.todo_item.get('item')?.value);
    //console.log(this.todo_item.valid);
    //this.todo_list.unshift(this.todo_item.get('item')?.value);
    //console.log(this.todo_item.get('item'));
    let todo_element = {
        todo_item: this.todo_item.get('item')?.value,
        is_done: false
    }
    this.todo_list.unshift(todo_element);
    //to solve this issue set strict to false
    //console.log(this.todo_item.get('item')?.value);
    //console.log(todo_element.todo_item);
    this.todo_item.reset();
    //this.saveData('todo_list', JSON.stringify(this.todo_list));
    localStorage.setItem("data", JSON.stringify(this.todo_list));
    //console.log(JSON.stringify(this.todo_list))
  }

  //TODO: Delete those
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

}

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
    /*
  data = [
    todo_item: "someitem",
    is_done: false
  ]
  */

    constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.todo_item = new FormGroup({
    item: new FormControl("",[Validators.required,Validators.minLength(3)]),
  })
  }

    handleClick(item: any) {
    console.log(`you clicked ${item}`);
    if(item.is_done == "clicked"){
      item.is_done = "";
    }
    else{
      item.is_done = "clicked";
    }
  }

  deleteItem(index: number){
    this.todo_list.splice(index,1);
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
    console.log(todo_element.todo_item);
    this.todo_item.reset();
  }

}

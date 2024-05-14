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

    constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.todo_item = new FormGroup({
    item: new FormControl("",[Validators.required,Validators.minLength(3)]),
  })
  }

    handleClick(item: any) {
    console.log(`you clicked ${item}`);
  }

    onSubmit(){
    //console.log(this.todo_item.get('item')?.value);
    //console.log(this.todo_item.valid);
    //this.todo_list.unshift(this.todo_item.get('item')?.value);
    //console.log(this.todo_item.get('item'));
    this.todo_list.unshift(this.todo_item.get('item')?.value);
    //to solve this issue set strict to false
    //console.log(this.todo_item.get('item')?.value);
    this.todo_item.reset();
  }

    //pass todo_list
  getTodoList(){
    return this.todo_list;
  }


}

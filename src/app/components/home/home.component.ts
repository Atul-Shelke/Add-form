import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private toastr: ToastrService
  ) { }
  forms: FormGroup[] = [];

  ngOnInit(): void {
    this.addForm();
  }
  //adds a new form 
  addForm() {
    const form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: ['', [Validators.required, Validators.min(21)]]
    });
    this.forms.push(form);
  }

  //submit the form
  onSubmit(index: number) {
    if (this.forms[index].valid) {
      console.log(`Form ${index + 1} Submitted`, this.forms[index].value);
      this.toastr.success(`Form ${index + 1} Submitted`);
    }
    else {
      this.toastr.error('Required fields are missing')
    }
  }
  //get value of all forms
  saveAll() {
    const validForms = this.forms.filter(form => form.valid);
    if (validForms.length > 0) {
      const validFormsData = validForms.map(form => form.value);
      console.log('Valid Forms Data:', validFormsData);
      this.toastr.success("All Forms Submitted");
    } else {
      console.log('No valid forms to save.');
      this.toastr.error('Required fields are missing')
    }
  }



}

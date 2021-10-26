import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { JobCategories } from 'src/app/models';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent implements OnInit {
  srcResult: any;
  constructor() {}

  public submitted: boolean = false;

  public newJobForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    requierments: new FormControl(),
    salary: new FormControl(),
    area: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    companyImageUrl: new FormControl(),
    imageUrl: new FormControl(),
    category: new FormControl('', Validators.required),
    hot: new FormControl(false),
    forStudents: new FormControl(false, Validators.required),
    timestamp: new FormControl(),
  });

  get f(): { [key: string]: AbstractControl } {
    return this.newJobForm.controls;
  }

  get jobCategories(): typeof JobCategories {
    return JobCategories;
  }

  ngOnInit(): void {}

  submit() {
    this.submitted = true;
    console.log(this.newJobForm);
  }
  onFileSelected(event) {
    const file: any = event.target.files[0];
    console.log(file);

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e);
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(file);
      //https://www.geeksforgeeks.org/angular-file-upload/
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Errors, JwtService, UserService } from '../core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors;
  isSubmitting = false;
  authFormData: FormGroup;
  formattedData: Array<string> = [];

  constructor(private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    private jwtService: JwtService,
    private fb: FormBuilder) {
    this.authFormData = this.fb.group({
      'userId': ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submit() {
    if (!this.jwtService.getToken()) {
      this.errors = { errors: { "data": "auth error"} }
    }else{
      this.isSubmitting = true;
      this.errors = { errors: {} };
      console.log(this.authFormData.get('userId').value);
      this.userService.data(this.authFormData.get('userId').value).subscribe(
        (data) => {
          console.log(data);
          data;
          this.formattedData = Object.keys(data || {})
          .map(key => `${key}: ${data[key]}`);
        },
        (err) => {
          this.formattedData = [];
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    
    }
  }
}

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export class Professor
{

  professorname: string = '';
  professorid: string = 'empty';
  email: string = '';
  degreecompleted: string = '';
  institutionname: string = '';
  department: string = '';
  experience: string = '';
  gender: string = '';
  mobile: string = '';
  password: string = '';
  confirmPassword: string = '';
  status: string = 'false';
  certified: any;

  constructor() {}
    
}

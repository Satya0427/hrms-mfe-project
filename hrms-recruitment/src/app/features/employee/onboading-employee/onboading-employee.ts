import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboading-employee',
  imports: [MATERIAL, FormsModule, CommonModule],
  templateUrl: './onboading-employee.html',
  styleUrl: './onboading-employee.scss',
})
export class OnboadingEmployee {

  displayedColumns = [
    'select',
    'name',
    'role',
    'department',
    'mobile',
    'joiningDate',
    'email',
    'gender',
    'address'
  ];

  employees = [
    {
      avatar: 'https://i.pravatar.cc/40?img=1',
      name: 'John Doe',
      role: 'Developer',
      department: 'Java',
      mobile: '1234567890',
      joiningDate: '03/01/2018',
      email: 'john.doe@email.com',
      gender: 'Male',
      address: '123 Elm Street'
    },
    {
      avatar: 'https://i.pravatar.cc/40?img=2',
      name: 'Jane Smith',
      role: 'Designer',
      department: 'UI/UX',
      mobile: '2345678901',
      joiningDate: '05/20/2019',
      email: 'jane.smith@email.com',
      gender: 'Female',
      address: '456 Oak Avenue'
    }
  ];

}

import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-organization-create',
  imports: [MATERIAL,CommonModule,RouterModule],
  templateUrl: './organization-create.html',
  styleUrl: './organization-create.scss',
})
export class OrganizationCreate {

}

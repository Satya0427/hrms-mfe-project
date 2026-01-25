import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-organization-edit',
  imports: [MATERIAL,CommonModule,RouterModule],
  templateUrl: './organization-edit.html',
  styleUrl: './organization-edit.scss',
})
export class OrganizationEdit {

}

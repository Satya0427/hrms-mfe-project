import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-global-admin-edit',
  imports: [MATERIAL, CommonModule, RouterModule,FormsModule],
  templateUrl: './global-admin-edit.html',
  styleUrl: './global-admin-edit.scss',
})
export class GlobalAdminEdit {
  admin = {
    name: 'Manikanta Yalla',
    email: 'admin@spryple.com',
    mobile: '+91 98765 43210',
    organization: 'Spryple Technologies',
    role: 'Global Admin'
  };
}

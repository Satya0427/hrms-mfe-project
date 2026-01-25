import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-global-admin-create',
  imports: [MATERIAL, RouterModule],
  templateUrl: './global-admin-create.html',
  styleUrl: './global-admin-create.scss',
})
export class GlobalAdminCreate {

}

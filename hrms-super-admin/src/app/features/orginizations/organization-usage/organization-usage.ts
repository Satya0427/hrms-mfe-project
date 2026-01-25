import { Component } from '@angular/core';
import { MATERIAL } from '../../../shared/material/materials';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-organization-usage',
  imports: [MATERIAL, CommonModule, RouterLink],
  templateUrl: './organization-usage.html',
  styleUrl: './organization-usage.scss',
})
export class OrganizationUsage {

}

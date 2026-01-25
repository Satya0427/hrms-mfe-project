import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MATERIAL } from '../../../shared/material/materials';

@Component({
  selector: 'app-platform-module-create',
  imports: [MATERIAL, FormsModule, CommonModule, RouterModule],
  templateUrl: './platform-module-create.html',
  styleUrl: './platform-module-create.scss',
})
export class PlatformModuleCreate {
  module = {
    name: '',
    code: '',
    description: '',
    enabled: true,
    features: [
      { name: '', code: '', enabled: true }
    ]
  };

  addFeature() {
    this.module.features.push({
      name: '',
      code: '',
      enabled: true
    });
  }

  removeFeature(index: number) {
    this.module.features.splice(index, 1);
  }
}

import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MATERIAL } from '../../../shared/material/materials';
import { MatChipInputEvent } from '@angular/material/chips';
import { RouterLink, RouterModule } from "@angular/router";
@Component({
  selector: 'app-requisition-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MATERIAL, RouterModule],
  templateUrl: './requisition-create.html',
  styleUrls: ['./requisition-create.scss'], // ✅ FIXED
  encapsulation: ViewEncapsulation.None

})
export class RequisitionCreate {
  private fb = inject(FormBuilder);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Static Lists
  departments = ['Engineering', 'HR', 'Sales', 'Marketing'];
  locations = ['Bangalore', 'Hyderabad', 'Remote', 'USA'];
  empTypes = ['Full-time', 'Part-time', 'Contract'];
  priorities = ['High', 'Medium', 'Low'];
  managers = ['John Doe', 'Sarah Connor', 'Bruce Wayne'];
  recruiters = ['Jane Smith', 'Tony Stark'];

  reqForm = this.fb.group({
    // Section 1
    title: ['', Validators.required],
    department: ['', Validators.required],
    location: ['', Validators.required],
    employmentType: ['', Validators.required],
    positions: [1, [Validators.required, Validators.min(1)]],
    priority: ['Medium', Validators.required],

    // Section 2
    description: ['', Validators.required],
    skills: [[] as string[]], // Handled by Chip Grid
    experienceRange: ['', Validators.required],
    education: ['', Validators.required],
    salaryMin: [null],
    salaryMax: [null],

    // Section 3
    hiringManager: ['', Validators.required],
    recruiter: ['', Validators.required],
    interviewPanel: [[]], // Multi select

    // Section 4
    approver1: ['', Validators.required], // Manager
    approver2: ['HR Head (Auto)', Validators.required] // HR Head (Pre-filled usually)
  });

  // Skills Chip Logic
  currentSkills: string[] = [];

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.currentSkills.push(value);
      this.reqForm.controls.skills.setValue(this.currentSkills);
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    const index = this.currentSkills.indexOf(skill);
    if (index >= 0) {
      this.currentSkills.splice(index, 1);
      this.reqForm.controls.skills.setValue(this.currentSkills);
    }
  }

  onSubmit(status: 'Draft' | 'Submit') {
    if (this.reqForm.valid) {
      console.log(`Action: ${status}`, this.reqForm.value);
    }
  }
}

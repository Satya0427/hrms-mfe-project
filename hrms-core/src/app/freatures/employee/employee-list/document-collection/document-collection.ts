import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MATERIAL } from '../../../../shared/material/materials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-collection',
  imports: [MATERIAL, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './document-collection.html',
  styleUrl: './document-collection.scss',
})
export class DocumentCollection {
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  activeTab = signal<number>(0); // 0: Details, 1: Compensation, 2: Documents

  // Main Form
  documentForm: FormGroup = this.fb.group({
    // NEW: Documents Array
    documents: this.fb.array([])
  });

  get docArray() {
    return this.documentForm.get('documents') as FormArray;
  }

  constructor() {
    // Initialize Default Documents
    this.addDefaultDoc('PAN Card', true);
    this.addDefaultDoc('Aadhar Card', true);
    this.addDefaultDoc('Bank Passbook / Cheque', true);
  }

  // Helper to create form group for docs
  addDefaultDoc(name: string, required: boolean) {
    const group = this.fb.group({
      docName: [name, Validators.required],
      docNumber: ['', required ? Validators.required : []],
      file: [null, required ? Validators.required : []], // File object
      fileName: [''], // Display name
      previewUrl: [null], // Base64 for preview
      isMandatory: [required]
    });
    // Disable name editing for default docs
    if (required) group.get('docName')?.disable();
    this.docArray.push(group);
  }

  // Handle file selection for existing rows
  onRowFileSelected(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.docArray.at(index).patchValue({
          file: file,
          fileName: file.name,
          previewUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Open Dialog to Add Custom Doc
  openAddDocDialog() {
    // const dialogRef = this.dialog.open(AddDocDialogComponent, {
    //   width: '400px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     const group = this.fb.group({
    //       docName: [result.docName],
    //       docNumber: [result.docNumber],
    //       file: [result.file],
    //       fileName: [result.fileName],
    //       previewUrl: [result.previewUrl],
    //       isMandatory: [false]
    //     });
    //     this.docArray.push(group);
    //   }
    // });
  }

  removeDoc(index: number) {
    this.docArray.removeAt(index);
  }

  // For Icon Display Logic
  isImage(fileName: string): boolean {
    return fileName?.match(/\.(jpeg|jpg|png|gif)$/) != null;
  }
}

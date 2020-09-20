import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NoteComponent implements OnInit {

  notesForm: FormGroup;
  submitted = false;

  // As per requirements, there is a form with validation but the notes wont be persisted
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.notesForm = this.formBuilder.group({
      notes: ['', Validators.required]
    });
  }

  get f(): any { return this.notesForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.notesForm.invalid) {
        return;
    }

    alert(`Your notes are: '${this.notesForm.value.notes}' - (won't be saved)`)
    this.reset();
  }

  reset(): void {
    this.submitted = false;
    this.notesForm.reset();
  }

}

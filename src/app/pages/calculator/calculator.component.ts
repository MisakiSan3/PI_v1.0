import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  sections: { notes: number[], percentage: number }[] = [
    { notes: [], percentage: 0 }
  ];

  addSection() {
    this.sections.push({ notes: [], percentage: 0 });
  }

  removeSection(index: number) {
    this.sections.splice(index, 1);
  }

  addNoteToSection(sectionIndex: number) {
    this.sections[sectionIndex].notes.push(0);
  }

  removeNote(sectionIndex: number, noteIndex: number) {
    this.sections[sectionIndex].notes.splice(noteIndex, 1);
  }

  calculateAverage(notes: number[]): number {
    const sum = notes.reduce((a, b) => a + b, 0);
    return notes.length ? sum / notes.length : 0;
  }

  calculatePercentage(notes: number[], percentage: number): number {
    const average = this.calculateAverage(notes);
    return (average * percentage) / 100;
  }
}
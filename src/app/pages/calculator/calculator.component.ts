import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  sections: { notes: number[], percentage: number, showResultsFlag: boolean }[] = [
    { notes: [], percentage: 0, showResultsFlag: false }
  ];
  showResultsFlag = false;
  currentSection: any = null;
  currentIndex: number | null = null;

  addSection() {
    this.sections.push({ notes: [], percentage: 0, showResultsFlag: false });
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

  validateNoteInput(event: Event, sectionIndex: number, noteIndex: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const validValue = value.replace(/[^0-9.]/g, '');
    this.sections[sectionIndex].notes[noteIndex] = parseFloat(validValue) || 0;
    input.value = validValue;
  }

  calculateAverage(notes: number[]): number {
    const sum = notes.reduce((a, b) => a + b, 0);
    return notes.length ? sum / notes.length : 0;
  }

  calculatePercentage(notes: number[], percentage: number): number {
    const average = this.calculateAverage(notes);
    return (average * percentage) / 100;
  }

  showResults(sectionIndex: number) {
    this.currentSection = this.sections[sectionIndex];
    this.currentIndex = sectionIndex;
    this.showResultsFlag = true;
  }

  closeModal() {
    this.showResultsFlag = false;
  }

}
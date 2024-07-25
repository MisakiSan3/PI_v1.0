import { Component, OnInit } from '@angular/core';
import { RecordModel } from 'src/app/models/record-model.entity';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  records: RecordModel[] = [];
  selectedRecord: number = 0;
  showResultsFlag = false;
  showFinalResultsFlag = false;
  finalGrade: number = 0;
  allGrades: number[] = [];
  currentSection: any = null;
  currentIndex: number | null = null;

  auxRecord: RecordModel = {
    finalGrade: 0,
    sections: [],
    id: "",
    subject: {
      id: "",
      subjectName: "",
      user:{
        email: "",
        id: "",
        password: "",
        username:"",
      } 
    }
  }

  constructor(private recordService: RecordService){}

  ngOnInit(): void {
    this.getRecords();
  }

  async getRecords(){
    this.records = await this.recordService.getrecordListByUser();    
  }

  selectRecord(i: number){
    this.selectedRecord = i;
  }

  addSection() {
    this.records[this.selectedRecord].sections.push({ grades: [], sectionGrade: 0, percentage: 0, showResults: false });
  }

  removeSection(index: number) {
    this.records[this.selectedRecord].sections.splice(index, 1);
    this.calculatePercentage();
  }

  addNoteToSection(sectionIndex: number) {
    this.records[this.selectedRecord].sections[sectionIndex].grades.push(0);
  }

  removeNote(sectionIndex: number, noteIndex: number) {
    this.records[this.selectedRecord].sections[sectionIndex].grades.splice(noteIndex, 1);
    this.calculatePercentage();
  }

  validateNoteInput(event: Event, sectionIndex: number, noteIndex: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const validValue = value.replace(/[^0-9.]/g, '');
    this.records[this.selectedRecord].sections[sectionIndex].grades[noteIndex] = parseFloat(validValue) || 0;
    input.value = validValue;
  }

  calculateAverage(notes: number[]): number {
    const sum = notes.reduce((a, b) => a + b, 0);
    return parseFloat((notes.length ? sum / notes.length : 0).toFixed(2));
  }

  calculatePercentage() {
    let average = 0;
    let auxPercentage = 0;
    this.allGrades = [];
    this.records[this.selectedRecord].sections.forEach(section => {
      average = this.calculateAverage(section.grades);
      section.sectionGrade = parseFloat(((average * section.percentage) / 100).toFixed(2));
      auxPercentage += section.sectionGrade;
      this.allGrades = this.allGrades.concat(section.grades);
    });
    this.finalGrade = parseFloat(auxPercentage.toFixed(2));
  }

  showSectionResults(sectionIndex: number) {
    this.currentSection = this.records[this.selectedRecord].sections[sectionIndex];
    this.currentIndex = sectionIndex;
    this.showResultsFlag = true;
    this.calculatePercentage();
  }

  showFinalResults() {
    this.showFinalResultsFlag = true;
    this.calculatePercentage();
  }

  closeModal() {
    this.showResultsFlag = false;
    this.showFinalResultsFlag = false;
  }

  updateRecord() {
    this.recordService.updaterecord(this.records[this.selectedRecord]);
  }
}

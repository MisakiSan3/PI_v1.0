import { Injectable } from '@angular/core';
import { CreateRecordModel, RecordModel } from '../models/record-model.entity';
import { Observable } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpClient: HttpClient,private tokenService: TokenService, private firestore: Firestore) { }

  //firebase
  readonly collectionUrl: string = "record"

  getrecordList(): Observable<RecordModel[]> {
    const ref = collection(this.firestore, this.collectionUrl)
    const docs = collectionData(ref,{"idField":"id"}) as Observable<RecordModel[]>;
    return docs;
  }

  deleterecord(record: RecordModel): Promise<void> {
    const docRef = doc(this.firestore, `${this.collectionUrl}/${record.id}`);
    return deleteDoc(docRef);
  }

  saverecord(record: CreateRecordModel): Promise<any> {
    const recordData = JSON.parse(JSON.stringify(record));
    delete recordData.id
    const docRef = collection(this.firestore, this.collectionUrl);
    return addDoc(docRef, recordData);
  }


  async updaterecord(record: RecordModel): Promise<void>{
    const ocAux = JSON.parse(JSON.stringify(record));
    const ref =  collection(this.firestore, this.collectionUrl)
    const docRef = doc(ref,record.id);
    delete ocAux.id;
    const data =  await updateDoc(docRef,ocAux);
    return data;
 }

 async getrecordListByUser():Promise<any> {
  const userId = localStorage.getItem("currentUser");
  const collectionRef = collection(this.firestore, this.collectionUrl);
  const q = query(collectionRef, where('subject.user.id', '==', userId));
  const docs = await getDocs(q)
  const recordList: RecordModel[] = []
  docs.docs.forEach(element => {
    const aux = element.data() as RecordModel
    aux.id = element.id
    recordList.push(aux)
  });
   return recordList;
 }
}

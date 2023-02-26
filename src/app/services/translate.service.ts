import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data: any

  constructor(private http:HttpClient) {

  }

  public getData(){
    return new Promise((resolve, reject) => {
      this.http.get('../../assets/translations/' + navigator.language + '.json').subscribe(data => {
        this.data = data
        resolve(true)
      }, error => {
        console.log('Error al recuperar las traducciones: ' + error)
        reject(true)
      })
    })
  }

  getTranslate(word: string){
    return this.data[word]
  }
}

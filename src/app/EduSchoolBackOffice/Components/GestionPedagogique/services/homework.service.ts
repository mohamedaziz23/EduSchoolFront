import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework } from '../entities/homework.entitie';
import { Matiere } from '../entities/matiere.entitie';
import { Note } from '../entities/note.entitie';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  private baseURl: string = "http://localhost:8082/eduSchool/homework";
  private baseURl_Matiere: string = "http://localhost:8082/eduSchool/matiere";
  private baseURL_Classe: string = "http://localhost:8082/eduSchool/classe";
  private baseURL_Note: string = "http://localhost:8082/eduSchool/Note";
  private baseURL_Salle: string = "http://localhost:8082/eduSchool/salle";
  private baseURL_Examen: string = "http://localhost:8082/eduSchool/Examen";
  private baseUrl_User: string = "http://localhost:8082/eduSchool/user";
  constructor( private httpClient:HttpClient) { }
             /* ****************Homework services******************* */
  getHomework(): Observable<Homework[]>{
     return this.httpClient.get<Homework[]>( `${this.baseURl}/recupere_tous_les_homeworks` ) ;
  }
  createHomework(homework:Homework): Observable<any>{
    return this.httpClient.post(`${this.baseURl}/ajoute_homework`, homework )
  }
  deleteHomework(id : number):Observable<object>{
    
    return this.httpClient.delete(`${this.baseURl}/supprime_homework/${id}`);
  }
  getHomeworkByID(id : number):Observable<Homework>{
    
    return this.httpClient.get<Homework>(`${this.baseURl}/recupere_homework_par_id/${id}`);
  }
  updateHomework(id : number, homework:Homework):Observable<object>{
    
    return this.httpClient.put (`${this.baseURl}/modifie_homework/${id}`,homework);
  }
        /* ****************************Matiere Services************************** */
  getAllMatiere():Observable<Matiere[]>{
    return this.httpClient.get<Matiere[]>(`${this.baseURl_Matiere}/getAll`);
  }
  getMatiereById(id : number):Observable<Matiere>{
    return this.httpClient.get<Matiere>(`${this.baseURl}/getById/${id}`)
  }
       /* ********************* Classe Services****************************** */
  getAllClasse():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL_Classe}/getAll`);
  }
    /* ********************************** Note services ************************ */

  getAllEleveParClasse(classe: any, id: any):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL_Note}/recupere_tous_les_eleves_par_classe/${classe}/${id}`)
  }
  createNote(note:Note):Observable<any>{
    return this.httpClient.post<any>(`${this.baseURL_Note}/ajouter_note_pour_chaque_eleve`, note)
  }
  getAllNote():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL_Note}/recupere_tous_les_Notes`)
  }

  getAllNoteByEleve(id:any):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL_Note}/recupere_tous_les_notes_par_eleves/${id}`)
  }
  updateNOte(id : number, note:any):Observable<object>{
    
    return this.httpClient.put (`${this.baseURL_Note}/modifie_Note/${id}`,note);
  }
  deleteNote(id : number):Observable<object>{
    
    return this.httpClient.delete(`${this.baseURL_Note}/supprime_Note/${id}`);
  }
  getAllEleveParClasseEtMatiere(classe: any, matiere:any):Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL_Note}/recupere_tous_les_eleves_par_classe_et_matiere/${matiere}/${classe}`)
  }
  getNoteByID(id : number):Observable<any>{
    
    return this.httpClient.get<any>(`${this.baseURL_Note}/recupere_Note_par_id/${id}`);
  }
  getSalle(): Observable<any>{
    return this.httpClient.get<any[]>( `${this.baseURL_Salle}/getAll` ) ;
 }  
 createExamen(examen:any): Observable<any>{
  return this.httpClient.post(`${this.baseURL_Examen}/ajoute_Examen`, examen )
}
getAllExamen():Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.baseURL_Examen}/recupere_tous_les_Examens`)
}
deleteExamen(id : number):Observable<object>{
    
  return this.httpClient.delete(`${this.baseURL_Examen}/supprime_Examen/${id}`);
}
getAllExamenParClasse(id:any):Observable<any[]>{
  return this.httpClient.get<any[]>(`${this.baseURL_Examen}/recupere_Examen_par_classe/${id}`)
}
getUserById(id:any):Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl_User}/getById/${id}`)
}
}

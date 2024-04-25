export class Homework {
    id !: number;
    description !: string;
    sujet !: string;
    dateRemise !: Date;
    dateRecu !: Date;
    avoirDocument !: boolean;
    document !: any; // Utiliser File ou Blob pour représenter le fichier sélectionné
    niveau !: string;
    matiereHomework !: string;
  }
  
import { Examen } from "./examen.entitie";
import { Homework } from "./homework.entitie";
import { Seance } from "./seance.entitie";

export class Matiere {
    id !: number;
    nom !: string;
    niveau !: string;
    seanceList !: Seance[];
    examenSet !: Examen[];
    homeworkSet !: Homework[];
  }
  
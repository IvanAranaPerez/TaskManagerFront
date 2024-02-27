export interface Tasks {
  _id?: string; // Suponiendo que ObjectId se convierte en una cadena en el frontend
  task: string;
  userId:string;
}

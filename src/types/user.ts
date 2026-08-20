export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Participant extends User {
  score: number;
}

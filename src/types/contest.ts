export interface Contest {
  id: string;
  title: string;
  description: string;
  status: 'Live' | 'Upcoming' | 'Past';
}

export interface Prize {
  id: string;
  amount: number;
}

export interface Organizer {
  id: string;
  name: string;
}

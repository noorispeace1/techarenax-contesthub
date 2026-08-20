export type ContestStatus = 'Live' | 'Upcoming' | 'Completed';
export type ContestCategory = 'Algorithm' | 'Web Dev' | 'AI/ML' | 'Security' | 'Design' | 'Data Science';
export type ContestDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Prize {
  rank: string;
  amount: number;
  label: string;
}

export interface Organizer {
  id: string;
  name: string;
  logo: string;
  website: string;
}

export interface TimelineEvent {
  date: string;
  label: string;
  description: string;
  done: boolean;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  status: ContestStatus;
  category: ContestCategory;
  difficulty: ContestDifficulty;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  participants: number;
  maxParticipants: number;
  prizes: Prize[];
  organizer: Organizer;
  timeline: TimelineEvent[];
  rules: string[];
  eligibility: string[];
  tags: string[];
  featured: boolean;
  imageColor: string;
  image: string; // banner image path under /public
}

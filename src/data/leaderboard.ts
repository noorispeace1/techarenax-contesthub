export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  country: string;
  score: number;
  contestsWon: number;
  contestsEntered: number;
  badge: 'Legend' | 'Expert' | 'Master' | 'Intermediate' | 'Beginner';
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', name: 'Aryan Sharma', avatar: '🦁', country: '🇮🇳', score: 9840, contestsWon: 12, contestsEntered: 18, badge: 'Legend' },
  { rank: 2, userId: 'u2', name: 'Sofia Chen', avatar: '🐯', country: '🇨🇳', score: 9520, contestsWon: 10, contestsEntered: 15, badge: 'Legend' },
  { rank: 3, userId: 'u3', name: 'Lucas Oliveira', avatar: '🦊', country: '🇧🇷', score: 9200, contestsWon: 9, contestsEntered: 14, badge: 'Expert' },
  { rank: 4, userId: 'u4', name: 'Amara Nwosu', avatar: '🐺', country: '🇳🇬', score: 8800, contestsWon: 7, contestsEntered: 13, badge: 'Expert' },
  { rank: 5, userId: 'u5', name: 'Kai Tanaka', avatar: '🦅', country: '🇯🇵', score: 8500, contestsWon: 7, contestsEntered: 12, badge: 'Expert' },
  { rank: 6, userId: 'u6', name: 'Emma Durand', avatar: '🦋', country: '🇫🇷', score: 8100, contestsWon: 6, contestsEntered: 11, badge: 'Master' },
  { rank: 7, userId: 'u7', name: 'Rahul Gupta', avatar: '🐉', country: '🇮🇳', score: 7800, contestsWon: 5, contestsEntered: 10, badge: 'Master' },
  { rank: 8, userId: 'u8', name: 'Maria Torres', avatar: '🌟', country: '🇲🇽', score: 7400, contestsWon: 4, contestsEntered: 10, badge: 'Master' },
  { rank: 9, userId: 'u9', name: 'James Wilson', avatar: '🦉', country: '🇺🇸', score: 7000, contestsWon: 4, contestsEntered: 9, badge: 'Master' },
  { rank: 10, userId: 'u10', name: 'Yuki Nakamura', avatar: '🐸', country: '🇯🇵', score: 6500, contestsWon: 3, contestsEntered: 8, badge: 'Intermediate' },
];


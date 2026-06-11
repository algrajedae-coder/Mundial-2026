export type UserRole = 'admin' | 'participant';

export interface UserProfile {
  uid: string;
  nombre: string;
  correo: string;
  foto: string;
  puntos: number;
  rol: UserRole;
  enabled: boolean;
}

export type MatchPhase = 'Group' | 'Round of 32' | 'Round of 16' | 'Quarter-finals' | 'Semi-finals' | 'Third place' | 'Final';

export type MatchStatus = 'upcoming' | 'live' | 'finished';

export interface Match {
  id: string;
  fecha: string; // ISO string
  fase: MatchPhase;
  local: string;
  visitante: string;
  marcadorLocal: number | null;
  marcadorVisitante: number | null;
  estado: MatchStatus;
}

export interface Prediction {
  id: string;
  userId: string;
  matchId: string;
  local: number;
  visitante: number;
  puntos: number | null;
}
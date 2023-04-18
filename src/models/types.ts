export interface Room {
  id: string;
  language: string;
  level: string;
  desc: string;
  topic: string;
  joiners: string[];
  active: boolean;
  createdAt: string;
}

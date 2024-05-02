export interface TodoItem {
  id: number;
  title: string;
  createdAt: number;
  expirationDate: number;
  expirationTime?: string;
  isFavorite: boolean;
  done: boolean;
}

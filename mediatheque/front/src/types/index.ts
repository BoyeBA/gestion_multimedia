export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
}

export interface Influence {
  id: string;
  name: string;
  description: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  authorId: string;
  themeIds: string[];
  influenceIds: string[];
  featured: boolean;
  views: number;
}

export type FilterType = 'all' | 'author' | 'theme' | 'influence';
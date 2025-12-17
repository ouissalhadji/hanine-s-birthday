export interface WishRequest {
  tone: 'funny' | 'sentimental' | 'inspirational' | 'sarcastic';
  likes: string;
  name: string;
}

export interface MemoryPhoto {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}

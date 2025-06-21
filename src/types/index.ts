export type TBanner = {
  _id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
  type: 'page' | 'category' | 'product' | string; // extend as needed
  asset: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

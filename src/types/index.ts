export type TBanner = {
  _id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
  type: "page" | "category" | "product" | string; // extend as needed
  asset: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  imageUrl: string;
};

export type tProduct = {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  discountPrice?: number;
  inStock: boolean;
  images: string[];
  tags?: string[];
  rating?: number;
  gender?: "male" | "female";
  haveOffer?: boolean;
  brandId: {
    _id: string;
    name: string;
    logoUrl?: string;
    websiteUrl?: string;
  };
  categoryIds: {
    _id: string;
    name: string;
    slug: string;
    imageUrl?: string;
  };
};

export interface Tbrand {
  _id: string; // Unique identifier
  name: string; // Brand name
  description?: string; // Optional brand description
  logoUrl?: string; // Optional logo image
  websiteUrl?: string; // Optional external link
  isFeatured?: boolean; // For featured brand sections
}

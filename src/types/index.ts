export type TBanner = {
  _id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
  type: string;
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
  isComboOffer?: boolean;
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

export type Tgeneral = {
  siteName: string;
  logoUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  aboutUs: string;
  socialLinks: { facebook: string; instagram: string };
  freeGift: { product: tProduct; buyAbove: number; applicable: boolean };
};

export type TorderProduct = {
  productId: string;
  name: string;
  price: number; // single price
  quantity: number;
  imageUrl: string;
  haveOffer: boolean;
};

export type TOrder = {
  customerName: string; // Full name of the customer
  customerPhone: string; // Phone number for confirmation
  customerAddress: string; // Delivery address

  products: TorderProduct[];

  totalAmount: number; // Total cost of the product
  paymentMethod: "COD"; // Currently only Cash on Delivery
  deliveryCharge: number; // Currently only Cash on Delivery
  isConfirmed?: boolean; // Confirmed by admin after phone call
  isShipped?: boolean; // Has the order been sent to courier?
  freeGiftEligible: boolean;
  giftProduct?: { name: string; imageUrl: string };
};

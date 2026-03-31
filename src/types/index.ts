export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductSpec {
  power: string;
  weight: string;
  efficiency: string;
}

export interface Product {
  name: string;
  category: string;
  specs: ProductSpec;
  description: string;
  image: string;
}

export interface RentalPlan {
  name: string;
  duration: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface IProduct {
  id: number;
  company: string;
  name: string;
  description: string;
  discount: number;
  price: number;
  images: {
    thumbnail: string;
    full: string;
  }[];
}

export interface IAddress {
  id: number;
  title: string;
  address: string;
  userId: number;
}

export interface IOrder {
  id: number;
  contactInfo: IAddress;
  quantity: number;
  status: string;
}

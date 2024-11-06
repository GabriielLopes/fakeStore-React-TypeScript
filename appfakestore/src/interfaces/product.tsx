export interface Product {
  category?: string;
  description?: string;
  id?: number;
  image?: string;
  price?: number;
  rating?: {
    count?: number;
    rate?: number;
  };
  title?: string;
}

export interface state {
  carrinho: Carrinho[];
  _persist: {
    rehydrated: boolean;
    version: number;
  };
}

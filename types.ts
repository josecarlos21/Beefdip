
export interface Event {
  id: string;
  title: string;
  venue: string;
  time: string;
  endTime?: string;
  price: string;
  image: string;
  category: string;
  isLive?: boolean;
  isMainEvent?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    icon: string;
    votes: number;
    color?: string;
  }[];
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  priceLevel: string;
  description: string;
}


import { Event, Venue, Poll } from './types';

export const EVENTS: Event[] = [
  {
    id: 'EVT0153',
    title: 'White Party (DJ Tracy Young)',
    venue: 'CC Slaughters',
    time: '22:00',
    endTime: '05:00 AM',
    price: 'Gold Pass / Cover',
    image: 'https://picsum.photos/seed/whiteparty/800/600',
    category: 'Night Party',
    isLive: false,
    isMainEvent: true,
    pollId: 'p1'
  },
  {
    id: 'EVT0114',
    title: 'Foam Pool Party (BeefDip)',
    venue: 'Blue Chairs Pool',
    time: '12:00',
    endTime: '18:00',
    price: 'Gold Pass',
    image: 'https://picsum.photos/seed/foam/800/600',
    category: 'Pool Party',
    isLive: true,
    pollId: 'p2'
  },
  {
    id: 'EVT0003',
    title: 'Happy Hour 2x1 (all drinks)',
    venue: 'The Banana Factory',
    time: '11:00',
    endTime: '21:00',
    price: 'No cover',
    image: 'https://picsum.photos/seed/banana/800/600',
    category: 'Happy Hour',
    isLive: true
  },
  {
    id: 'EVT0185',
    title: 'WONDERBEAR Super Heroes',
    venue: 'CC Slaughters',
    time: '22:00',
    endTime: 'LATE',
    price: 'Gold Pass',
    image: 'https://picsum.photos/seed/hero/800/600',
    category: 'Themed Night'
  }
];

export const VENUES: Venue[] = [
  {
    id: 'blue-chairs',
    name: 'Blue Chairs Resort',
    address: 'Malecón 4, Zona Romántica, PV',
    distance: '0.1 km',
    rating: 4.5,
    reviews: 850,
    priceLevel: '$$',
    image: 'https://picsum.photos/seed/blue/800/600',
    description: 'Sede oficial de BeefDip. El hotel gay más icónico frente al mar en Puerto Vallarta, famoso por sus shows de drag y ambiente vibrante.'
  }
];

export const POLLS: Poll[] = [
  {
    id: 'p1',
    question: '¿Cúal es tu DJ favorito de esta semana?',
    options: [
      { id: 'o1', text: 'Tracy Young', icon: 'music_note', votes: 62, color: 'bg-primary' },
      { id: 'o2', text: 'Chris Cox', icon: 'music_note', votes: 38, color: 'bg-slate-500' }
    ]
  },
  {
    id: 'p2',
    question: '¿Cómo está la temperatura del agua?',
    options: [
      { id: 'o3', text: 'Perfecta', icon: 'thermometer', votes: 85, color: 'bg-cyan-400' },
      { id: 'o4', text: 'Muy Fría', icon: 'ac_unit', votes: 15, color: 'bg-blue-600' }
    ]
  }
];

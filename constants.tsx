
import { Event, Venue, Poll } from './types';

export const EVENTS: Event[] = [
  {
    id: 'EVT0153',
    title: 'Bearadise Party (DJ Tracy)',
    venue: 'CC Slaughters',
    time: '22:00',
    endTime: '05:00 AM',
    price: 'Gold Pass / Cover',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    category: 'Circuit Party',
    isLive: true,
    isMainEvent: true,
    pollId: 'p1'
  },
  {
    id: 'EVT0114',
    title: 'Foam Pool Party',
    venue: 'Blue Chairs Pool',
    time: '12:00',
    endTime: '18:00',
    price: 'Gold Pass',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    category: 'Pool Party',
    isLive: false,
    pollId: 'p2'
  },
  {
    id: 'EVT0003',
    title: 'Happy Hour 2x1',
    venue: 'The Banana Factory',
    time: '11:00',
    endTime: '21:00',
    price: 'No cover',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    category: 'Happy Hour'
  },
  {
    id: 'EVT0185',
    title: 'Super Heroes Night',
    venue: 'CC Slaughters',
    time: '23:00',
    endTime: 'LATE',
    price: 'Gold Pass',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    category: 'Themed Night'
  }
];

export const VENUES: Venue[] = [
  {
    id: 'blue-chairs',
    name: 'Blue Chairs Resort',
    address: 'Malecón 4, Zona Romántica',
    distance: '0.1 km',
    rating: 4.8,
    reviews: 1200,
    priceLevel: '$$',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
    description: 'Sede oficial de los mejores eventos frente al mar.'
  }
];

export const POLLS: Poll[] = [
  {
    id: 'p1',
    question: '¿DJ Favorito?',
    options: [
      { id: 'o1', text: 'Tracy Young', icon: 'music_note', votes: 74, color: 'bg-primary' },
      { id: 'o2', text: 'Chris Cox', icon: 'music_note', votes: 26, color: 'bg-white/20' }
    ]
  },
  {
    id: 'p2',
    question: 'Temperatura del agua',
    options: [
      { id: 'o3', text: 'Perfecta', icon: 'waves', votes: 89, color: 'bg-cyan-400' },
      { id: 'o4', text: 'Fría', icon: 'ac_unit', votes: 11, color: 'bg-blue-600' }
    ]
  }
];

export interface WeddingEvent {
  id: string;
  orderNumber: number;
  name: string;
  hindiName?: string;
  tagline: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  dressCode: string;
  colorPalette?: string[];
  cardImage: string;
  artImage: string;
  iconImage: string;
  rituals?: string[];
  auspiciousTime?: string;
  shloka?: string;
}

export interface RSVPData {
  id: string;
  name: string;
  phone: string;
  email: string;
  guestsCount: number;
  eventsAttending: string[];
  dietaryPreference: string;
  message: string;
  submittedAt: string;
}

export interface Blessing {
  id: string;
  author: string;
  relation: string;
  message: string;
  timestamp: string;
  blessingEmoji: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
}

import { ReleaseId } from '@/mdx/releases';
import { PhotoProps, VideoProps } from './media';

// This is lame, but it's a start
export const modelDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
] as const;
export type ModelDay = (typeof modelDays)[number];

// There might be a better way to handle this???
export const modelYears = [
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006',
  '2007',
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
] as const;
export type ModelYear = (typeof modelYears)[number];

// Here, we definetly need a better way to handle this
export const modelMounths = {
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};
export type ModelMonth = keyof typeof modelMounths;

// this helps to sort the models and group them by year and month (minimal required)
// the day is optional, but it's useful for sorting the models within the same month (e.g. concerts)
// we add an optional second day to sort events same day
// new Date(year, monthIndex, day, hours)
export type ModelDateArray = [ModelYear, ModelMonth, ModelDay?, ModelDay?];

export const modelKinds = [
  'concert',
  'release',
  'discography',
  'moment',
  'video',
  'photo',
  'gallery',
  'trackAppearance',
] as const;

export type ModelKind = (typeof modelKinds)[number];

export interface GalleryProps {
  title?: string;
  items: Array<PhotoProps | VideoProps>;
}

export interface ConcertProps {
  kind: 'concert';
  date: ModelDateArray;
  dateIso: string;
  monthString: string;
  dayString: string;
  venue: string;
  city: string;
  country: string;
  bands: string[];
  tour?: string;
  flyer?: string;
  gallery?: GalleryProps;
}

export interface Version {
  label: string;
  country: string;
  format: string;
  catno: string;
  released: string;
}

export interface TrackProps {
  position: string;
  title: string;
  duration: string;
  artist?: string;
}

export interface DiscographyProps {
  kind: 'discography';
  releaseId: ReleaseId;
  title: string;
  date: ModelDateArray;
  versions: Version[];
  tracklist: TrackProps[];
  notes?: string;
}

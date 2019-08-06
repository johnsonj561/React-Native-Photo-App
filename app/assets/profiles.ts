export interface ProfileType {
  id: string;
  name: string;
  profile: any;
}

export const profiles: ProfileType[] = [
  {
    id: '1',
    name: 'Wedding 1',
    profile: require('./wedding-1.jpg'),
  },
  {
    id: '2',
    name: 'Wedding 2',
    profile: require('./wedding-2.jpg'),
  },
  {
    id: '3',
    name: 'Wedding 3',
    profile: require('./wedding-3.jpg'),
  },
  {
    id: '4',
    name: 'Wedding 4',
    profile: require('./wedding-4.jpg'),
  },
];

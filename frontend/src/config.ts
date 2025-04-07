type Counties = string[];

export interface School {
  id: number;
  name: string;
  county: string;
  active?: boolean;
}

export interface NavigationLink {
  id: number;
  label: string;
  link: string;
}

export interface Navigation extends NavigationLink {
  subNav?: NavigationLink[];
}

interface Config {
  schools: School[];
  navigation: Navigation[];
  countiesNC: Counties;
}

const config: Config = {
  schools: [
    { id: 1, name: 'Grimsley High School', county: 'Guilford' },
    { id: 2, name: 'Page High School', county: 'Guilford' },
    { id: 3, name: 'Northwest Guilford High School', county: 'Guilford' },
    {
      id: 4,
      name: 'Northern Guilford High School',
      county: 'Guilford',
    },
    { id: 5, name: 'Southeast Guilford High School', county: 'Guilford' },
    { id: 6, name: 'Southern Guilford High School', county: 'Guilford' },
    { id: 7, name: 'Western Guilford High School', county: 'Guilford' },
    { id: 8, name: 'Eastern Guilford High School', county: 'Guilford' },
    { id: 9, name: 'Ben L. Smith High School', county: 'Guilford' },
    { id: 10, name: 'High Point Central High School', county: 'Guilford' },
    {
      id: 11,
      name: 'Summerfield Elementary School',
      county: 'Guilford',
      active: true,
    },
    {
      id: 12,
      name: 'Northern Guilford Middle School',
      county: 'Guilford',
      active: true,
    },
  ],

  navigation: [
    {
      id: 1,
      label: 'Home',
      link: '/',
    },
    {
      id: 2,
      label: 'Projects',
      link: '/projects',
      subNav: [
        {
          id: 1,
          label: 'Basketball',
          link: '/players/basketball',
        },
        {
          id: 2,
          label: 'Baseball',
          link: '/players/baseball',
        },
        {
          id: 3,
          label: 'Football',
          link: '/players/football',
        },
        {
          id: 4,
          label: 'Volleyball',
          link: '/players/volleyball',
        },
      ],
    },
    {
      id: 3,
      label: 'Completed Projects',
      link: '/completed',
    },
  ],

  countiesNC: [
    'Alamance',
    'Alexander',
    'Alleghany',
    'Anson',
    'Ashe',
    'Avery',
    'Beaufort',
    'Bertie',
    'Bladen',
    'Brunswick',
    'Buncombe',
    'Burke',
    'Cabarrus',
    'Caldwell',
    'Camden',
    'Carteret',
    'Caswell',
    'Catawba',
    'Chatham',
    'Cherokee',
    'Chowan',
    'Clay',
    'Cleveland',
    'Columbus',
    'Craven',
    'Cumberland',
    'Currituck',
    'Dare',
    'Davidson',
    'Davie',
    'Duplin',
    'Durham',
    'Edgecombe',
    'Forsyth',
    'Franklin',
    'Gaston',
    'Gates',
    'Graham',
    'Granville',
    'Greene',
    'Guilford',
    'Halifax',
    'Harnett',
    'Haywood',
    'Henderson',
    'Hertford',
    'Hoke',
    'Hyde',
    'Iredell',
    'Jackson',
    'Johnston',
    'Jones',
    'Lee',
    'Lenoir',
    'Lincoln',
    'Macon',
    'Madison',
    'Martin',
    'McDowell',
    'Mecklenburg',
    'Mitchell',
    'Montgomery',
    'Moore',
    'Nash',
    'New Hanover',
    'Northampton',
    'Onslow',
    'Orange',
    'Pamlico',
    'Pasquotank',
    'Pender',
    'Perquimans',
    'Person',
    'Pitt',
    'Polk',
    'Randolph',
    'Richmond',
    'Robeson',
    'Rockingham',
    'Rowan',
    'Rutherford',
    'Sampson',
    'Scotland',
    'Stanly',
    'Stokes',
    'Surry',
    'Swain',
    'Transylvania',
    'Tyrrell',
    'Union',
    'Vance',
    'Wake',
    'Warren',
    'Washington',
    'Watauga',
    'Wayne',
    'Wilkes',
    'Wilson',
    'Yadkin',
    'Yancey',
  ],
};

export default config;

type Counties = string[];

export interface School {
  _id: string;
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
  navigation: Navigation[];
  countiesNC: Counties;
}

const config: Config = {
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

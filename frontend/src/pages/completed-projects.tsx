export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  img: string;
}

const completedProjects: Project[] = [
  {
    id: 1,
    name: 'Soccer field clean up',
    description:
      'Soccer field has been warn down.  Thank you to NAME who helped clean up',
    date: 'Tue Mar 09 2025 10:30:15 GMT-0400',
    img: '/assets/1.jpg',
  },
  {
    id: 2,
    name: 'Basketball field clean up',
    description:
      'Basketball field has been warn down.  Thank you to NAME who helped clean up',
    date: 'Tue Mar 03 2025 10:30:15 GMT-0400',
    img: '/assets/2.jpg',
  },
  {
    id: 3,
    name: 'Soccer field clean up',
    description:
      'Soccer field has been warn down.  Thank you to NAME who helped clean up',
    date: 'Tue Mar 01 2025 10:30:15 GMT-0400',
    img: '/assets/3.jpg',
  },
];

import CompletedProjectsList from '../components/CompletedProjectsList';

export default function CompletedProjectsPage() {
  return (
    <>
      <h1>These are your completed projects</h1>
      <CompletedProjectsList projects={completedProjects} />
    </>
  );
}

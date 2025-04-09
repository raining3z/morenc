import { Project } from '../pages/completed-projects';

import CompletedProject from './CompletedProject';

type CompletedProjectsProps = {
  projects: Project[];
};

export default function CompletedProjectsList({
  projects,
}: CompletedProjectsProps) {
  return (
    <>
      {projects.map((project) => {
        return <CompletedProject key={project.id} project={project} />;
      })}
    </>
  );
}

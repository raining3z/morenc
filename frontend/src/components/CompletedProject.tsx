import { Project } from '../pages/completed-projects';

export interface ProjectProps {
  project: Project;
}

export default function CompletedProject({ project }: ProjectProps) {
  return (
    <div>
      <div>{project.name}</div>
      <div>{project.description}</div>
      <div>{project.date}</div>
      <div>
        <img src={project.img} />
      </div>
    </div>
  );
}

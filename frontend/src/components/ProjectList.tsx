import { type Project as ProjectProps } from '../types/projects';
import ProjectCard from './ProjectCard';
import styled from 'styled-components';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

interface ProjectListProps {
  projects: ProjectProps[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ProjectsGrid>
      {projects.map((project) => {
        return <ProjectCard key={project._id} project={project} />;
      })}
    </ProjectsGrid>
  );
}

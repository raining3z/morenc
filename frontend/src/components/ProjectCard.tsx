import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useSchoolsContext from '../hooks/useSchoolsContext';
import { type Project } from '../types/projects';

const ProductItem = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const SchoolName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

const ProjectLink = styled(Link)`
  font-weight: 600;
  color: #0077cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

const Date = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
`;

const TimeRange = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

interface ProjectProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectProps) {
  const { schools } = useSchoolsContext();

  const school = schools.find((school) => school._id === project.schoolId);
  const schoolName = school?.name;

  return (
    <ProductItem>
      <img
        src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254"
        alt={project.name}
      />

      <SchoolName>{schoolName}</SchoolName>

      <ProjectLink to={`/projects/${project._id}`}>{project.name}</ProjectLink>

      <Description>{project.description}</Description>

      <Date>{project.date}</Date>
      <TimeRange>
        {project.startTime} - {project.endTime}
      </TimeRange>
    </ProductItem>
  );
}

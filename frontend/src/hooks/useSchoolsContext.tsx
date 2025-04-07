import { SchoolsContext } from '../store/Schools/SchoolsContext';
import { useContext } from 'react';

export default function useSchoolsContext() {
  const schoolsCtx = useContext(SchoolsContext);

  if (schoolsCtx === null) {
    throw new Error('Schools context is null');
  }

  return schoolsCtx;
}

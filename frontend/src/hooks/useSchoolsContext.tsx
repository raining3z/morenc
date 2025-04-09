import { useContext } from 'react';

import { SchoolsContext } from '../store/Schools/SchoolsContext';

export default function useSchoolsContext() {
  const schoolsCtx = useContext(SchoolsContext);

  if (schoolsCtx === null) {
    throw new Error('Schools context is null');
  }

  return schoolsCtx;
}

// Notes
// Adding an project:
// _id is automatically generated by mongodb, so:
// - 'ProjectData' for when form is being submitted (addProjectHandler)
// - 'Project' when API creates/responds (AddAction / const addedProject)
// (
//    ProjectData: use for forms, API POST/PATCH bodies
//    Project: use for anything that came from the database or API
// )

import { ReactNode, useEffect, useReducer } from 'react';

import { Project, ProjectData } from '../../types/projects';

import { ProjectsContext, ProjectsContextValue } from './ProjectsContext';

export type ProjectsState = {
  projects: Project[];
  isUpdating: boolean;
  updatingProject: Project | null;
};

const initialState: ProjectsState = {
  projects: [],
  isUpdating: false,
  updatingProject: null,
};

export type ProjectsMethods = {
  addProject: (project: ProjectData) => Promise<ProjectData>;
  // getProject: (_id: string) => void;
  deleteProject: (_id: string) => void;
  updateProjectSubmit: (project: Project) => Promise<Project>;
  setUpdatingProject: (project: Project | null) => void;
  setIsUpdating: (status: boolean) => void;
};

type ProjectsContextProviderProps = {
  children: ReactNode;
};

type LoadAction = {
  type: 'LOAD_PROJECTS';
  payload: Project[];
};

type AddAction = {
  type: 'ADD_PROJECT';
  payload: Project;
};

type GetAction = {
  type: 'GET_PROJECT';
  payload: string;
};

type DeleteAction = {
  type: 'DELETE_PROJECT';
  payload: string;
};

type UpdateAction = {
  type: 'UPDATE_PROJECT';
  payload: Project;
};

type SetUpdatingProjectAction = {
  type: 'SET_UPDATING_PROJECT';
  payload: Project | null;
};

type SetIsUpdatingAction = {
  type: 'SET_IS_UPDATING';
  payload: boolean;
};

type Action =
  | LoadAction
  | AddAction
  | GetAction
  | DeleteAction
  | UpdateAction
  | SetUpdatingProjectAction
  | SetIsUpdatingAction;

function projectsReducer(state: ProjectsState, action: Action): ProjectsState {
  switch (action.type) {
    case 'LOAD_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    // case 'GET_PROJECT': {
    //   const product = state.projects.find(
    //     (project) => project._id === action.payload
    //   );
    //   console.log(product);
    //   return {
    //     ...state,
    //     projects: [],
    //   };
    // }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id
            ? {
                ...action.payload,
              }
            : project
        ),
      };
    case 'SET_UPDATING_PROJECT':
      return { ...state, updatingProject: action.payload };
    case 'SET_IS_UPDATING':
      return { ...state, isUpdating: action.payload };

    default:
      return state;
  }
}

export function ProjectsContextProvider({
  children,
}: ProjectsContextProviderProps) {
  const [projectsState, dispatch] = useReducer(projectsReducer, initialState);

  // TODO:  this shouldbe inside const ctx: ProjectsContextValue ?
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();

        dispatch({ type: 'LOAD_PROJECTS', payload: data });
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  const ctx: ProjectsContextValue = {
    projects: projectsState.projects,
    isUpdating: projectsState.isUpdating,
    updatingProject: projectsState.updatingProject,

    addProject: async (project: ProjectData) => {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const addedProject = await response.json();
        dispatch({ type: 'ADD_PROJECT', payload: addedProject });

        return addedProject;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    // getProject: async (projectId: string) => {
    //   console.log(projectId);
    // },

    deleteProject: async (projectId: string) => {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete project ${projectId}`);
        }

        dispatch({ type: 'DELETE_PROJECT', payload: projectId });
      } catch (error) {
        console.error(error);
      }
    },

    updateProjectSubmit: async (project: Project) => {
      const { _id: projectId } = project;

      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        const updatedProject = await response.json();
        dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });

        return updatedProject;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    setUpdatingProject(project) {
      dispatch({ type: 'SET_UPDATING_PROJECT', payload: project });
    },

    setIsUpdating(status) {
      dispatch({ type: 'SET_IS_UPDATING', payload: status });
    },
  };

  return (
    <ProjectsContext.Provider value={ctx}>{children}</ProjectsContext.Provider>
  );
}

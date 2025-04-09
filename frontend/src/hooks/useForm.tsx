// TODO: i have  feeling this needs lot more TS work

import { useState, type ChangeEvent, type FormEvent } from 'react';

import { Project, ProjectData } from '../types/projects';
import { School, SchoolData } from '../types/schools';
import { UserCredentials, UserData, FormOption } from '../types/users';

import {
  useUsersContext,
  useProjectsContext,
  useSchoolsContext,
} from './index';

type DefaultFormData = UserData | ProjectData | SchoolData | UserCredentials;

export default function useForm(option: FormOption) {
  const { addUser, loginUser } = useUsersContext();
  const {
    addProject,
    isUpdating: projectIsUpdating,
    setIsUpdating: projectSetIsUpdating,
    setUpdatingProject,
    updateProjectSubmit,
    updatingProject,
  } = useProjectsContext();
  const {
    addSchool,
    isUpdating: schoolIsUpdating,
    setIsUpdating: schoolSetIsUpdating,
    setUpdatingSchool,
    updateSchoolSubmit,
    updatingSchool,
  } = useSchoolsContext();

  let addOption: Function;
  let setFormOptionData: Function;
  let setUpdateOption: Function;
  let updateSubmitOption: Function;
  let updatingOption: Project | School | null;
  let isUpdatingOption: boolean;
  let setIsUpdatingOption: Function;
  // TODO: let defaultFormData: DefaultFormData doesn't work.  Why?
  let defaultFormData: DefaultFormData = {} as DefaultFormData;

  switch (option) {
    case 'signup':
      addOption = addUser;
      defaultFormData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      };
      break;
    case 'project':
      addOption = addProject;
      setUpdateOption = setUpdatingProject;
      updateSubmitOption = updateProjectSubmit;
      updatingOption = updatingProject;
      isUpdatingOption = projectIsUpdating;
      setIsUpdatingOption = projectSetIsUpdating;
      defaultFormData = {
        name: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        schoolId: '',
      };
      setFormOptionData = (project: Project) => ({
        name: project.name,
        description: project.description,
        date: project.date,
        startTime: project.startTime,
        endTime: project.endTime,
        schoolId: project.schoolId,
      });
      break;
    case 'school':
      addOption = addSchool;
      setUpdateOption = setUpdatingSchool;
      updateSubmitOption = updateSchoolSubmit;
      updatingOption = updatingSchool;
      isUpdatingOption = schoolIsUpdating;
      setIsUpdatingOption = schoolSetIsUpdating;
      defaultFormData = {
        name: '',
        address: '',
        county: '',
      };
      setFormOptionData = (school: School) => ({
        name: school.name,
        address: school.address,
        county: school.county,
      });
      break;
    case 'login':
      addOption = loginUser;
      defaultFormData = {
        email: '',
        password: '',
      };
      break;
    default:
      break;
  }

  const [formData, setFormData] = useState<DefaultFormData>(defaultFormData);
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formOption, setFormOption] = useState<FormOption>(option);
  const [optionId, setOptionId] = useState<string>('');

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function addHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isFormInvalid = Object.values(formData).some(
      (value) => value.trim() === ''
    );

    if (isFormInvalid) {
      setMessage('All fields are required.');
      return;
    }

    if (isUpdatingOption && updatingOption) {
      try {
        const data = await updateSubmitOption({
          ...updatingOption, // Keeps the existing ID and any other properties
          ...formData, // Overwrites only the updated fields
        });

        if (data._id !== optionId) {
          setMessage('');
          setUpdateOption(null);
        } else {
          setMessage('');
          setIsModalOpen(false);
        }
        setIsUpdatingOption(false);
        setFormData(defaultFormData);
      } catch (error: any) {
        console.error(error);
        setMessage(error.message);
      }
    } else {
      try {
        const data = await addOption(formData);

        if (data) {
          setMessage('');
          setIsModalOpen(false);
          setFormData(defaultFormData);
        }
      } catch (error: any) {
        console.error(error);
        setMessage(error.message);
      }
    }
  }

  function updateFormFields(option: Project | School) {
    setOptionId(option._id);
    setUpdateOption(option);
    setIsUpdatingOption(true);
    setIsModalOpen(true);

    setFormData(setFormOptionData(option));
  }

  function showFormOption(option: FormOption) {
    setIsModalOpen(true);
    setFormOption(option);
  }

  return {
    addHandler,
    formData,
    handleChange,
    isModalOpen,
    message,
    setIsModalOpen,
    showFormOption,
    updateFormFields,
  };
}

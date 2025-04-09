// TODO: i have  feeling this needs lot more TS work

import { useState, type ChangeEvent, type FormEvent } from 'react';

import { UserCredentials, UserData, FormOption } from '../types/users';
import useUsersContext from './useUsersContext';
import useProjectsContext from './useProjectsContext';
import useSchoolsContext from './useSchoolsContext';
import { ProjectData } from '../types/projects';
import { SchoolData } from '../types/schools';

type DefaultFormData = UserData | ProjectData | SchoolData | UserCredentials;

export default function useForm(option: FormOption) {
  const { addUser, loginUser } = useUsersContext();
  const { addProject } = useProjectsContext();
  const { addSchool } = useSchoolsContext();

  let addOption: Function;
  // TODO: let defaultFormData: DefaultFormData doesn't work.  Why?
  let defaultFormData: DefaultFormData = {} as DefaultFormData;

  console.log(option);

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
      defaultFormData = {
        name: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        schoolId: '',
      };
      break;
    case 'school':
      addOption = addSchool;
      defaultFormData = {
        name: '',
        address: '',
        county: '',
      };
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
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [formOption, setFormOption] = useState<FormOption>(option);

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

    console.log(formData);

    if (isFormInvalid) {
      setMessage('All fields are required.');
      return;
    }

    // if (isUpdating && updatingProject) {
    //   updateProjectSubmit({
    //     ...updatingProject, // Keeps the existing ID and any other properties
    //     ...formData, // Overwrites only the updated fields
    //   });

    //   // Reset update mode
    //   setIsUpdating(false);
    //   setUpdatingProject(null);
    // } else {
    try {
      const data = await addOption(formData);

      if (data) {
        setMessage('');
        setModalIsOpen(false);
        setFormData(defaultFormData);
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.message);
    }
    // }
  }

  function showFormOption(option: FormOption) {
    setModalIsOpen(true);
    setFormOption(option);
  }

  return {
    message,
    handleChange,
    addHandler,
    formData,
    setModalIsOpen,
    modalIsOpen,
    showFormOption,
  };
}

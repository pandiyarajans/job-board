import React, { useContext, useReducer } from 'react';
import {
  CLEAR_ALERT,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCESS,
  DELETE_JOB_BEGIN,
  DISPLAY_ALERT,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCESS,
  GET_JOB_BEGIN,
  GET_JOB_SUCESS,
  HANDLE_CHANGE,
  DISPLAY_MODAL,
  CLOSE_MODAL,
  SET_EDIT_JOB,
  DELETE_JOB_ERROR,
} from './actions';
import reducer from './reducer';
import axios from 'axios';

export const initialState = {
  isLoading: false,
  showAlert: false,
  modalOpen: false,
  alertText: '',
  alertType: '',
  jobLocation: '',
  isEditing: false,
  editJobId: '',
  jobTitle: '',
  logo: '',
  remoteType: '',
  isExternalApply: '',
  salaryMin: '',
  salaryMax: '',
  department: '',
  experienceMin: '',
  experienceMax: '',
  companyName: '',
  empCount: '',
  jobType: '',
  workingHours: '',
  jobs: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: 'https://650c49ec47af3fd22f6768d8.mockapi.io/v1',
  });

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    setTimeout(clearAlert, 3000);
  };
  
  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };
  
  const displayModal = () => {
    dispatch({ type: DISPLAY_MODAL });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
    setTimeout(clearAlert, 3000);
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({
      type: CREATE_JOB_BEGIN,
    });
    try {
      
      console.log(state);

      const { companyName,
        department,
        empCount,
        experienceMax,
        experienceMin,
        isExternalApply,
        jobLocation,
        jobTitle,
        jobType,
        remoteType,
        salaryMax,
        salaryMin,
        workingHours } = state;

      await authFetch.post('/Jobs', {
        department,
        empCount,
        experienceMax,
        experienceMin,
        isExternalApply,
        jobLocation,
        jobTitle,
        jobType,
        remoteType,
        salaryMax,
        companyName,
        salaryMin,
        workingHours
      });
      dispatch({
        type: CREATE_JOB_SUCESS,
      });
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };


  const getJobs = async () => {
    let url ='/Jobs';

    dispatch({
      type: GET_JOB_BEGIN,
    });

    try {
      const { data } = await authFetch(url);
      const  jobs = data;
      console.log(data);
      dispatch({
        type: GET_JOB_SUCESS,
        payload: {
          jobs
        },
      });
    } catch (error) {
      console.log(error)
    }
    setTimeout(clearAlert, 3000);
  };

  const setEditJob = (id) => {
    console.log('edit job id: ', id);
    console.log('edit state.jobs id: ', state.jobs);
    const job = state.jobs.find((job) => job.id === id);
    console.log(job);
    dispatch({
      type: SET_EDIT_JOB,
      payload: { job },
    });
    dispatch({
      type: DISPLAY_MODAL,
    });
  };

  const deleteJob = async (id) => {
    console.log(id)
    dispatch({
      type: DELETE_JOB_BEGIN,
    });
    try {
      await authFetch.delete(`/Jobs/${id}`);
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };

  const editJob = async () => {
    dispatch({
      type: EDIT_JOB_BEGIN,
    });
    try {
      const { 
        department,
        empCount,
        experienceMax,
        experienceMin,
        isExternalApply,
        jobLocation,
        jobTitle,
        jobType,
        remoteType,
        salaryMax,
        companyName,
        salaryMin,
        workingHours,
        editJobId } = state;

      await authFetch.put(`/Jobs/${editJobId}`, {
        department,
        empCount,
        experienceMax,
        experienceMin,
        isExternalApply,
        jobLocation,
        jobTitle,
        jobType,
        remoteType,
        salaryMax,
        companyName,
        salaryMin,
        workingHours
      });
      getJobs();
      clearValues();
      dispatch({
        type: EDIT_JOB_SUCESS,
      });
      dispatch({
        type: CLOSE_MODAL,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    setTimeout(clearAlert, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        clearValues,
        displayModal,
        closeModal,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

import {
  CLEAR_ALERT,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
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
} from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: 'Please provide mandatory values',
      alertType: 'danger',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    };
  } 
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const changeState = {
      isEditing: false,
      editJobId: '',
      id:null,
      companyName:'',
      department:'',
      empCount:'',
      experienceMax: 0 ,
      experienceMin: 0,
      isExternalApply: true,
      jobLocation:"Chennai,Tamilnadu,India",
      jobTitle:'',
      jobType:"",
      remoteType:'',
      salaryMax: '',
      salaryMin: '',
      workingHours: '',
    };
    return { ...initialState, ...changeState };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_JOB_SUCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job created',
    };
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === GET_JOB_SUCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
    };
  }

  if (action.type === SET_EDIT_JOB) {
    console.log(action.payload.job);
     const { id,companyName,
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
      workingHours }= action.payload.job;
    return {
      ...state,
      editJobId: id,
      companyName,
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
      workingHours,
      isEditing: true,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_JOB_SUCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Job updated...',
    };
  }

  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === DISPLAY_MODAL) {
    console.log(action.payload)
    return {
      ...state,
      modalOpen: true,
    };
  }

  if (action.type === CLOSE_MODAL) {
    console.log(action.payload)
    return {
      ...state,
      modalOpen: false,
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;

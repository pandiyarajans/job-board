import React, { useState } from 'react';
import FormRow from '../components/FormRow';
import { useAppContext } from '../context/appContext';
import { Dialog } from '@headlessui/react'
import FormRowRadio from '../components/FormRowRadio'
import Alert from '../components/Alert';
import './AddJob.css';


function AddJob() {
  const [step, setStep] = useState(1);
  const {
    isEditing,
    showAlert,
    displayAlert,
    jobTitle,
    companyName,
    jobLocation,
    experienceMin,
    experienceMax,
    salaryMin,
    salaryMax,
    isExternalApply,
    remoteType,
    empCount,
    department,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Im here');

    if (isEditing) {
      console.log('editJob');
      editJob();

    } else {
      console.log('createJob');
      createJob();
    }
    clearValues();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    handleChange({ name, value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!jobTitle || !companyName || !jobLocation) {
      console.log('Im here');
      displayAlert();
      return;
    }
    setStep(2)
  }
  
  return (
    <form className="w-full max-w-lg">
      {showAlert && ( 
        <div className='mb-3'>
          <Alert center />
        </div>
      )}
      <Dialog.Title as="h2" className="flex justify-between">
        <p className="mb-6 create_job_title">{isEditing ? 'Edit a Job' : 'Create a Job'}</p>
        <p className="mb-6 create_job_step">
          Step {step}
        </p>
      </Dialog.Title>
      <div className="form-center">
        {step === 1 &&
          <>
            <FormRow
              type="text"
              name="jobTitle"
              widthType="full"
              isRequired="true"
              classes="appearance-none input_field block w-full bg-white text-gray-700 border
          border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
              labelText="Job Title"
              value={jobTitle}
              handleChange={handleJobInput}
            />
            <FormRow
              type="text"
              widthType="full"
              name="companyName"
              isRequired="true"
              classes="appearance-none input_field block w-full bg-white text-gray-700 border
          border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
              labelText="Company Name"
              value={companyName}
              handleChange={handleJobInput}
            />
            <FormRow
              type="text"
              widthType="full"
              name="department"
              isRequired="true"
              classes="appearance-none input_field block w-full bg-white text-gray-700 border
          border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
              labelText="Industry"
              value={department}
              handleChange={handleJobInput}
            />
            <div className="flex flex-wrap -mx-3 mb-3">
              <FormRow
                type="text"
                widthType="half"
                name="jobLocation"
                labelText="Location"
                classes="appearance-none input_field block w-full bg-white text-gray-700 border
            border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
                value={jobLocation}
                placeholderText="ex.Chennai"
                handleChange={handleJobInput}
              />
                <FormRow
                name="remoteType"
                type="text"
                widthType="half"
                placeholderText="ex.In-office"
                classes="appearance-none input_field block w-full bg-white text-gray-700 border
              border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
                labelText="Remote Type"
                value={remoteType}
                handleChange={handleJobInput}
              />
            </div>
            <div className="next_text_button">
              <button className="bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded next_text" onClick={handleNext}> Next </button>
            </div>
          </>
        }
        {step === 2 &&
          <>
            <div className="flex flex-wrap -mx-3 mb-3">
              <FormRow
                name="experienceMin"
                type="text"
                widthType="half"
                classes="appearance-none input_field block w-full bg-white text-gray-700 border
              border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
                labelText="Experiences"
                placeholderText="Minimum"
                value={experienceMin}
                handleChange={handleJobInput}
              />
              <FormRow
                name="experienceMax"
                type="text"
                widthType="half"
                classes="appearance-none input_field block w-full bg-white text-gray-700 border
              border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
                labelText=""
                placeholderText="Maximum"
                value={experienceMax}
                handleChange={handleJobInput}
              />
            </div>
            <div className="flex flex-wrap -mx-3 mb-3">
              <FormRow
                name="salaryMin"
                type="text"
                widthType="half"
                classes="appearance-none input_field block w-full bg-white text-gray-700 border
              border-gray-200 rounded h-9 py-2 px-3  leading-tight focus:outline-none"
                labelText="Salary"
                value={salaryMin}
                placeholderText="Minimum"
                handleChange={handleJobInput}
              />
              <FormRow
                name="salaryMax"
                type="text"
                widthType="half"
                classes="appearance-none input_field block w-full bg-white text-gray-700 border
              border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
                labelText=""
                placeholderText="Maximum"
                value={salaryMax}
                handleChange={handleJobInput}
              />
            </div>
            <FormRow
              type="text"
              name="empCount"
              widthType="full"
              labelText="Total Employees"
              placeholderText="ex.100"
              classes="appearance-none input_field block w-full bg-white text-gray-700 border
            border-gray-200 rounded h-9 py-2 px-3 leading-tight focus:outline-none"
              value={empCount}
              handleChange={handleJobInput}
            />

            <FormRowRadio
              name="isExternalApply"
              type="radio"
              classes="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-gray-800
                dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 h-5 w-5"
              labelText="Apply type"
              options={[{ value: false, text: "Quick apply" }, { value: false, text: "External Appply" }]}
              value={isExternalApply}
              handleChange={handleJobInput}
            />
            <div className="next_text_button">
              <button className="bg-blue-500 hover:bg-blue-700  py-2 px-4 rounded next_text" onClick={handleSubmit}>  {!isEditing ? 'Save' : 'Update'}</button>
            </div>
          </>
        }
      </div>
    </form>
  );
}

export default AddJob;

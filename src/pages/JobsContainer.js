import React, { useEffect } from 'react';
import {useAppContext} from '../context/appContext';
import Loader from '../components/Loader';
import JobList from '../components/JobList';
import Alert from '../components/Alert';
import Modal from "../components/Modal"
import "../components/JobList.css";

function JobsContainer() {
  const {
    getJobs,
    jobs,
    isLoading,
    modalOpen,
    displayModal,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    console.log(jobs)
  },[]);

  if (isLoading) {
    return <Loader center />;
  }

  return (
     <div className='card_container'>
        <div className="add_button">
          <button
            onClick={displayModal}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold mb-4 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          > + Add Job</button>
        </div>
        {showAlert && !modalOpen && <Alert />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">

        {jobs && jobs.map((job) => {
          return <JobList key={job.id} {...job} />;
        })}
      </div>
      <Modal isOpen={modalOpen}></Modal>
    </div>
  );
}

export default JobsContainer;

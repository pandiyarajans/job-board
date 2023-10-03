import { useAppContext } from '../context/appContext';
import React from 'react';
import EditIcon from "../components/EditIcon"
import DeleteIcon from "../components/DeleteIcon";

function JobList({ id,
    jobTitle,
    logo,
    remoteType,
    isExternalApply,
    salaryMin,
    salaryMax,
    department,
    experienceMin,
    experienceMax,
    jobLocation,
    companyName,
    empCount,
    jobType,
    workingHours }) {
    const { setEditJob, deleteJob } = useAppContext();
    return (
        <div className="flex justify-between card py-4 px-6 bg-white">
            <div className="flex gap-2">
                <div
                    className="h-12 w-12 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    title="NetFlix">
                    <img className="mr-4" src={logo} alt={companyName} />
                </div>
                <div className="rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                    <div className="title">{jobTitle}</div>
                    <div className="sub_title">
                        {companyName} - {department}
                    </div>
                    <div className="location">{jobLocation} ({remoteType})</div>
                    <div className="job_time">
                        {jobType} ({workingHours})
                    </div>
                    <div className="job_experience">
                        Experience ({experienceMin} - {experienceMax} years)
                    </div>
                    <div className="job_salary">
                        INR (₹) {salaryMin} - {salaryMax} / Month
                    </div>
                    <div className="number_of_employees">
                        {empCount} employees
                    </div>
                    <div>
                        {!isExternalApply ? (
                            <button className="bg-blue-500 text-white mt-4 apply_button py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Apply Now
                            </button>
                        ) : (
                            <button className="bg-transparent text-blue-700 apply_button mt-4  py-2 px-4 border border-blue-500 rounded">
                                External Apply
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <div onClick={() => deleteJob(id)} className="cursor-pointer">
                    <DeleteIcon />
                </div>
                <div onClick={() => setEditJob(id)} className="cursor-pointer">
                    <EditIcon />
                </div>
            </div>
        </div>
    );
}

export default JobList;
import React, { useEffect, useState } from 'react';
import JobItem from './JobItem';
import JobModal from './JobModal';
import './JobList.scss';

const JobList = () => {
    const [jobs, setJobs] = useState([
        { id: 1, title: 'Frontend Developer', companyName: 'Company A', location: 'New York', experience: '3 years', position: 'Senior', type: 'Full-time', postedDate: '2024-07-01', status: 'Active' },
        { id: 2, title: 'Backend Developer', companyName: 'Company B', location: 'San Francisco', experience: '2 years', position: 'Junior', type: 'Part-time', postedDate: '2024-07-02', status: 'Active' },
        { id: 3, title: 'Marketing Director', companyName: 'Creative Agency', location: 'Phoenix', experience: '-', position: 'Director', type: 'Full-time', postedDate: '2024-06-02', status: 'Close' },
        { id: 4, title: 'HTML Developer', companyName: 'Web Technology pvt.ltd', location: 'California', experience: '0-4 Years', position: 'Developer', type: 'Full-time', postedDate: '2024-06-02', status: 'Active' },
        { id: 5, title: 'Product Sales Specialist', companyName: 'Skote Technology pvt.Ltd', location: 'Louisiana', experience: '5+ Years', position: 'Specialist', type: 'Part-time', postedDate: '2024-06-02', status: 'New' },
        { id: 6, title: 'Magento Developer', companyName: 'New Technology pvt.ltd', location: 'Oakridge Lane Richardson', experience: '0-2 Years', position: 'Developer', type: 'Freelance', postedDate: '2024-06-02', status: 'New' },
        { id: 7, title: 'Business Associate', companyName: 'Web Technology pvt.ltd', location: 'California', experience: '0-2 Years', position: 'Associate', type: 'Full-time', postedDate: '2024-06-02', status: 'Active' },
        { id: 8, title: 'Magento Developer', companyName: 'Adobe Agency', location: 'California', experience: '0-2 Years', position: 'Developer', type: 'Full-time', postedDate: '2024-06-02', status: 'Close' },
        { id: 9, title: 'HTML Developer', companyName: 'Web Technology pvt.ltd', location: 'California', experience: '0-2 Years', position: 'Developer', type: 'Part-time', postedDate: '2024-06-02', status: 'New' },
        { id: 10, title: 'Marketing Director', companyName: 'Web Technology pvt.ltd', location: 'California', experience: '0-2 Years', position: 'Director', type: 'Internship', postedDate: '2024-06-02', status: 'Active' },
    ]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');

    const handleEdit = (job) => {
        setCurrentJob(job);
        setModalOpen(true);
    };

    const handleDelete = (jobId) => {
        setJobs(jobs.filter(job => job.id !== jobId));
    };

    const handleSave = (job) => {
        if (currentJob) {
            setJobs(jobs.map(j => j.id === currentJob.id ? job : j));
        } else {
            setJobs([...jobs, { ...job, id: jobs.length + 1 }]);
        }
        setModalOpen(false);
        setCurrentJob(null);
    };

    useEffect(() => {
        fetch('http://localhost:3001/jobs')
            .then(response => response.json())
            .then(data => {
                setJobs(data);
                setFilteredJobs(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        let filtered = jobs;

        if (statusFilter && statusFilter !== 'All') {
            filtered = filtered.filter(job => job.status === statusFilter);
        }

        if (typeFilter && typeFilter !== 'All') {
            filtered = filtered.filter(job => job.type === typeFilter);
        }

        if (dateFilter) {
            filtered = filtered.filter(job => new Date(job.postedDate) >= new Date(dateFilter));
        }

        setFilteredJobs(filtered);
    }, [statusFilter, typeFilter, dateFilter, jobs]);

    return (
        <div className="job-list">
            <div className="job-list-header">
                <h1>JOBS LIST</h1>
                <div className="actions">
                    <button className="add-job-btn" onClick={() => setModalOpen(true)}>Add New Job</button>
                    <button className="refresh-button">↻</button>
                    <button className="options-button">⋮</button>
                </div>
            </div>
            <div className="filter-bar">
                <select onChange={e => setStatusFilter(e.target.value)}>
                    <option>Show 10</option>
                    <option>Show 20</option>
                    <option>Show 30</option>
                    <option>Show 40</option>
                    <option>Show 50</option>

                </select>
                <input className='search-for' type="text" placeholder="Search for ..." />
                <select onChange={e => setTypeFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                </select>
                <input
                    type="date"
                    onChange={e => setDateFilter(e.target.value)}
                    placeholder="Select time"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Job Title</th>
                        <th>Company Name</th>
                        <th>Location</th>
                        <th>Experience</th>
                        <th>Position</th>
                        <th>Type</th>
                        <th>Posted Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map((job, index) => (
                        <JobItem key={job.id} job={job} index={index + 1} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <JobModal job={currentJob} onClose={() => setModalOpen(false)} onSave={handleSave} />
            )}
        </div>
    );
};

export default JobList;

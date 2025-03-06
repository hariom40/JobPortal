import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Avoid making a request if searchedQuery is empty or undefined
                const queryParam = searchedQuery ? `?keyword=${searchedQuery}` : '';
                const res = await axios.get(`https://jobportal-9ymu.onrender.com/api/v1/job/all${queryParam}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error.response?.data || error.message);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchedQuery]);

    // Optional: Return a loading state or an error if needed
};

export default useGetAllJobs;

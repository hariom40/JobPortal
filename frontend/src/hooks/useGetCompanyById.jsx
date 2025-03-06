import { setSingleCompany } from '@/redux/companySlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            if (!companyId) return; // Prevent API call if companyId is not provided

            try {
                const res = await axios.get(`https://jobportal-9ymu.onrender.com/api/v1/company/get/${companyId}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error('Error fetching company:', error.response?.data || error.message);
            }
        };

        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;

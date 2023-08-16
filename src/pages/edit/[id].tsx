import React from 'react';
import { useRouter } from 'next/router';
import EditCustomer from '@/components/EditCustomer';

const EditCustomerPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 min-h-screen'>
      <EditCustomer />
    </div>
  );
};

export default EditCustomerPage;

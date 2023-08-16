import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Home from '../components/Home';
import Create from '../components/Create';
import EditCustomer from '../components/EditCustomer';
import Navbar from '@/components/Navbar';

const App: React.FC = () => {
  const router = useRouter();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create' },
  ];

  return (
    <div className='bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 min-h-screen'>
      <Navbar links={navLinks} />
      <div className='body  p-10'>
        {router.asPath === '/' && <Home />}
        {router.asPath === '/create' && <Create />}
        {router.asPath.includes('/edit/') && <EditCustomer />}
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import Create from '@/components/Create';
import Navbar from '@/components/Navbar';

const CreatePage: React.FC = () => {
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create' }, 
  ];
  return (
    <div className='bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 min-h-screen'>
      <Navbar links={navLinks}/>
      <Create/>
    </div>
  );
};

export default CreatePage;

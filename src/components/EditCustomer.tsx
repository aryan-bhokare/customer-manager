import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import toast, { Toaster } from 'react-hot-toast';
import { fetchCustomers, updateCustomer } from '../../lib/data'; // Assuming you have imported the updateCustomer function

interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const EditCustomer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formState, setFormState] = useState<ICustomer>({
    id: -1,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const customerId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id);
      fetchCustomers().then((customers) => {
        const customer = customers.find((cust) => cust.id === customerId);
        if (customer) {
          setFormState(customer);
        }
      });
    }
  }, [id]);

  const processFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateCustomer(formState.id, formState);

      setLoading(false);
      notify('Customer Edited Successfully!');

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error('Error editing customer:', error);
    }
  };

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create' },
  ];

  const notify = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      duration: 3000,
    });
  };
  return (
    <div className="App">
      {(
        <div className="">
          <Navbar links={navLinks} />
          <div className="m-20 p-10 pt-8 border-2 bg-slate-100 border-slate-800">
            <h1 className="text-2xl font-bold pb-4">Edit Customer Details</h1>
            <Toaster />
            <form onSubmit={processFormSubmission}>
              <div className="relative z-0 w-full mb-6 group">
                <input type="email"
                  id="email"
                  onChange={handleInputChanges}
                  name="email"
                  value={formState.email || ''}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text"
                    id="first_name"
                    onChange={handleInputChanges}
                    name="first_name"
                    value={formState.first_name || ''}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text"
                    id="last_name"
                    onChange={handleInputChanges}
                    name="last_name"
                    value={formState.last_name || ''}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="number"
                    pattern="[0-9]"
                    id="phone"
                    onChange={handleInputChanges}
                    name="phone"
                    value={formState.phone || ''}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number after +91 (123456789)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text"
                    id="address"
                    onChange={handleInputChanges}
                    name="address"
                    value={formState.address || ''}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                </div>
              </div>
              <button
                type="submit"
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none ${loading ? 'cursor-not-allowed' : 'cursor-pointer'
                  } focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCustomer;

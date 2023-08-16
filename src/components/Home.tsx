import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import axios from 'axios';
import { Toast, Toaster, toast } from 'react-hot-toast';
import { fetchCustomers, deleteCustomer } from '../../lib/data';

interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const Home: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== id)
      );
      toast.error('Customer Deleted!', {
        position: 'top-right',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      {customers.length === 0 && (
        <div className="text-center">
          <h2>No customer found at the moment</h2>
        </div>
      )}

      <Toaster />
      <div className="relative overflow-x-auto p-10">
        <table className="w-full text-sm text-left border-4 border-slate-300 text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Firstname
              </th>
              <th scope="col" className="px-6 py-3">
                Lastname
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr className="bg-white border-b dark:bg-gray-800 " key={customer.id}>

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {customer.first_name}
                </th>
                <td className="px-6 py-4">{customer.last_name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.address}</td>
                <td>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="" style={{ margin: '20px' }}>
                      <Link href={`/edit/${customer.id}`}>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          Edit Customer
                        </button>
                      </Link>
                      <button
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete Customer
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

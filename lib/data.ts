
interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const mockCustomers: ICustomer[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
    description: 'A loyal customer',
  },
];

export const fetchCustomers = async (): Promise<ICustomer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCustomers]);
    }, 500);
  });
};

export const createCustomer = async (customer: ICustomer): Promise<void> => {
  const updatedCustomers = [...mockCustomers, customer];
  mockCustomers.length = 0; 
  updatedCustomers.forEach((c) => mockCustomers.push(c)); 
};

export const updateCustomer = async (id: number, updatedData: ICustomer): Promise<void> => {
  const customerIndex = mockCustomers.findIndex((c) => c.id === id);

  if (customerIndex !== -1) {
    mockCustomers[customerIndex] = { ...mockCustomers[customerIndex], ...updatedData };
  }
};

export const deleteCustomer = async (id: number): Promise<void> => {
  const updatedCustomers = mockCustomers.filter((c) => c.id !== id);
  mockCustomers.length = 0;
  updatedCustomers.forEach((c) => mockCustomers.push(c));
};

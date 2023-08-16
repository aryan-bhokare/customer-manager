import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  links: { path: string; label: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  return (
    <nav className="p-10 bg-transparent  border-slate-800 px-2 sm:px-4 py-2.5 rounded">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
          <h1 className='text-xl font-bold text-black '><a href="/">Customer Manager</a></h1>
            <div className=" w-full md:block md:w-auto" id="navbar-default">
              <ul className="flex flex-co p-4 mt-4 text-black  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                {links?.map((link, index) => (
                <li className='hover:text-blue-700 text-1xl' key={index}>
                    <Link href={link.path}>
                        {link.label}
                    </Link>
                </li>
                ))}
                </ul>
            </div>
          </div>
        </nav>

  );
};

export default Navbar;

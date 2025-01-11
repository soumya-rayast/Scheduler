import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { SlCalender } from "react-icons/sl";
const Layout = React.memo(() => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar Navigation */}
      <nav className="bg-indigo-700 text-white w-full lg:w-64 flex-shrink-0 lg:h-screen lg:sticky top-0">
        <div className="px-6 py-4 flex items-center justify-between lg:justify-start">
          <Link to="/" className="flex items-center space-x-3">
          <SlCalender size={25} />
            <span className="text-2xl font-semibold">Scheduler</span>
          </Link>
        </div>
        <div className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-600"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="block py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-600"
              >
                Schedule Interview
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Main Content Area */}
      <main className="flex-1 p-2 sm:p-6 ">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-2">
          <h1 className="text-xl font-semibold text-gray-800">Interview Scheduler</h1>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
           <AiOutlinePlus size={20} />
            Schedule Interview
          </Link>
        </header>
        <section >
          <Outlet />
        </section>
      </main>
    </div>
  );
});

export default Layout;

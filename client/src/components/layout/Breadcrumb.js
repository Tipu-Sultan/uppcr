import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const DynamicBreadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname
    .split('/')
    .filter((x) => x && !/^[a-f0-9]{24}$/.test(x)); 

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex">
        <li>
          <RouterLink to="/" className="text-blue-500 hover:text-blue-700">
            Home
          </RouterLink>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {index === pathnames.length - 1 ? (
                <span className="font-semibold text-gray-800">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              ) : (
                <RouterLink to={to} className="text-blue-500 hover:text-blue-700">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </RouterLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DynamicBreadcrumbs;

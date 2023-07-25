import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleItemClick = () => {
        closeDropdown();
    };

    return (
        <div className="relative z-10">
            <button
                className="flex items-center px-3 py-2 text-white hover:text-yellow-700 focus:outline-none"
                onClick={toggleDropdown}
            >
                {title}
                <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''
                        }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 px-20 mt-2 bg-white rounded shadow-md">
                    <ul className="py-2 w-48 max-h-60 overflow-y-auto">
                        {items.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.path}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 break-words"
                                    onClick={handleItemClick}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;


// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Dropdown = ({ title, items }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative mr-6">
//       <button
//         className="text-white hover:text-yellow-700 focus:outline-none"
//         onClick={toggleDropdown}
//       >
//         {title}
//       </button>
//       {isOpen && (
//         <div className="absolute right-0 w-40 mt-2 bg-white rounded shadow-md">
//           <ul className="py-2">
//             {items.map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown
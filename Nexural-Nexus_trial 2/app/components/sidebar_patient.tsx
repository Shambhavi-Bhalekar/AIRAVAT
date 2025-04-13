'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { Calendar, User, Home, Search, PhoneCall, Apple, Menu, X, BotIcon, AlertCircle } from 'lucide-react';

export default function PatientSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // Get the current path
  const router = useRouter(); // Initialize router for navigation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear session or tokens)
    console.log('Logged out'); // Optional: Add any logout logic here
    router.push('/login'); // Redirect to login page
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/patient/dashboard' },
    { id: 'profile', icon: User, label: 'My Profile', href: '/patient/patient-profile' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/patient/patient-calendar' },
    { id: 'connect', icon: PhoneCall, label: 'Connect with Doctor', href: '/patient/connect-doctor' },
    { id: 'diet', icon: Apple, label: 'Plan My Diet', href: '/patient/diet-suggestion' },
    { id: 'prescriptions', icon: Search, label: 'Check my Prescriptions', href: '/patient/prescription' },
    { id: 'ChatBot', icon: BotIcon, label: 'Stress Reliever Bot', href: '/patient/chatbot' },
  ];

  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen bg-gradient-to-b from-blue-600 via-indigo-600 to-violet-600 text-white transition-all duration-300 ease-in-out flex flex-col justify-between shadow-lg`}>
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="font-bold text-xl">MediMitra</div>
        )}
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-lg hover:bg-blue-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="px-4 py-2">
          <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
              JS
            </div>
            <div className="ml-3">
              <div className="font-medium">Jane Smith</div>
              <div className="text-xs text-blue-100">Patient ID: P78934</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <div className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 cursor-pointer ${
                    pathname.includes(item.href)
                      ? 'bg-white text-indigo-600 font-medium shadow-md'
                      : 'text-white hover:bg-indigo-500'
                  } ${item.id === 'emergency' ? 'mt-4' : ''}`}
                >
                  <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-700">
        <button 
          onClick={handleLogout} // Attach the logout handler
          className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-300 ease-in-out ${
            isCollapsed ? 'justify-center mx-auto' : 'hover:bg-indigo-500'
          }`}
        >
          <AlertCircle size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import {
  Calendar,
  Users,
  User,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  Camera,
} from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname(); // Get current route
  const router = useRouter(); // Initialize router for navigation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear tokens, session data)
    console.log('Logged out'); // Optional: Add any logout logic here
    router.push('/login'); // Redirect to login page
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/dashboard-doctor' },
    { id: 'patients', icon: Users, label: 'My Patients', href: '/doctor-MyPatients' },
    { id: 'calendar', icon: Calendar, label: 'Calendar', href: '/doctor-calendar' },
    { id: 'profile', icon: User, label: 'My Profile', href: '/doctor_MyProfile' },
    // { id: 'start-meeting', icon: Camera, label: 'Start a Meeting', href: '/doctor-meeting' },
  ];

  return (
    <div
      className={`bg-blue-700 text-white h-screen p-4 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h1 className="text-xl font-bold">MedPortal</h1>}
        <button onClick={toggleSidebar}>
          {isCollapsed ? <Menu /> : <X />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 cursor-pointer ${
                  pathname.includes(item.href)
                    ? 'bg-white text-blue-700 font-medium shadow-md'
                    : 'text-white hover:bg-blue-600'
                }`}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout} // Attach the logout handler
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 mt-auto"
      >
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
}

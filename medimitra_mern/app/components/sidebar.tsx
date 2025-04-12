"use client";
import React from 'react';
import { useState } from 'react';
import { Calendar, Users, User, Settings, LogOut, Home, Menu, X } from 'lucide-react';

export default function DoctorSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'patients', icon: Users, label: 'My Patients' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen">
      <div 
        className={`${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-gradient-to-b from-indigo-700 via-blue-700 to-violet-700 text-white transition-all duration-300 ease-in-out flex flex-col justify-between shadow-lg`}>
        
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="font-bold text-xl">MedPortal</div>
          )}
          <button 
            onClick={toggleSidebar} 
            className={`p-2 rounded-lg hover:bg-indigo-600 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 ${
                    activeItem === item.id 
                      ? 'bg-white text-blue-700 font-medium shadow-md' 
                      : 'text-white hover:bg-blue-600'
                  }`}
                >
                  <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-800">
          <button className="flex items-center p-3 rounded-lg text-white hover:bg-blue-600 transition-colors w-full">
            <LogOut size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
      
      {/* Main content area placeholder */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, Dr. Smith</h1>
        <p className="text-gray-600 mt-2">Selected menu: {activeItem}</p>
      </div>
    </div>
  );
}
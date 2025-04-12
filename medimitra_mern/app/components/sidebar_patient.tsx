import { useState } from 'react';
import { Calendar, User, Home, Search, PhoneCall, Apple, AlertCircle, Menu, X } from 'lucide-react';

export default function PatientSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'connect', icon: PhoneCall, label: 'Connect with Doctor' },
    { id: 'diet', icon: Apple, label: 'Plan My Diet' },
    { id: 'prescriptions', icon: Search, label: 'Search Prescriptions' },
    { id: 'emergency', icon: AlertCircle, label: 'Emergency' },
  ];

  return (
    <div 
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen bg-gradient-to-b from-blue-600 via-indigo-600 to-violet-600 text-white transition-all duration-300 ease-in-out flex flex-col justify-between shadow-lg`}>
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="font-bold text-xl">HealthCare</div>
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
              <button
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center p-3 rounded-lg w-full transition-all duration-200 ${
                  activeItem === item.id 
                    ? 'bg-white text-indigo-600 font-medium shadow-md' 
                    : 'text-white hover:bg-indigo-500'
                } ${
                  item.id === 'emergency' ? 'mt-4' : ''
                }`}
              >
                <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                {!isCollapsed && <span>{item.label}</span>}
                {item.id === 'emergency' && !isCollapsed && (
                  <span className="ml-auto bg-red-500 text-xs px-2 py-1 rounded-full">SOS</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-700">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <div className="text-xs text-blue-100">
              <div>Need help?</div>
              <div>Call: 800-HEALTH</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
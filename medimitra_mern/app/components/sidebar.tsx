"use client";

import React, { useState } from "react";
import {
  Calendar,
  Users,
  User,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "patients", icon: Users, label: "My Patients" },
    { id: "calendar", icon: Calendar, label: "Calendar" },
    { id: "profile", icon: User, label: "My Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`bg-blue-700 text-white h-screen p-4 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
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
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-200 ${
                activeItem === item.id
                  ? "bg-white text-blue-700 font-medium shadow-md"
                  : "text-white hover:bg-blue-600"
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600 mt-auto">
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { Calendar, Clock, Plus, Home, User, Phone, FileText, Search, AlertCircle } from "lucide-react";
import Sidebar from "../components/sidebar"; // Adjusted the import path to the correct location



export default function CalendarPage() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "",
    time: "",
  });
  const [events, setEvents] = useState([
    { day: 3, title: "Math 101", time: "9:00 AM" },
    { day: 7, title: "Science", time: "10:30 AM" },
    { day: 12, title: "History", time: "1:00 PM" },
    { day: 15, title: "Math 101", time: "9:00 AM" },
    { day: 21, title: "History", time: "1:00 PM" },
    { day: 25, title: "Science", time: "10:30 AM" },
    { day: 28, title: "Math 101", time: "9:00 AM" },
  ]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.day && newEvent.time) {
      const dayNum = parseInt(newEvent.day);
      if (dayNum > 0 && dayNum <= 31) {
        setEvents([
          ...events,
          {
            day: dayNum,
            title: newEvent.title,
            time: newEvent.time,
          },
        ]);
        setNewEvent({ title: "", day: "", time: "" });
        setShowEventForm(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4 md:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Hi, Alex Johnson</h1>
              <p>{formattedDate}</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold">
              AJ
            </div>
          </div>
          <div className="mt-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full p-3 rounded-lg bg-white text-gray-800"
            />
          </div>
        </div>

        {/* Calendar Content - Now takes full remaining height */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Calendar</h2>
              <button
                className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
                onClick={() => setShowEventForm(!showEventForm)}
                aria-label="Add event"
              >
                <Calendar className="w-6 h-6 text-purple-700" />
              </button>
            </div>

            {showEventForm && (
              <div className="absolute right-4 top-40 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-300 w-80 max-w-[90vw]">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Event
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      placeholder="Class name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Day (1-31)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500"
                      value={newEvent.day}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, day: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">
                      Time
                    </label>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-600" />
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
                    onClick={handleAddEvent}
                  >
                    Add to Calendar
                  </button>
                </div>
              </div>
            )}

            {/* Calendar Grid that fills the remaining space */}
            <div className="flex-1 grid grid-cols-7 gap-1 overflow-auto h-full">
              {/* Calendar header */}
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="sticky top-0 z-10 text-center font-bold py-2 bg-purple-100 text-purple-800 rounded border border-purple-200"
                >
                  {day}
                </div>
              ))}

              {/* Calendar grid */}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i + 1;
                const dayEvents = events.filter((event) => event.day === day);
                const hasEvent = dayEvents.length > 0;

                return (
                  <div
                    key={i}
                    className={`h-full min-h-16 p-1 border rounded ${
                      day <= 31 ? "bg-white" : "bg-gray-50"
                    } ${
                      day === new Date().getDate()
                        ? "border-purple-500 border-2"
                        : "border-gray-200"
                    }`}
                  >
                    {day <= 31 && (
                      <>
                        <div className="font-bold text-gray-900 text-sm">{day}</div>
                        {hasEvent && (
                          <div className="mt-1">
                            {dayEvents.map((event, idx) => (
                              <div
                                key={idx}
                                className="text-xs p-1 mt-1 rounded bg-blue-100 text-blue-800 border border-blue-200"
                              >
                                <div className="font-bold">{event.title}</div>
                                <div className="font-medium">{event.time}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
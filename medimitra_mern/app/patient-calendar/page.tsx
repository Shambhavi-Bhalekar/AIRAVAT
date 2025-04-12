"use client"
import React, { useState } from "react";
import { Calendar, Clock, Plus } from "lucide-react";

export default function CalendarPage() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    day: "",
    time: ""
  });
  const [events, setEvents] = useState([
    { day: 3, title: "Math 101", time: "9:00 AM" },
    { day: 7, title: "Science", time: "10:30 AM" },
    { day: 12, title: "History", time: "1:00 PM" },
    { day: 15, title: "Math 101", time: "9:00 AM" },
    { day: 21, title: "History", time: "1:00 PM" },
    { day: 25, title: "Science", time: "10:30 AM" },
    { day: 28, title: "Math 101", time: "9:00 AM" }
  ]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.day && newEvent.time) {
      const dayNum = parseInt(newEvent.day);
      if (dayNum > 0 && dayNum <= 31) {
        setEvents([...events, {
          day: dayNum,
          title: newEvent.title,
          time: newEvent.time
        }]);
        setNewEvent({ title: "", day: "", time: "" });
        setShowEventForm(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            <p className="text-gray-600">View and manage your teaching schedule</p>
          </div>
          <button
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            onClick={() => setShowEventForm(!showEventForm)}
            aria-label="Add event"
          >
            <Calendar className="w-6 h-6 text-emerald-600" />
          </button>
        </div>

        {showEventForm && (
          <div className="absolute right-6 top-20 bg-white shadow-lg rounded-lg p-4 z-10 border border-gray-200 w-64">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Event
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Event Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-sm"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Class name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Day (1-31)</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  className="w-full p-2 border rounded-md text-sm"
                  value={newEvent.day}
                  onChange={(e) => setNewEvent({...newEvent, day: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Time</label>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <input
                    type="time"
                    className="w-full p-2 border rounded-md text-sm"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  />
                </div>
              </div>
              <button
                className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                onClick={handleAddEvent}
              >
                Add to Calendar
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-7 gap-2">
          {/* Calendar header */}
          {weekdays.map((day) => (
            <div key={day} className="text-center font-medium py-2 bg-gray-100 rounded">
              {day}
            </div>
          ))}
         
          {/* Calendar grid */}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i + 1;
            const dayEvents = events.filter(event => event.day === day);
            const hasEvent = dayEvents.length > 0;
           
            return (
              <div
                key={i}
                className={`min-h-24 p-2 border rounded ${day <= 31 ? 'bg-white' : 'bg-gray-50'} ${day === new Date().getDate() ? 'border-orange-400 border-2' : 'border-gray-200'}`}
              >
                {day <= 31 && (
                  <>
                    <div className="font-medium">{day}</div>
                    {hasEvent && (
                      <div className="mt-1">
                        {dayEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-1 mt-1 rounded bg-amber-100 text-orange-700"
                          >
                            <div className="font-medium">{event.title}</div>
                            <div>{event.time}</div>
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
  );
}
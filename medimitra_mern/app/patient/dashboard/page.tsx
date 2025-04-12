"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar, Clock, Check, X, AlertCircle, Coffee, Sun, Sunset, Moon, Activity, Heart, User, Award, Apple } from 'lucide-react';
import PatientSidebar from '../../components/sidebar_patient';

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

interface MedicationsByTime {
  morning: Medication[];
  afternoon: Medication[];
  evening: Medication[];
  night: Medication[];
}

interface MedicationSectionProps {
  title: string;
  icon: React.ElementType;
  timeOfDay: keyof MedicationsByTime;
  medications: Medication[];
}

export default function PatientDashboard() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const patientName = "Alex Johnson";
  
  // Effect to update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Appointments data
  const appointments: Appointment[] = [
    { id: 1, doctor: "Dr. Sarah Williams", specialty: "Cardiologist", date: "Apr 15, 2025", time: "10:30 AM" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "Physiotherapist", date: "Apr 20, 2025", time: "2:15 PM" },
    { id: 3, doctor: "Dr. Emily Rodriguez", specialty: "Dermatologist", date: "May 5, 2025", time: "11:00 AM" }
  ];
  
  // Medication data with times
  const medications: MedicationsByTime = {
    morning: [
      { id: 1, name: "Lisinopril", dosage: "10mg", time: "8:00 AM", taken: false },
      { id: 2, name: "Metformin", dosage: "500mg", time: "8:00 AM", taken: false }
    ],
    afternoon: [
      { id: 3, name: "Atorvastatin", dosage: "20mg", time: "1:00 PM", taken: false }
    ],
    evening: [
      { id: 4, name: "Metformin", dosage: "500mg", time: "6:00 PM", taken: false }
    ],
    night: [
      { id: 5, name: "Atorvastatin", dosage: "20mg", time: "9:00 PM", taken: false },
      { id: 6, name: "Aspirin", dosage: "81mg", time: "9:00 PM", taken: false }
    ]
  };
  
  const [meds, setMeds] = useState<MedicationsByTime>(medications);
  
  // Diet recommendations
  const dietRecommendations: string[] = [
    "Maintain a low-sodium diet (under 2,300mg daily)",
    "Include at least 5 servings of fruits and vegetables",
    "Limit processed sugars and refined carbohydrates",
    "Stay hydrated with 8-10 glasses of water",
    "Consider Mediterranean diet principles for heart health"
  ];
  
  // Health recommendations
  const healthRecommendations: string[] = [
    "Take a 30-minute walk daily",
    "Monitor blood pressure each morning",
    "Practice stress reduction techniques",
    "Get 7-8 hours of quality sleep",
    "Avoid alcohol and tobacco products"
  ];
  
  // Helper function to check if medication time has passed
  const hasTimePassed = (timeString: string): boolean => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let medicationHours = hours;
    if (period === 'PM' && hours !== 12) {
      medicationHours += 12;
    } else if (period === 'AM' && hours === 12) {
      medicationHours = 0;
    }
    
    const now = new Date();
    return (now.getHours() > medicationHours || 
           (now.getHours() === medicationHours && now.getMinutes() >= minutes));
  };
  
  // Toggle medication taken status
  const toggleMedication = (timeOfDay: keyof MedicationsByTime, medId: number): void => {
    const updatedMeds = {...meds};
    const medication = updatedMeds[timeOfDay].find(med => med.id === medId);
    if (medication) {
      medication.taken = !medication.taken;
      setMeds(updatedMeds);
    }
  };
  
  // Calculate medication completion rate
  const calculateCompletionRate = (): number => {
    let total = 0;
    let taken = 0;
    
    Object.values(meds).forEach(timeSlot => {
      timeSlot.forEach(med => {
        total++;
        if (med.taken) taken++;
      });
    });
    
    return total > 0 ? Math.round((taken / total) * 100) : 0;
  };
  
  // Medication section component
  const MedicationSection: React.FC<MedicationSectionProps> = ({ title, icon: Icon, timeOfDay, medications }) => (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
          <Icon size={18} className="text-indigo-600" />
        </div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-3">
        {medications.map(med => {
          const isPast = hasTimePassed(med.time);
          const isOverdue = isPast && !med.taken;
          
          return (
            <li 
              key={med.id} 
              className={`flex items-center justify-between rounded-xl border transition-all duration-300 ${
                med.taken 
                  ? 'border-green-200 bg-green-50 shadow-sm' 
                  : isOverdue 
                    ? 'border-red-200 bg-red-50 shadow-sm' 
                    : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center">
                <button 
                  onClick={() => toggleMedication(timeOfDay, med.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                    med.taken 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'border-2 border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  {med.taken && <Check size={16} />}
                </button>
                <div>
                  <div className="font-medium text-gray-800">{med.name} <span className="text-indigo-600">{med.dosage}</span></div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" /> {med.time}
                  </div>
                </div>
              </div>
              {isOverdue && (
                <span className="text-sm text-red-500 flex items-center bg-red-100 px-3 py-1 rounded-full">
                  <AlertCircle size={14} className="mr-1" /> Missed
                </span>
              )}
              {med.taken && (
                <span className="text-sm text-green-500 flex items-center bg-green-100 px-3 py-1 rounded-full">
                  <Check size={14} className="mr-1" /> Taken
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Sidebar - Using the existing PatientSidebar component */}
      <div className="sticky top-0 h-screen">
        <PatientSidebar />
      </div>

      {/* Main Content - Adjusts automatically with the sidebar */}
      <div className="flex-1 p-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Hi, {patientName}</h1>
                <p className="mt-1 text-indigo-100">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="mt-4 bg-white bg-opacity-20 rounded-lg px-4 py-2 inline-block">
                  <div className="flex items-center">
                    <Activity className="mr-2" />
                    <span>Daily progress: {calculateCompletionRate()}% complete</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl shadow-md">
                  AJ
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Medication Tracker */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Today's Medication</h2>
                  <div className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
                    {calculateCompletionRate()}% Complete
                  </div>
                </div>
                
                <MedicationSection 
                  title="Morning" 
                  icon={Coffee} 
                  timeOfDay="morning" 
                  medications={meds.morning} 
                />
                
                <MedicationSection 
                  title="Afternoon" 
                  icon={Sun} 
                  timeOfDay="afternoon" 
                  medications={meds.afternoon} 
                />
                
                <MedicationSection 
                  title="Evening" 
                  icon={Sunset} 
                  timeOfDay="evening" 
                  medications={meds.evening} 
                />
                
                <MedicationSection 
                  title="Night" 
                  icon={Moon} 
                  timeOfDay="night" 
                  medications={meds.night} 
                />
              </div>

              {/* Diet & Health Recommendations */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Personalized Recommendations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Apple size={20} className="text-blue-600" />
                      </div>
                      <h3 className="font-medium text-lg text-gray-800">Diet Plan</h3>
                    </div>
                    <ul className="space-y-3">
                      {dietRecommendations.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1 mr-3 w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
                            <Check size={12} />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                        <Heart size={20} className="text-violet-600" />
                      </div>
                      <h3 className="font-medium text-lg text-gray-800">Health Measures</h3>
                    </div>
                    <ul className="space-y-3">
                      {healthRecommendations.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mt-1 mr-3 w-5 h-5 bg-violet-200 rounded-full flex items-center justify-center text-violet-700">
                            <Check size={12} />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Progress Summary */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress</h2>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Medication adherence</span>
                    <span className="font-medium">{calculateCompletionRate()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full" 
                      style={{ width: `${calculateCompletionRate()}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Diet plan compliance</span>
                    <span className="font-medium">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full" 
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Exercise goals</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-violet-500 to-purple-600 h-2.5 rounded-full" 
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="inline-flex items-center text-indigo-600">
                    <Award size={16} className="mr-1" />
                    <span className="font-medium">3-day streak!</span>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-indigo-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
                
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{appointment.doctor}</h3>
                            <p className="text-sm text-gray-500">{appointment.specialty}</p>
                          </div>
                          <div className="bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                            Upcoming
                          </div>
                        </div>
                        <div className="mt-3 flex items-center text-gray-600">
                          <div className="flex items-center mr-4">
                            <Calendar size={14} className="mr-1" />
                            <span className="text-sm">{appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span className="text-sm">{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No upcoming appointments.</p>
                )}
                
                <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 px-4 rounded-xl transition-colors font-medium flex items-center justify-center">
                  <Calendar size={18} className="mr-2" />
                  Schedule New Appointment
                </button>
              </div>
              
              {/* Health Stats Summary */}
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Health Summary</h2>
                
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-10 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Activity size={16} className="text-white" />
                      </div>
                      <span>Blood Pressure</span>
                    </div>
                    <span className="font-medium">122/78 mmHg</span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Activity size={16} className="text-white" />
                      </div>
                      <span>Blood Glucose</span>
                    </div>
                    <span className="font-medium">105 mg/dL</span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Heart size={16} className="text-white" />
                      </div>
                      <span>Heart Rate</span>
                    </div>
                    <span className="font-medium">72 bpm</span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <User size={16} className="text-white" />
                      </div>
                      <span>Weight</span>
                    </div>
                    <span className="font-medium">168 lbs</span>
                  </div>
                </div>
                
                <button className="mt-6 w-full bg-white text-indigo-700 hover:bg-indigo-50 py-3 px-4 rounded-xl transition-colors font-medium shadow-md flex items-center justify-center">
                  <Activity size={18} className="mr-2" />
                  View Full Health Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
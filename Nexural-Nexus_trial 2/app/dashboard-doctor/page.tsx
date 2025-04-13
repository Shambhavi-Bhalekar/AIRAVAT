"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from '../components/sidebar';

import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  Bell, 
  Calendar, 
  Clock, 
  Search, 
  Users, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Activity,
  Phone,
  MessageCircle,
  AlertCircle,
  Menu,
  User
} from 'react-feather';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Mock data for the dashboard
const MOCK_PATIENTS_DATA = [45, 39, 48, 53, 49, 55, 60, 55, 58, 65, 58, 63, 68, 65, 70, 75, 72, 78, 80, 75, 78, 82, 80, 85, 87, 85, 88, 90, 92];

const MOCK_ALERTS = [
  { id: 1, patient: 'Sarah Johnson', age: 32, time: '10 mins ago', allergicTo: 'Peanuts', severity: 'High', status: 'Unread' },
  { id: 2, patient: 'Robert Chen', age: 45, time: '25 mins ago', allergicTo: 'Shellfish', severity: 'Medium', status: 'Unread' },
];

const MOCK_APPOINTMENTS = [
  { id: 1, patient: 'Emma Wilson', time: '09:00 AM', type: 'Follow-up', status: 'Confirmed' },
  { id: 2, patient: 'James Parker', time: '10:30 AM', type: 'Annual Checkup', status: 'Confirmed' },
  { id: 3, patient: 'Maria González', time: '01:15 PM', type: 'New Patient', status: 'Confirmed' },
  { id: 4, patient: 'Thomas Lee', time: '03:00 PM', type: 'Consultation', status: 'Confirmed' },
  { id: 5, patient: 'Aisha Khan', time: '04:30 PM', type: 'Follow-up', status: 'Pending' },
];

const MOCK_UPCOMING_PATIENTS = [
  { id: 1, name: 'Emma Wilson', age: 28, appointment: '09:00 AM', image: '/api/placeholder/40/40' },
  { id: 2, name: 'James Parker', age: 42, appointment: '10:30 AM', image: '/api/placeholder/40/40' },
];

export default function Dashboard() {
  const [activeAlerts, setActiveAlerts] = useState(MOCK_ALERTS);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [patientStats, setPatientStats] = useState(MOCK_PATIENTS_DATA);
  const [upcomingPatients, setUpcomingPatients] = useState(MOCK_UPCOMING_PATIENTS);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Create date labels for the last 30 days
  const dateLabels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Chart data
  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        fill: true,
        label: 'Patients Treated',
        data: patientStats,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Patients Treated (Past Month)',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 14
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#4B5563'
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.5)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#4B5563'
        },
        grid: {
          display: false
        }
      }
    }
  };

  // Handle alert click
  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    setShowAlertModal(true);
  };

  // Handle resolving an alert
  const handleResolveAlert = (id) => {
    setActiveAlerts(activeAlerts.filter(alert => alert.id !== id));
    setShowAlertModal(false);
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Mock function to simulate new alerts
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Random chance to add a new alert
      if (Math.random() > 0.95) {
        const newAlert = {
          id: Date.now(),
          patient: ['Alex Thompson', 'Olivia Martinez', 'Noah Williams'][Math.floor(Math.random() * 3)],
          age: Math.floor(Math.random() * 60) + 18,
          time: 'Just now',
          allergicTo: ['Penicillin', 'Latex', 'Aspirin', 'Dairy'][Math.floor(Math.random() * 4)],
          severity: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          status: 'Unread'
        };
        
        setActiveAlerts(prev => [newAlert, ...prev]);
        
        // Display browser notification
        if (Notification.permission === 'granted') {
          new Notification('Patient Allergy Alert', {
            body: `${newAlert.patient} reported an allergic reaction to ${newAlert.allergicTo}`,
            icon: '/api/placeholder/80/80',
          });
        }
      }
    }, 15000);

    // Request notification permission
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>Doctor Dashboard</title>
        <meta name="description" content="Doctor Dashboard with Patient Allergy Alerts" />
      </Head>

      <div className="flex h-screen bg-gray-50">        
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed z-20 top-4 left-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-blue-50"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar - Hidden on mobile by default */}
        <Sidebar/>
        {/* <div className={`fixed md:relative z-30 transform transition-transform duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-white shadow-lg h-full`}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-blue-700">MediDash</h2>
            <p className="text-gray-600 text-sm mt-1">Physician Portal</p>
          </div>
          <div className="mt-6">
            <nav>
              <a 
                onClick={() => {setActiveTab('dashboard'); setShowSidebar(false)}}
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-500 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Activity className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </a>
              <a 
                onClick={() => {setActiveTab('patients'); setShowSidebar(false)}}
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'patients' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-500 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Patients</span>
              </a>
              <a 
                onClick={() => {setActiveTab('appointments'); setShowSidebar(false)}}
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'appointments' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-500 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                <span>Appointments</span>
              </a>
              <a 
                onClick={() => {setActiveTab('records'); setShowSidebar(false)}}
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'records' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-500 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <FileText className="h-5 w-5 mr-3" />
                <span>Records</span>
              </a>
              <a 
                onClick={() => {setActiveTab('alerts'); setShowSidebar(false)}}
                className={`flex items-center px-6 py-3 cursor-pointer ${activeTab === 'alerts' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-500 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Bell className="h-5 w-5 mr-3" />
                <span>Notifications</span>
              </a>
            </nav>
          </div>
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">Dr. Williams</p>
                <p className="text-xs text-gray-500">Cardiologist</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="flex justify-between items-center px-8 py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 font-medium">Welcome back, Dr. Williams</p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
                  {activeAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {activeAlerts.length}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <MessageCircle className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </div>
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors rounded-full p-1 pr-4 cursor-pointer">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Doctor profile" 
                    className="h-10 w-10 rounded-full border-2 border-white shadow" 
                  />
                  <span className="text-gray-700 font-medium ml-2">Dr. Williams</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform hover:scale-105 cursor-pointer hover:shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Total Patients</p>
                    <h3 className="text-3xl font-bold text-gray-800">1,248</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-green-600">
                  ↑ 8.5% from last month
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform hover:scale-105 cursor-pointer hover:shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Today's Appointments</p>
                    <h3 className="text-3xl font-bold text-gray-800">{appointments.length}</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-green-600">
                  All appointments confirmed
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform hover:scale-105 cursor-pointer hover:shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Avg. Wait Time</p>
                    <h3 className="text-3xl font-bold text-gray-800">12 min</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-yellow-600">
                  ↓ 2 minutes from last week
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 transform transition-transform hover:scale-105 cursor-pointer hover:shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Active Alerts</p>
                    <h3 className="text-3xl font-bold text-gray-800">{activeAlerts.length}</h3>
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium text-red-600">
                  {activeAlerts.length > 0 ? 'Requires attention' : 'No active alerts'}
                </div>
              </div>
            </div>

            {/* Graph Section */}
            <div className="bg-white rounded-xl shadow-md mb-8">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Monthly Patient Statistics</h2>
                <p className="text-gray-600 mt-1">Overview of patients treated in the past 30 days</p>
              </div>
              <div className="p-6">
                <Line data={chartData} options={chartOptions} height={80} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Allergy Alerts */}
              <div className="bg-white rounded-xl shadow-md lg:col-span-2">
                <div className="flex justify-between items-center p-6 border-b">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Patient Allergy Alerts</h2>
                    <p className="text-gray-600 mt-1">SOS signals from patients experiencing allergic reactions</p>
                  </div>
                  
                </div>
                <div className="p-6">
                  {activeAlerts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <p className="text-lg font-medium">No active allergy alerts at the moment</p>
                      <p className="text-gray-500 mt-2">All patient allergies are currently under control</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeAlerts.map(alert => (
                        <div 
                          key={alert.id} 
                          className="flex items-center p-4 bg-red-50 border border-red-100 rounded-xl cursor-pointer hover:bg-red-100 transition-colors transform hover:scale-105"
                          onClick={() => handleAlertClick(alert)}
                        >
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-14 w-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-md">
                              <AlertCircle className="h-8 w-8" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-800">{alert.patient}, {alert.age}</h3>
                            <p className="text-gray-700">Allergic to: <span className="font-bold text-red-600">{alert.allergicTo}</span></p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                              alert.severity === 'High' ? 'bg-red-100 text-red-800' : 
                              alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity} Severity
                            </span>
                            <p className="text-sm text-gray-500 font-medium mt-2">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Today's Appointments */}
              <div>
                <div className="bg-white rounded-xl shadow-md mb-6">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Upcoming Patients</h2>
                    <p className="text-gray-600 mt-1">Next patients in your schedule</p>
                  </div>
                  <div className="p-6">
                    {upcomingPatients.map(patient => (
                      <div key={patient.id} className="flex items-center py-3 hover:bg-blue-50 rounded-lg p-2 cursor-pointer transform transition-transform hover:scale-105">
                        <img 
                          src={patient.image} 
                          alt={patient.name} 
                          className="h-12 w-12 rounded-full border-2 border-white shadow mr-4" 
                        />
                        <div>
                          <h3 className="font-bold text-gray-800">{patient.name}</h3>
                          <p className="text-gray-600">{patient.age} years • {patient.appointment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md">
                  <div className="flex justify-between items-center p-6 border-b">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Today's Schedule</h2>
                      <p className="text-gray-600 mt-1">Your appointments for today</p>
                    </div>
                        
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {appointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center p-3 hover:bg-blue-50 rounded-lg cursor-pointer transform transition-transform hover:scale-105">
                          <div className="w-20 text-center">
                            <span className="text-sm font-bold text-gray-800 bg-gray-200 rounded-lg px-3 py-1">{appointment.time}</span>
                          </div>
                          <div className="flex-grow ml-4">
                            <h3 className="font-bold text-gray-800">{appointment.patient}</h3>
                            <p className="text-gray-600">{appointment.type}</p>
                          </div>
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                              appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {showSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Alert Modal */}
      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
            <div className="border-b p-4 flex justify-between items-center bg-red-500 text-white rounded-t-xl">
              <div className="flex items-center">
                <AlertCircle className="h-6 w-6 mr-2" />
                <h3 className="text-lg font-bold">Patient Allergy Alert</h3>
              </div>
              <button 
                onClick={() => setShowAlertModal(false)}
                className="text-white hover:text-gray-200 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <img 
                  src="/api/placeholder/50/50" 
                  alt={selectedAlert.patient} 
                  className="h-14 w-14 rounded-full border-2 border-white shadow mr-4" 
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedAlert.patient}</h4>
                  <p className="text-gray-600">Age: {selectedAlert.age} • Reported: {selectedAlert.time}</p>
                </div>
              </div>
              
              <div className="p-5 mb-6 bg-red-50 border border-red-200 rounded-xl">
                <h5 className="font-bold text-lg mb-3 text-gray-800">Allergy Details</h5>
                <p className="mb-3 text-gray-700"><strong>Allergen:</strong> <span className="font-bold text-red-600">{selectedAlert.allergicTo}</span></p>
                <p className="mb-3 text-gray-700"><strong>Severity:</strong> <span className={`font-bold ${
                  selectedAlert.severity === 'High' ? 'text-red-600' : 
                  selectedAlert.severity === 'Medium' ? 'text-yellow-600' : 
                  'text-blue-600'
                }`}>{selectedAlert.severity}</span></p>
                <p className="text-gray-700"><strong>Symptoms:</strong> Skin rash, difficulty breathing, swelling</p>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center justify-center shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
                  onClick={() => {
                    alert('Contacting patient...');
                  }}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Patient
                </button>
                <button 
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold flex items-center justify-center shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
                  onClick={() => handleResolveAlert(selectedAlert.id)}
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
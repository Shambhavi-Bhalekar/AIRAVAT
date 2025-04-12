"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head';
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
  Activity
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
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Patients Treated (Past Month)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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

      <div className="flex h-screen bg-gray-100">        

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-8 py-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-gray-500">Welcome back, Dr. Williams</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="h-6 w-6 text-gray-500" />
                  {activeAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {activeAlerts.length}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="Doctor profile" 
                    className="h-10 w-10 rounded-full mr-2" 
                  />
                  <span className="text-gray-700">Dr. Williams</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Patients</p>
                    <h3 className="text-2xl font-bold">1,248</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Today's Appointments</p>
                    <h3 className="text-2xl font-bold">{appointments.length}</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Avg. Wait Time</p>
                    <h3 className="text-2xl font-bold">12 min</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-gray-500">Active Alerts</p>
                    <h3 className="text-2xl font-bold">{activeAlerts.length}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Graph Section */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Monthly Patient Statistics</h2>
              </div>
              <div className="p-4">
                <Line data={chartData} options={chartOptions} height={80} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Allergy Alerts */}
              <div className="bg-white rounded-lg shadow lg:col-span-2">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold">Patient Allergy Alerts</h2>
                  <button className="text-blue-500 hover:text-blue-600">View All</button>
                </div>
                <div className="p-4">
                  {activeAlerts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-10 w-10 mx-auto mb-2 text-green-500" />
                      <p>No active allergy alerts at the moment</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {activeAlerts.map(alert => (
                        <div 
                          key={alert.id} 
                          className="flex items-center p-3 bg-red-50 border border-red-100 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                          onClick={() => handleAlertClick(alert)}
                        >
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                              <AlertTriangle className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold">{alert.patient}, {alert.age}</h3>
                            <p className="text-sm text-gray-600">Allergic to: <span className="font-medium">{alert.allergicTo}</span></p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              alert.severity === 'High' ? 'bg-red-100 text-red-800' : 
                              alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity} Severity
                            </span>
                            <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Today's Appointments */}
              <div>
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Upcoming Patients</h2>
                  </div>
                  <div className="p-4">
                    {upcomingPatients.map(patient => (
                      <div key={patient.id} className="flex items-center py-2">
                        <img 
                          src={patient.image} 
                          alt={patient.name} 
                          className="h-10 w-10 rounded-full mr-3" 
                        />
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-gray-500">{patient.age} years • {patient.appointment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Today's Schedule</h2>
                    <button className="text-blue-500 hover:text-blue-600">View All</button>
                  </div>
                  <div className="p-4">
                    <div className="space-y-3">
                      {appointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
                          <div className="w-16 text-sm font-medium text-gray-600">
                            {appointment.time}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{appointment.patient}</h3>
                            <p className="text-sm text-gray-500">{appointment.type}</p>
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
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

      {/* Alert Modal */}
      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Patient Allergy Alert</h3>
              <button 
                onClick={() => setShowAlertModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-bold text-xl">{selectedAlert.patient}</h4>
                <p className="text-gray-600">Age: {selectedAlert.age} • Reported: {selectedAlert.time}</p>
              </div>
              
              <div className="p-4 mb-4 bg-red-50 border border-red-100 rounded-lg">
                <h5 className="font-semibold text-lg mb-2">Allergy Details</h5>
                <p className="mb-2"><strong>Allergen:</strong> {selectedAlert.allergicTo}</p>
                <p className="mb-2"><strong>Severity:</strong> {selectedAlert.severity}</p>
                <p><strong>Symptoms:</strong> Skin rash, difficulty breathing, swelling</p>
              </div>
              
              <div className="space-y-3">
                <button 
                  className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => {
                    alert('Contacting patient...');
                  }}
                >
                  Contact Patient
                </button>
                <button 
                  className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => handleResolveAlert(selectedAlert.id)}
                >
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
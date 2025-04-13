"use client";
import React from 'react'; 

import { useState, useEffect } from 'react';
import { 
  Search, Filter, Bell, Calendar, AlertCircle, 
  Info, Clock, CheckCircle, XCircle, User
} from 'lucide-react';
import Sidebar from '../components/sidebar';

// Sample data for demonstration
const samplePendingRequests = [
  { id: 1, name: 'Jane Smith', age: 45, requestType: 'Consultation', urgency: 'High', symptoms: 'Severe headache, fever', date: '2025-04-10', contact: '555-123-4567' },
  { id: 2, name: 'John Doe', age: 32, requestType: 'Follow-up', urgency: 'Medium', symptoms: 'Persistent cough', date: '2025-04-11', contact: '555-987-6543' },
  { id: 3, name: 'Robert Johnson', age: 58, requestType: 'Emergency', urgency: 'High', symptoms: 'Chest pain, shortness of breath', date: '2025-04-12', contact: '555-342-9876' },
  { id: 4, name: 'Emily Davis', age: 28, requestType: 'Consultation', urgency: 'Low', symptoms: 'Skin rash, itching', date: '2025-04-09', contact: '555-111-2222' },
  { id: 5, name: 'Michael Brown', age: 67, requestType: 'Follow-up', urgency: 'Medium', symptoms: 'Joint pain, swelling', date: '2025-04-08', contact: '555-444-5555' },
];

const sampleCurrentPatients = [
  { id: 6, name: 'Sarah Wilson', age: 39, status: 'Under Treatment', condition: 'Hypertension', lastVisit: '2025-04-05', nextVisit: '2025-04-19', contact: '555-666-7777' },
  { id: 7, name: 'David Clark', age: 52, status: 'Follow-Up Required', condition: 'Diabetes type 2', lastVisit: '2025-04-02', nextVisit: '2025-04-16', contact: '555-888-9999' },
  { id: 8, name: 'Lisa Garcia', age: 41, status: 'Recovered', condition: 'Bronchitis', lastVisit: '2025-03-25', nextVisit: null, contact: '555-222-3333' },
];

export default function DoctorDashboard() {
  const [pendingRequests, setPendingRequests] = useState(samplePendingRequests);
  const [currentPatients, setCurrentPatients] = useState(sampleCurrentPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const [viewMode, setViewMode] = useState('pending');

  const handleAcceptRequest = (requestId) => {
    const request = pendingRequests.find(req => req.id === requestId);
    if (request) {
      const newPatient = {
        ...request,
        status: 'Under Treatment',
        lastVisit: new Date().toISOString().split('T')[0],
        nextVisit: null
      };
      
      setCurrentPatients([...currentPatients, newPatient]);
      setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
      
      // Show notification effect
      setNotificationCount(prev => prev + 1);
    }
  };

  const handleRejectRequest = (requestId) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
  };

  const handleStatusChange = (patientId, newStatus) => {
    setCurrentPatients(currentPatients.map(patient => 
      patient.id === patientId ? {...patient, status: newStatus} : patient
    ));
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const closePatientDetails = () => {
    setSelectedPatient(null);
  };

  const filteredPendingRequests = pendingRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          request.symptoms.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || request.urgency.toLowerCase() === filterBy.toLowerCase() || 
                          request.requestType.toLowerCase() === filterBy.toLowerCase();
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'urgency') {
      const urgencyOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return sortOrder === 'asc' 
        ? urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
        : urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    } else {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const filteredCurrentPatients = currentPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || patient.status.toLowerCase().includes(filterBy.toLowerCase());
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.lastVisit) - new Date(b.lastVisit) : new Date(b.lastVisit) - new Date(a.lastVisit);
    } else {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Under Treatment': return 'text-blue-500';
      case 'Follow-Up Required': return 'text-amber-500';
      case 'Recovered': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  // Show notification effect
  useEffect(() => {
    // You could connect this to a real notification system
  }, [notificationCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span>Dr. Anderson</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          {/* Controls */}
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => setViewMode('pending')} 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'pending' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'}`}
              >
                Pending Requests
              </button>
              <button 
                onClick={() => setViewMode('current')} 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${viewMode === 'current' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-50'}`}
              >
                Current Patients
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 text-gray-700"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-700"
                >
                  <option value="all">All</option>
                  <option value="high">High Urgency</option>
                  <option value="medium">Medium Urgency</option>
                  <option value="low">Low Urgency</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                  <option value="under treatment">Under Treatment</option>
                  <option value="follow-up required">Follow-Up Required</option>
                  <option value="recovered">Recovered</option>
                </select>
                <Filter size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-gray-700"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="urgency">Sort by Urgency</option>
                </select>
                <Clock size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
              </button>
            </div>
          </div>

          {/* Patient Lists */}
          {viewMode === 'pending' && (
            <div >
              <h2 className="text-xl font-bold mb-4 text-blue-800">Pending Patient Requests</h2>
              
              {filteredPendingRequests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Info size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">No pending requests</h3>
                  <p className="text-gray-500 mt-2">All patient requests have been processed.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPendingRequests.map(request => (
                    <div 
                      key={request.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102 hover:shadow-lg"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3 ">
                          <h3 className="font-bold text-lg text-blue-900">{request.name}</h3>
                          <div className="mt-3 flex items-center">
    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getUrgencyColor(request.urgency)} bg-opacity-30 bg-current`}>
        {request.urgency} Urgency
    </span>
</div>

                        </div>
                        
                        <div className="mb-3 text-sm text-gray-500 flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Requested on {request.date}</span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-sm font-medium text-blue-800">Request Type:</div>
                          <div className="text-gray-700">{request.requestType}</div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium text-blue-800">Symptoms:</div>
                          <div className="text-gray-700">{request.symptoms}</div>
                        </div>
                        
                        <div className="flex justify-between gap-2">
                          <button 
                            onClick={() => handleRejectRequest(request.id)}
                            className="flex-1 py-2 px-4 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex justify-center items-center gap-2"
                          >
                            <XCircle size={16} />
                            Reject
                          </button>
                          <button 
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex-1 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center gap-2"
                          >
                            <CheckCircle size={16} />
                            Accept
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handlePatientSelect(request)}
                          className="w-full mt-2 py-1 px-4 rounded-lg text-blue-600 text-sm hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {viewMode === 'current' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-blue-800">Current Patients</h2>
              
              {filteredCurrentPatients.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Info size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">No current patients</h3>
                  <p className="text-gray-500 mt-2">You haven't accepted any patient requests yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCurrentPatients.map(patient => (
                    <div 
                      key={patient.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102 hover:shadow-lg"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-blue-900">{patient.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(patient.status)} bg-opacity-20 bg-current`}>
                            {patient.status}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-sm font-medium text-blue-800">Condition:</div>
                          <div className="text-gray-700">{patient.condition}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                          <div>
                            <div className="font-medium text-blue-800">Last Visit:</div>
                            <div className="text-gray-700">{patient.lastVisit}</div>
                          </div>
                          <div>
                            <div className="font-medium text-blue-800">Next Visit:</div>
                            <div className="text-gray-700">{patient.nextVisit || 'Not scheduled'}</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-sm font-medium text-blue-800">Update Status:</div>
                          <div className="flex gap-2 mt-1">
                            <button 
                              onClick={() => handleStatusChange(patient.id, 'Under Treatment')}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                patient.status === 'Under Treatment' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                            >
                              Under Treatment
                            </button>
                            <button 
                              onClick={() => handleStatusChange(patient.id, 'Follow-Up Required')}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                patient.status === 'Follow-Up Required' 
                                  ? 'bg-amber-600 text-white' 
                                  : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                              }`}
                            >
                              Follow-Up
                            </button>
                            <button 
                              onClick={() => handleStatusChange(patient.id, 'Recovered')}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                patient.status === 'Recovered' 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-green-100 text-green-600 hover:bg-green-200'
                              }`}
                            >
                              Recovered
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handlePatientSelect(patient)}
                          className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center gap-2"
                        >
                          <Info size={16} />
                          View Patient Details
                        </button>

                        {/* Message Button */}
                        <button 
                          onClick={() => alert(`Messaging ${patient.name}`)} // Replace with actual messaging logic
                          className="w-full mt-2 py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex justify-center items-center gap-2"
                        >
                          <User size={16} />
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
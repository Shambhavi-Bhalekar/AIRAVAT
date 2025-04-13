"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { Search, MessageSquare, UserPlus, Check, X, Send, ArrowLeft } from 'lucide-react';
import PatientSidebar from '@/app/components/sidebar_patient';

export default function PatientDoctorConnections() {
  // Sample data for doctors
  const [allDoctors, setAllDoctors] = useState([
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", connected: true, avatar: "/api/placeholder/50/50", lastActive: "5m ago" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurologist", connected: true, avatar: "/api/placeholder/50/50", lastActive: "2h ago" },
    { id: 3, name: "Dr. Emily Rodriguez", specialty: "Pediatrician", connected: true, avatar: "/api/placeholder/50/50", lastActive: "1h ago" },
    { id: 4, name: "Dr. David Williams", specialty: "Orthopedic Surgeon", connected: false, avatar: "/api/placeholder/50/50", lastActive: "3h ago" },
    { id: 5, name: "Dr. James Wilson", specialty: "Dermatologist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "30m ago" },
    { id: 6, name: "Dr. Linda Thompson", specialty: "Psychiatrist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "1d ago" },
    { id: 7, name: "Dr. Robert Garcia", specialty: "Endocrinologist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "4h ago" },
    { id: 8, name: "Dr. Jennifer Lee", specialty: "Ophthalmologist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "2d ago" },
    { id: 9, name: "Dr. Daniel Martinez", specialty: "Gastroenterologist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "1h ago" },
    { id: 10, name: "Dr. Lisa Brown", specialty: "Rheumatologist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "45m ago" },
    { id: 11, name: "Dr. Kevin Taylor", specialty: "Pulmonologist", connected: false, avatar: "/api/placeholder/50/50", lastActive: "3h ago" },
    { id: 12, name: "Dr. Rebecca Adams", specialty: "Oncologist", connected: true, avatar: "/api/placeholder/50/50", lastActive: "Just now" },
  ]);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
 
  // Filtered doctors based on search query
  const [filteredDoctors, setFilteredDoctors] = useState([...allDoctors]);
 
  // Chat state
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
 
  // Request states
  const [pendingRequests, setPendingRequests] = useState([]);

  // Update filtered doctors when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDoctors([...allDoctors]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allDoctors.filter(
        doctor =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query)
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, allDoctors]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Send connection request to a doctor
  const sendConnectionRequest = (doctorId) => {
    const doctor = allDoctors.find(doc => doc.id === doctorId);
   
    // Add to pending requests
    if (!pendingRequests.some(req => req.id === doctorId)) {
      setPendingRequests([...pendingRequests, doctor]);
     
      // Simulate automatic acceptance after 3 seconds (for demo purposes)
      setTimeout(() => {
        acceptRequest(doctorId);
      }, 3000);
    }
  };

  // Accept connection request (simulated doctor's action)
  const acceptRequest = (doctorId) => {
    // Update doctor's connected status
    setAllDoctors(prevDoctors =>
      prevDoctors.map(doctor =>
        doctor.id === doctorId ? { ...doctor, connected: true } : doctor
      )
    );
   
    // Remove from pending requests
    setPendingRequests(prevRequests =>
      prevRequests.filter(req => req.id !== doctorId)
    );
   
    // Initialize empty chat
    setChatMessages(prevChats => ({
      ...prevChats,
      [doctorId]: [
        {
          sender: 'doctor',
          text: 'Hello! How can I help you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  };

  // Open chat with a doctor
  const openChat = (doctorId) => {
    setActiveChat(doctorId);
   
    // Initialize chat if it doesn't exist
    if (!chatMessages[doctorId]) {
      setChatMessages(prevChats => ({
        ...prevChats,
        [doctorId]: [
          {
            sender: 'doctor',
            text: 'Hello! How can I help you today?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
    }
  };

  // Close active chat
  const closeChat = () => {
    setActiveChat(null);
  };

  // Send message in chat
  const sendMessage = () => {
    if (newMessage.trim() === '' || !activeChat) return;
   
    // Add patient message
    setChatMessages(prevChats => ({
      ...prevChats,
      [activeChat]: [
        ...(prevChats[activeChat] || []),
        {
          sender: 'patient',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
   
    setNewMessage('');
   
    // Simulate doctor's response after 1 second
    setTimeout(() => {
      const doctor = allDoctors.find(doc => doc.id === activeChat);
      const responses = [
        "I understand. Let me check your records.",
        `As your ${doctor.specialty}, I recommend we follow up on this.`,
        "Have you been taking the prescribed medication regularly?",
        "That's good to hear. Keep monitoring and let me know if anything changes.",
        "I'll make a note of these symptoms in your file.",
        "Would you be available for an appointment next week?"
      ];
     
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
     
      setChatMessages(prevChats => ({
        ...prevChats,
        [activeChat]: [
          ...(prevChats[activeChat] || []),
          {
            sender: 'doctor',
            text: randomResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
    }, 1000);
  };

  // Get connected and available doctors
  const connectedDoctors = filteredDoctors.filter(doctor => doctor.connected);
  const availableDoctors = filteredDoctors.filter(doctor => !doctor.connected);

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Fixed sidebar on the left */}
      <div className="fixed left-0 top-0 h-full z-10">
        <PatientSidebar />
      </div>
      
      {/* Main content with left margin to accommodate sidebar */}
      <div className="flex-1 p-4 md:p-8 ml-16 md:ml-20">
        <div className="max-w-6xl mx-auto">
          
          <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Your Medical Network</h1>
            <p className="text-blue-600 mt-2">Connect with specialists and manage your healthcare team</p>
          </header>
         
          {/* Search and Pending Requests */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for doctors by name or specialty..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                />
              </div>
             
              {pendingRequests.length > 0 && (
                <div className="bg-blue-100 rounded-lg px-4 py-2 text-sm text-blue-800 flex items-center">
                  <span className="font-medium mr-1">{pendingRequests.length}</span>
                  <span>pending connection{pendingRequests.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
           
            {/* Pending Requests Section */}
            {pendingRequests.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-blue-800 mb-3">Pending Requests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingRequests.map(doctor => (
                    <div key={`pending-${doctor.id}`} className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={doctor.avatar} alt={doctor.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <h3 className="font-medium">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs">Pending</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
         
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Connected Doctors */}
            <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <Check size={20} className="text-green-500 mr-2" />
                Connected Doctors
              </h2>
             
              {connectedDoctors.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No connected doctors found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {connectedDoctors.map(doctor => (
                    <div key={doctor.id} className="border border-blue-100 rounded-lg p-4 flex justify-between items-center hover:bg-blue-50 transition-colors">
                      <div className="flex items-center">
                        <img src={doctor.avatar} alt={doctor.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h3 className="font-medium text-blue-900">{doctor.name}</h3>
                          <p className="text-sm text-blue-600">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500">Last active: {doctor.lastActive}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => openChat(doctor.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center cursor-pointer"
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
           
            {/* Available Doctors */}
            <div className="lg:w-1/2 bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">
                Available Specialists
              </h2>
             
              {availableDoctors.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No available doctors found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableDoctors.map(doctor => (
                    <div key={doctor.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <img src={doctor.avatar} alt={doctor.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h3 className="font-medium">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <p className="text-xs text-gray-500">Last active: {doctor.lastActive}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => sendConnectionRequest(doctor.id)}
                        className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center cursor-pointer ${
                          pendingRequests.some(req => req.id === doctor.id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={pendingRequests.some(req => req.id === doctor.id)}
                      >
                        <UserPlus size={16} className="mr-2" />
                        {pendingRequests.some(req => req.id === doctor.id) ? 'Requested' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {activeChat && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-[32rem] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center">
                <button onClick={closeChat} className="mr-2 cursor-pointer">
                  <ArrowLeft size={20} />
                </button>
                <div className="flex items-center">
                  <img
                    src={allDoctors.find(d => d.id === activeChat)?.avatar}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                  />
                  <div>
                    <h3 className="font-medium">{allDoctors.find(d => d.id === activeChat)?.name}</h3>
                    <p className="text-xs text-blue-100">{allDoctors.find(d => d.id === activeChat)?.specialty}</p>
                  </div>
                </div>
              </div>
              <span className="text-xs bg-green-500 px-2 py-1 rounded-full">Online</span>
            </div>
           
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 text-gray-700">
              {chatMessages[activeChat]?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'patient'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
           
            {/* Chat Input */}
            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from 'react';
import { Calendar, Clock, MapPin, Mail, Phone, MessageSquare, Star, Edit, Award, Briefcase, Heart } from 'lucide-react';
import Sidebar from '../components/sidebar';

export default function DoctorProfile() {
  const [editMode, setEditMode] = useState(false);
  


  const doctor = {
    name: "Dr. Sarah Johnson",
    title: "MD, FACP",
    specialty: "Cardiology",
    bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She completed her medical degree at Johns Hopkins University and residency at Mayo Clinic. Dr. Johnson takes a patient-centered approach, focusing on preventive care and lifestyle modifications alongside medical interventions.",
    availability: [
      { day: "Monday", hours: "9:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 4:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
      { day: "Friday", hours: "9:00 AM - 3:00 PM" },
    ],
    services: [
      "Cardiovascular Risk Assessment",
      "Echocardiography",
      "Holter Monitoring",
      "Stress Testing",
      "Heart Disease Management"
    ],
    contact: {
      email: "dr.johnson@heartcare.med",
      phone: "(555) 123-4567",
      address: "123 Medical Center Drive, Suite 300, Healthcare City"
    },
    reviews: [
      { author: "James W.", rating: 5, text: "Dr. Johnson took the time to explain everything thoroughly. Very knowledgeable and caring." },
      { author: "Maria S.", rating: 5, text: "Excellent doctor who truly listens to patient concerns. Her preventative approach has helped me immensely." },
      { author: "Robert T.", rating: 4, text: "Professional, punctual, and thorough. The office staff is also very helpful." }
    ]
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="min-h-screen flex  bg-gray-100 ">
        {/* Sidebar */}
        <div className="sticky top-0 h-screen hidden md:block bg-white shadow-lg w-64">

            <Sidebar /> 
        </div>
      

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-2">
          <button 
            onClick={toggleEditMode} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            <Edit size={16} /> {editMode ? "View Profile" : "Edit Profile"}
          </button>
        </div>
        
        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-600 h-24 md:h-32"></div>
          <div className="flex flex-col md:flex-row p-6 relative">
            <div className="absolute top-0 transform -translate-y-1/2 left-8 md:left-10 bg-white p-2 rounded-full shadow-lg">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full overflow-hidden">
                <img 
                  src="/api/placeholder/150/150" 
                  alt="Dr. Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="mt-16 md:mt-0 md:ml-40 flex-grow">
              <div className="flex flex-wrap items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{doctor.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <span>{doctor.title}</span>
                    <span className="text-blue-600">•</span>
                    <span>{doctor.specialty}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-yellow-500 mt-2 md:mt-0">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <span className="ml-1 text-gray-700">({doctor.reviews.length} reviews)</span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Award size={16} /> Board Certified
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Briefcase size={16} /> 15+ Years Experience
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Heart size={16} /> Patient-Centered Care
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6 pt-2">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">About</h2>
            {editMode ? (
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 min-h-32"
                defaultValue={doctor.bio}
              ></textarea>
            ) : (
              <p className="text-gray-600">{doctor.bio}</p>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
        {/* Contact Information */}
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-4">
            <h2 className="text-white font-semibold text-lg">Contact Information</h2>
            </div>
            <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
                <div className="text-blue-600 mt-1">
                <MapPin size={20} />
            </div>
             <div>
            <h3 className="font-medium text-gray-800">Office Address</h3>
            {editMode ? (
                <input
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                defaultValue={doctor.contact.address}
                />
            ) : (
                <p className="text-gray-600">{doctor.contact.address}</p>
            )}
            </div>
        </div>
      
      <div className="flex items-start gap-3 mb-4">
        <div className="text-blue-600 mt-1">
          <Phone size={20} />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Phone</h3>
          {editMode ? (
            <input
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              defaultValue={doctor.contact.phone}
            />
          ) : (
            <p className="text-gray-600">{doctor.contact.phone}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="text-blue-600 mt-1">
          <Mail size={20} />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">Email</h3>
          {editMode ? (
            <input
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              defaultValue={doctor.contact.email}
            />
          ) : (
            <p className="text-gray-600">{doctor.contact.email}</p>
          )}
        </div>
      </div>
    </div>
  </div>
  
  {/* Services Offered */}
  <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-blue-600 p-4">
      <h2 className="text-white font-semibold text-lg">Services Offered</h2>
    </div>
    <div className="p-6">
      {editMode ? (
        <div className="space-y-2">
          {doctor.services.map((service, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="flex-grow border border-gray-300 rounded-lg p-2 font-medium text-gray-800 text-lg"
                defaultValue={service}
              />
            </div>
          ))}
          <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
            + Add another service
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {doctor.services.map((service, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              <span className="text-gray-800 text-lg font-semibold">{service}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>
        
        {/* Patient Reviews */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
          <div className="bg-blue-600 p-4">
            <h2 className="text-white font-semibold text-lg">Patient Reviews</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctor.reviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{review.author}</h3>
                    <div className="flex text-yellow-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition duration-300">
                <MessageSquare size={16} /> View All Reviews
              </button>
            </div>
          </div>
        </div>
        
        {/* Save Changes Button (in Edit Mode) */}
        {editMode && (
          <div className="mt-6 flex justify-end">
            <button 
              onClick={toggleEditMode}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
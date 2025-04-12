"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { PlusCircle, Upload, Save, X, FileText } from 'lucide-react';
import PatientSidebar from '../../components/sidebar_patient';

export default function PatientDetailsForm() {
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    allergies: [''],
    dailyDosages: [{ medication: '', dosage: '', frequency: '', time: '' }]
  });
  const [age, setAge] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Calculate age whenever date of birth changes
  useEffect(() => {
    if (patientData.dateOfBirth) {
      const birthDate = new Date(patientData.dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge.toString());
    } else {
      setAge('');
    }
  }, [patientData.dateOfBirth]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new allergy field
  const addAllergy = () => {
    setPatientData((prev) => ({
      ...prev,
      allergies: [...prev.allergies, ''],
    }));
  };

  // Remove allergy field
  const removeAllergy = (index) => {
    setPatientData((prev) => {
      const updatedAllergies = [...prev.allergies];
      updatedAllergies.splice(index, 1);
      return {
        ...prev,
        allergies: updatedAllergies,
      };
    });
  };

  // Update allergy value
  const updateAllergy = (index, value) => {
    setPatientData((prev) => {
      const updatedAllergies = [...prev.allergies];
      updatedAllergies[index] = value;
      return {
        ...prev,
        allergies: updatedAllergies,
      };
    });
  };

  // Add new daily dosage field
  const addDailyDosage = () => {
    setPatientData((prev) => ({
      ...prev,
      dailyDosages: [...prev.dailyDosages, { medication: '', dosage: '', frequency: '', time: '' }],
    }));
  };

  // Remove daily dosage field
  const removeDailyDosage = (index) => {
    setPatientData((prev) => {
      const updatedDosages = [...prev.dailyDosages];
      updatedDosages.splice(index, 1);
      return {
        ...prev,
        dailyDosages: updatedDosages,
      };
    });
  };

  // Update daily dosage value
  const updateDailyDosage = (index, field, value) => {
    setPatientData((prev) => {
      const updatedDosages = [...prev.dailyDosages];
      updatedDosages[index] = { ...updatedDosages[index], [field]: value };
      return {
        ...prev,
        dailyDosages: updatedDosages,
      };
    });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setPrescriptions((prev) => [...prev, ...files]);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setPrescriptions((prev) => [...prev, ...files]);
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setPrescriptions((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Save patient data
  const saveData = () => {
    // Here you would typically send the data to your backend
    console.log('Saving patient data:', patientData);
    console.log('Prescriptions:', prescriptions);
    setShowModal(false);
    alert('Patient data saved successfully!');
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar - Left fixed position */}
      <div className="sticky top-0 h-screen">
              <PatientSidebar />
      </div>
      
      {/* Main Content - with padding to avoid sidebar overlap */}
      <div className="flex-1 mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto ">
          <h1 className="text-2xl font-bold text-blue-800 mb-6">Patient Information</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={patientData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={patientData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={patientData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Age</label>
              <input
                type="text"
                value={age}
                readOnly
                className="w-full p-2 bg-gray-100 border border-blue-200 rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={patientData.height}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={patientData.weight}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-lg font-medium text-blue-700">Allergies</label>
              <button 
                onClick={addAllergy} 
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={20} className="mr-1" />
                <span>Add Allergy</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {patientData.allergies.map((allergy, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={allergy}
                    onChange={(e) => updateAllergy(index, e.target.value)}
                    placeholder="Enter allergy"
                    className="flex-1 p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {patientData.allergies.length > 1 && (
                    <button 
                      onClick={() => removeAllergy(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-lg font-medium text-blue-700">Daily Medication Dosages</label>
              <button 
                onClick={addDailyDosage} 
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={20} className="mr-1" />
                <span>Add Medication</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {patientData.dailyDosages.map((dosage, index) => (
                <div key={index} className="p-4 border border-blue-200 rounded bg-blue-50">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Medication #{index + 1}</h3>
                    {patientData.dailyDosages.length > 1 && (
                      <button 
                        onClick={() => removeDailyDosage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-blue-600 mb-1">Medication Name</label>
                      <input
                        type="text"
                        value={dosage.medication}
                        onChange={(e) => updateDailyDosage(index, 'medication', e.target.value)}
                        placeholder="Enter medication name"
                        className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-1">Dosage</label>
                      <input
                        type="text"
                        value={dosage.dosage}
                        onChange={(e) => updateDailyDosage(index, 'dosage', e.target.value)}
                        placeholder="E.g., 10mg, 1 tablet"
                        className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-1">Frequency</label>
                      <select
                        value={dosage.frequency}
                        onChange={(e) => updateDailyDosage(index, 'frequency', e.target.value)}
                        className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select frequency</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed">As needed</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-blue-600 mb-1">Time of Day</label>
                      <select
                        value={dosage.time}
                        onChange={(e) => updateDailyDosage(index, 'time', e.target.value)}
                        className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Bedtime">Bedtime</option>
                        <option value="With meals">With meals</option>
                        <option value="Before meals">Before meals</option>
                        <option value="After meals">After meals</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-lg font-medium text-blue-700">Prescriptions</label>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Upload size={18} className="mr-2" />
                Upload Prescriptions
              </button>
            </div>
            
            {prescriptions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-medium text-blue-700 mb-2">Uploaded Prescriptions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {prescriptions.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="flex items-center">
                        <FileText size={20} className="text-blue-600 mr-2" />
                        <span className="truncate max-w-xs">{file.name}</span>
                      </div>
                      <button 
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={saveData}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Save size={20} className="mr-2" />
              Save Information
            </button>
          </div>
        </div>
      </div>

      {/* Prescription Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-800">Upload Prescriptions</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div 
              className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="mb-4 flex justify-center">
                <Upload size={48} className="text-blue-500" />
              </div>
              <p className="mb-2 text-blue-800 text-lg">Drag and drop files here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <input
                type="file"
                id="prescription-upload"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="prescription-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Browse Files
              </label>
              <p className="mt-4 text-sm text-gray-500">Accepted formats: PDF, JPG, PNG</p>
            </div>
            
            {prescriptions.length > 0 && (
              <div>
                <h3 className="text-md font-medium text-blue-700 mb-2">Files to Upload:</h3>
                <div className="max-h-40 overflow-y-auto mb-4">
                  <ul className="space-y-2">
                    {prescriptions.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-blue-50 p-2 rounded">
                        <div className="flex items-center">
                          <FileText size={16} className="text-blue-600 mr-2" />
                          <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                        <button 
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveData}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
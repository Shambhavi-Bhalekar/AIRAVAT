"use client";
import React from 'react';
import { useState, useRef } from 'react';
import PatientSidebar from '../../components/sidebar_patient';
import { Upload, X, FileText, Image, AlertCircle, Search, AlertTriangle } from 'lucide-react';

export default function SearchPrescriptionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingResults, setProcessingResults] = useState<null | {
    medications: string[];
    warnings: string[];
  }>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file type is supported
      if (!file.type.startsWith('image/')) {
        setError("Only image files (JPEG, PNG, GIF) are supported by our analysis system.");
        return;
      }
      
      setUploadedFile(file);
      setError(null);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // If PDF, show a generic preview
        setPreview(null);
      }
    }
  };

  const handleAddAllergy = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && allergyInput.trim()) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput('');
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check if file type is supported
      if (!file.type.startsWith('image/')) {
        setError("Only image files (JPEG, PNG, GIF) are supported by our analysis system.");
        return;
      }
      
      setUploadedFile(file);
      setError(null);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // If PDF, show a generic preview
        setPreview(null);
      }
    }
  };

  const handleProcessPrescription = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setError(null);
    
    // Create form data to send to the backend
    const formData = new FormData();
    formData.append('image', uploadedFile);
    formData.append('allergies', allergies.join(', '));
    
    try {
      const response = await fetch('http://localhost:5000/api/extract_and_check', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error processing prescription');
      }
      
      const data = await response.json();
      
      // Parse the Gemini API response
      // The extracted medicines text might need parsing to get a clean array
      const medicationText = data.extracted_medicines;
      
      // Simple parsing - assuming the response is a list of medicines
      // This may need adjustment based on actual Gemini response format
      const medicationsList = medicationText.split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^[-•]\s/, '').trim());
      
      // Check for warnings in the response
      const warningsList = [];
      if (data.allergy_check_result && !data.allergy_check_result.toLowerCase().includes('no likely allergic reactions')) {
        warningsList.push(`⚠ ${data.allergy_check_result}`);
      }
      
      setProcessingResults({
        medications: medicationsList,
        warnings: warningsList,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process the prescription');
      setProcessingResults(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setPreview(null);
    setProcessingResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar component with proper spacing */}
      <div className="h-screen sticky top-0 flex-shrink-0 z-20">
        <PatientSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <main className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Search Prescription</h1>
            <p className="text-gray-600 mt-2">
              Upload your prescription and we'll analyze it for you
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertTriangle size={20} className="text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Your Prescription</h2>
              
              {/* Upload area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  uploadedFile ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                } transition-colors cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                aria-label="Upload prescription area - click or drag a file here"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click();
                  }
                }}
              >
                {uploadedFile ? (
                  <div className="relative">
                    <button 
                      className="absolute top-0 right-0 bg-red-100 p-1 rounded-full text-red-600 hover:bg-red-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                      aria-label="Remove uploaded file"
                    >
                      <X size={16} />
                    </button>
                    
                    {preview ? (
                      <div className="relative mx-auto max-w-xs">
                        <img 
                          src={preview} 
                          alt="Prescription preview" 
                          className="max-h-64 mx-auto rounded" 
                        />
                        <p className="mt-2 text-sm text-gray-600 font-medium">{uploadedFile.name}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FileText size={48} className="text-blue-600 mb-2" />
                        <p className="text-gray-700 font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500 mt-1">Document</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload size={48} className="text-blue-700 mb-3" />
                    <p className="text-gray-700 font-medium">Click or drag file to upload</p>
                    <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG, and GIF images</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/gif"
                  aria-label="Upload prescription file"
                />
              </div>

              {/* Allergies section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3 text-gray-800">Your Allergies</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Add any allergies so we can check your prescription for potential issues
                </p>
                
                {/* Allergy input */}
                <div className="relative">
                  <input
                    type="text"
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    onKeyDown={handleAddAllergy}
                    placeholder="Type an allergy and press Enter"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    aria-label="Add allergy"
                  />
                </div>
                
                {/* Allergy tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {allergies.map((allergy, index) => (
                    <div 
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                    >
                      <span>{allergy}</span>
                      <button 
                        onClick={() => handleRemoveAllergy(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        aria-label={`Remove ${allergy} allergy`}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {allergies.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No allergies added yet</p>
                  )}
                </div>
              </div>
              
              {/* Process button */}
              <button
                className={`mt-6 w-full py-3 px-4 rounded-lg font-medium text-white ${
                  uploadedFile ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
                } transition-colors flex items-center justify-center`}
                onClick={handleProcessPrescription}
                disabled={!uploadedFile || isProcessing}
                aria-label="Process prescription"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Search size={18} className="mr-2" />
                    Analyze Prescription
                  </>
                )}
              </button>
            </div>

            {/* Results section */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis Results</h2>
              
              {processingResults ? (
                <div className="space-y-6">
                  {/* Medications found */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-gray-800">Medications Identified</h3>
                    <ul className="space-y-2">
                      {processingResults.medications.map((med, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded-lg flex items-start">
                          <FileText size={18} className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">{med}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Take as directed by your physician
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Warnings section */}
                  {processingResults.warnings.length > 0 ? (
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-gray-800 flex items-center">
                        <AlertCircle size={18} className="text-red-600 mr-2" />
                        Warnings
                      </h3>
                      <ul className="space-y-2">
                        {processingResults.warnings.map((warning, index) => (
                          <li key={index} className="p-3 bg-red-50 text-red-800 rounded-lg whitespace-pre-line">
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-3 bg-green-50 text-green-800 rounded-lg">
                      <p>✓ No potential allergic reactions detected with your medication.</p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Always consult with your healthcare provider before making any changes to your medication regimen.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Image size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No Prescription Analyzed Yet</h3>
                  <p className="text-gray-500 mt-2">
                    Upload a prescription and click "Analyze Prescription" to view results
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
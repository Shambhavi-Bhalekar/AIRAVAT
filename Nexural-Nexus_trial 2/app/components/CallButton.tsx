// app/components/CallButton.tsx
'use client';

import { useState } from 'react';
import { PhoneCall } from 'lucide-react';

export default function CallButton() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(false);

  const handleInitialClick = () => {
    setShowPhoneInput(true);
  };

  const handleCallClick = async () => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      setCallStatus('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setCallStatus('Initiating call...');

    try {
      const response = await fetch('/api/calls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setCallStatus(`Call initiated successfully! Call ID: ${data.call_id}`);
      } else {
        setCallStatus(`Error: ${data.message || 'Failed to initiate call'}`);
      }
    } catch (error) {
      setCallStatus('An error occurred while making the call');
      console.error('Call error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 space-y-4">
      {!showPhoneInput ? (
        <button
          onClick={handleInitialClick}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <PhoneCall size={24} />
          <span>Make a Call</span>
        </button>
      ) : (
        <>
          <div className="flex items-center space-x-2 border rounded-lg overflow-hidden">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number (+1XXXXXXXXXX)"
              className="flex-1 p-3 outline-none text-gray-700"
              disabled={isLoading}
              autoFocus
             
            />
            <button
              onClick={handleCallClick}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white p-3 transition-colors"
            >
              <PhoneCall size={24} />
            </button>
          </div>
          
          {callStatus && (
            <div className={`text-sm p-2 rounded ${
              callStatus.includes('Error') 
                ? 'bg-red-100 text-red-700' 
                : callStatus.includes('successfully') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
            }`}>
              {callStatus}
            </div>
          )}
        </>
      )}
    </div>
  );
}
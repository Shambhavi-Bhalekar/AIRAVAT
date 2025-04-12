"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Activity, ArrowRight, Calendar, Pill, ChartBar, Stethoscope, User } from 'lucide-react';

export default function login() {
  const [userType, setUserType] = useState('patient');
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Add animation effect on mount
  useEffect(() => {
    document.querySelector('.login-container').classList.add('fade-in');
  }, []);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      if (formType === 'login') {
        // For demo purposes, just move to next step
        setStep(2);
      }
    }, 1500);
  };
  
  const handleContinue = () => {
    setStep(3);
    setTimeout(() => {
      // Redirect would happen here in a real app
    }, 1000);
  };
  
  // Features based on user type
  const features = {
    patient: [
      {
        icon: <Pill className="h-6 w-6" />,
        title: "Track Medications",
        description: "Never miss a dose with smart reminders and alerts"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Appointment Management",
        description: "Schedule and track all your healthcare appointments"
      },
      {
        icon: <ChartBar className="h-6 w-6" />,
        title: "Health Analytics",
        description: "Visualize your health progress with intuitive charts"
      }
    ],
    doctor: [
      {
        icon: <User className="h-6 w-6" />,
        title: "Patient Management",
        description: "Efficiently manage your patient roster and records"
      },
      {
        icon: <Calendar className="h-6 w-6" />,
        title: "Schedule Control",
        description: "Optimize your daily calendar and appointments"
      },
      {
        icon: <ChartBar className="h-6 w-6" />,
        title: "Clinical Analytics",
        description: "Track treatment outcomes and patient progress"
      }
    ]
  };
  
  // Testimonials based on user type
  const testimonials = {
    patient: {
      quote: "Medimitra has completely transformed how I manage my health. The reminders and analytics have helped me stay on track with my medications and appointments.",
      name: "Sarah Johnson",
      title: "Patient • 2 years"
    },
    doctor: {
      quote: "This platform streamlines my practice workflow and improves patient communication. I can monitor patient adherence and provide timely interventions when needed.",
      name: "Dr. James Wilson",
      title: "Cardiologist • 3 years"
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-700 flex items-center justify-center p-4 md:p-0 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>
      
      <div className="login-container w-full max-w-6xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-8 py-4 md:py-0 transition-all duration-700 opacity-0">
        {/* Left side - Information content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-700/20 to-transparent pointer-events-none z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8 transform hover:scale-105 transition-transform">
              <div className="bg-white/90 p-2 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-white ml-3">Medimitra</h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {userType === 'patient' ? (
                <>Your health journey <span className="text-yellow-200">starts here</span></>
              ) : (
                <>Elevate your <span className="text-yellow-200">practice</span></>
              )}
            </h2>
            <p className="text-lg text-blue-50 mb-8 font-light">
              {userType === 'patient' 
                ? "Personalized healthcare management that puts you in control of your wellbeing." 
                : "Streamlined clinical workflow designed to enhance patient care and practice efficiency."}
            </p>
            
            <div className="space-y-6">
              {features[userType].map((feature, index) => (
                <div key={index} className="flex items-start feature-card p-4 rounded-xl transition-all duration-300 hover:bg-white/10">
                  <div className="bg-blue-600 p-3 rounded-lg shadow-lg mr-4 text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                    <p className="text-blue-100 font-light">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="hidden md:block mt-12 bg-blue-800/30 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-white font-medium">5.0</span>
              </div>
              
              <p className="text-blue-50 italic font-light">
                "{testimonials[userType].quote}"
              </p>
              <div className="flex items-center mt-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mr-3 flex items-center justify-center text-white font-bold">
                  {userType === 'patient' ? 'SJ' : 'JW'}
                </div>
                <div>
                  <p className="font-medium text-white">{testimonials[userType].name}</p>
                  <p className="text-sm text-blue-200">{testimonials[userType].title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login/Signup form */}
        <div className="md:w-1/2 bg-white/10 backdrop-blur-md p-8 md:p-12 flex items-center justify-center relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-purple-700/20 to-transparent pointer-events-none z-0"></div>
          
          <div className="w-full max-w-md relative z-10">
            {step === 1 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome</h2>
                  <p className="text-blue-100 mb-6">Sign in to access your dashboard</p>
                  
                  {/* User type selector */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 inline-flex shadow-lg mb-4">
                    <button 
                      onClick={() => setUserType('patient')}
                      className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${
                        userType === 'patient' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Patient
                    </button>
                    <button 
                      onClick={() => setUserType('doctor')}
                      className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${
                        userType === 'doctor' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Doctor
                    </button>
                  </div>
                </div>
                
                <div className="glass-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all shadow-xl border border-white/20">
                  <div className="flex space-x-4 mb-6">
                    <button 
                      onClick={() => setFormType('login')}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        formType === 'login' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => setFormType('register')}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        formType === 'register' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                      <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2 ">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-white/70 shadow-inner"
                            placeholder={userType === 'patient' ? "you@example.com" : "doctor@hospital.com"}
                          />
                          <div className="input-focus-effect"></div>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors text-white placeholder-white/70 shadow-inner"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-white/70 hover:text-white transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                          <div className="input-focus-effect"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 border-white rounded focus:ring-blue-500 bg-white/20 cursor-pointer"
                            />
                            <span className="check-animation"></span>
                          </div>
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-white cursor-pointer">
                            Remember me
                          </label>
                        </div>
                        
                        <div className="text-sm">
                          <a href="#" className="font-medium text-yellow-300 hover:text-white transition-colors">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className={`w-full py-3 px-4 flex items-center justify-center rounded-lg font-medium shadow-lg ${
                          isLoading 
                            ? 'bg-gradient-to-r from-blue-600/70 to-purple-600/70' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                        } text-white transition-all duration-300 transform hover:translate-y-[-2px]`}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <span>{formType === 'login' ? 'Sign In' : 'Create Account'}</span>
                        )}
                      </button>
                      
                      {userType === 'doctor' && formType === 'register' && (
                        <p className="text-xs text-blue-100 mt-2 text-center">
                          Doctor registration requires verification. You'll be contacted for credential validation.
                        </p>
                      )}
                    </div>
                  </form>
                  
                  {formType === 'login' && (
                    <div className="mt-6 text-center">
                      <p className="text-blue-100">
                        Don't have an account?{' '}
                        <button 
                          onClick={() => setFormType('register')} 
                          className="font-medium text-yellow-300 hover:text-white transition-colors"
                        >
                          Sign up here
                        </button>
                      </p>
                    </div>
                  )}
                  
                  {formType === 'register' && (
                    <div className="mt-6 text-center">
                      <p className="text-blue-100">
                        Already have an account?{' '}
                        <button 
                          onClick={() => setFormType('login')} 
                          className="font-medium text-yellow-300 hover:text-white transition-colors"
                        >
                          Sign in here
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {step === 2 && (
              <div className="glass-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all shadow-xl border border-white/20 animate-fade-in flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-success-pulse">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Login Successful!</h2>
                <p className="text-blue-100 text-center mb-6">
                  {userType === 'patient' 
                    ? "Welcome back to your health journey"
                    : "Welcome back to your practice portal"
                  }
                </p>
                
                <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-progress"></div>
                </div>
                
                <p className="text-blue-100 text-center mb-6">
                  {userType === 'patient' 
                    ? "Accessing your personal health dashboard..."
                    : "Accessing your clinical management console..."
                  }
                </p>
                
                <button 
                  onClick={handleContinue}
                  className="flex items-center justify-center py-3 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg font-medium"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse-right" />
                </button>
              </div>
            )}
            
            {step === 3 && (
              <div className="glass-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all shadow-xl border border-white/20 text-center animate-fade-in">
                <div className="flex justify-center">
                  <div className="loader">
                    <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mt-6 animate-pulse">
                  {userType === 'patient' 
                    ? "Redirecting to your dashboard..."
                    : "Redirecting to your clinical console..."
                  }
                </h2>
              </div>
            )}
            
            <p className="text-center text-sm text-blue-100 mt-6">
              By continuing, you agree to Medimitra's <a href="#" className="text-yellow-300 hover:text-white transition-colors">Terms of Service</a> and <a href="#" className="text-yellow-300 hover:text-white transition-colors">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
      
      {/* CSS for animations and effects */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .bubble-1 {
          width: 300px;
          height: 300px;
          top: -150px;
          left: 10%;
          animation: float 18s ease-in-out infinite;
        }
        
        .bubble-2 {
          width: 200px;
          height: 200px;
          bottom: -100px;
          right: 20%;
          animation: float 15s ease-in-out infinite 2s;
        }
        
        .bubble-3 {
          width: 150px;
          height: 150px;
          top: 40%;
          left: -75px;
          animation: float 12s ease-in-out infinite 1s;
        }
        
        .bubble-4 {
          width: 180px;
          height: 180px;
          bottom: 30%;
          right: -90px;
          animation: float 20s ease-in-out infinite 3s;
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .glass-card {
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.3);
          transform: translateY(-5px);
        }
        
        .feature-card {
          position: relative;
          z-index: 1;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .feature-card:hover::before {
          opacity: 1;
        }
        
        .input-focus-effect {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(to right, #6366f1, #8b5cf6);
          transition: width 0.3s ease;
        }
        
        input:focus + .input-focus-effect {
          width: 100%;
        }
        
        .check-animation {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 1;
          opacity: 0;
        }
        
        input[type="checkbox"]:checked + .check-animation {
          animation: checkmark 0.3s ease-in-out forwards;
        }
        
        @keyframes checkmark {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1); }
        }
        
        .animate-success-pulse {
          animation: successPulse 2s infinite;
        }
        
        @keyframes successPulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6); }
          70% { box-shadow: 0 0 0 15px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        .animate-pulse-right {
          animation: pulseRight 1.5s infinite;
        }
        
        @keyframes pulseRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        
        .loader {
          position: relative;
        }
        
        .loader::before, .loader::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .loader::before {
          width: 48px;
          height: 48px;
          animation: pulse 2s infinite;
        }
        
        .loader::after {
          width: 64px;
          height: 64px;
          animation: pulse 2s infinite 0.3s;
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
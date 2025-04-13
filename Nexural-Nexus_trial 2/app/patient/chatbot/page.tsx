"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sun, Moon, Smile, Heart, ThumbsUp, Star, Zap, Activity, Coffee, Music, Book, MessageCircle } from 'lucide-react';
import CallButton from '../../components/CallButton';
import PatientSidebar from '../../components/sidebar_patient';

export default function AnxietySupportChat() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi there! I'm so glad you're here. How are you feeling today? Remember, sharing your thoughts is a positive step forward.", 
      sender: 'ai' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [theme, setTheme] = useState('light');
  const messagesEndRef = useRef(null);
  const [mood, setMood] = useState('neutral');
  const [showActivities, setShowActivities] = useState(false);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sample responses with positive, encouraging messages
  const sampleResponses = [
    "I understand anxiety can feel overwhelming, but you're taking such positive steps by reaching out. What specific thoughts are on your mind right now?",
    "You're doing great by expressing your feelings! Let's try a quick grounding exercise together: name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    "Remember that even on difficult days, you have incredible strength within you. What's one small positive thing you noticed today?",
    "Your feelings are completely valid. Many people experience similar challenges, and there are so many effective strategies we can explore together. Would you like to try a 30-second breathing exercise?",
    "I'm really proud of you for taking care of your mental wellbeing today. Every conversation is a step toward feeling better. What would help you feel more at ease right now?"
  ];

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Simulate response after a delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      const newAiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const setUserMood = (newMood) => {
    setMood(newMood);
    // Show activity suggestions when mood is set
    setShowActivities(true);
    // Hide activity suggestions after 10 seconds
    setTimeout(() => {
      setShowActivities(false);
    }, 10000);
  };

  const toggleMessageExpand = (id) => {
    if (expandedMessageId === id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(id);
    }
  };

  // Generate random encouraging quotes
  const encouragingQuotes = [
    "Every moment is a fresh beginning.",
    "You are stronger than you think.",
    "Your potential is endless.",
    "Small steps lead to big changes.",
    "Today is full of possibilities.",
    "You've got this!",
    "Breathe and believe.",
    "Joy is found in the journey.",
    "You are enough, just as you are."
  ];
  
  const randomQuote = encouragingQuotes[Math.floor(Math.random() * encouragingQuotes.length)];

  // Activity suggestions based on mood
  const activitySuggestions = {
    happy: [
      { icon: <Zap size={16} />, text: "Channel your energy into a creative project" },
      { icon: <Music size={16} />, text: "Create a playlist that amplifies your good mood" },
      { icon: <Heart size={16} />, text: "Reach out to someone who might need encouragement" }
    ],
    neutral: [
      { icon: <Book size={16} />, text: "Try a mindfulness reading session" },
      { icon: <Coffee size={16} />, text: "Take a moment to enjoy a calming beverage" },
      { icon: <Activity size={16} />, text: "A short walk might boost your energy" }
    ]
  };

  // Animation for background gradient
  useEffect(() => {
    if (theme === 'light') {
      const interval = setInterval(() => {
        const gradient = document.getElementById('animated-gradient');
        if (gradient) {
          const currentPosition = parseInt(gradient.style.backgroundPosition || '0');
          gradient.style.backgroundPosition = `${currentPosition + 1}px ${currentPosition + 1}px`;
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [theme]);

  return (
    <div 
      id="animated-gradient"
      className={`flex h-screen ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50'
      }`}
      style={{ backgroundSize: '400% 400%', transition: 'all 0.5s ease' }}
    >
      {/* Sidebar */}
      <div className={`w-64 flex-shrink-0 transition-all duration-500 ${
        theme === 'dark' ? 'bg-gray-900 border-r border-gray-800 shadow-lg shadow-purple-900/30' : 'bg-white border-r border-gray-100 shadow-lg shadow-purple-200/50'
      }`}>
        <PatientSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-b shadow-md'
        } py-5 px-6 flex items-center justify-between transition-all duration-300`}>
          <div className="flex items-center">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 transition-transform duration-500 transform hover:rotate-12 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-700 to-indigo-900' 
                : 'bg-gradient-to-br from-blue-400 to-purple-500'
            }`}>
              <Heart size={28} className="text-white" />
            </div>
            <div>
              <h1 className={`text-2xl font-semibold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Anxiety Support Chat
              </h1>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Mentor is online
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`mr-6 text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Feeling anxious? Talk with our mentor
            </span>
            <button 
              onClick={toggleTheme} 
              className={`mr-4 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="transition-transform duration-300 hover:scale-105">
              <CallButton />
            </div>
          </div>
        </div>

        {/* Mood Selector */}
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border-b border-gray-700' 
            : 'bg-white border-b'
        } py-2 flex flex-col items-center justify-center transition-all duration-300`}>
          <p className={`text-sm mb-4 font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>How are you feeling today?</p>
          
          <div className="flex space-x-8">
            <button 
              onClick={() => setUserMood('happy')} 
              className={`p-3 rounded-xl flex flex-col items-center space-y-2 transition-all duration-300 transform hover:scale-110 ${
                mood === 'happy' 
                  ? (theme === 'dark' 
                    ? 'bg-yellow-600 shadow-lg shadow-yellow-600/30' 
                    : 'bg-yellow-100 shadow-md shadow-yellow-200/50') 
                  : (theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200')
              }`}
            >
              <Smile size={28} className={`transition-colors duration-300 ${
                mood === 'happy' 
                  ? 'text-yellow-500' 
                  : (theme === 'dark' ? 'text-gray-300' : 'text-gray-500')
              }`} />
              <span className={`text-sm font-medium transition-colors duration-300 ${
                mood === 'happy'
                  ? (theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700')
                  : (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')
              }`}>Happy</span>
            </button>
            
            <button 
              onClick={() => setUserMood('neutral')} 
              className={`p-4 rounded-xl flex flex-col items-center space-y-2 transition-all duration-300 transform hover:scale-110 ${
                mood === 'neutral' 
                  ? (theme === 'dark' 
                    ? 'bg-blue-600 shadow-lg shadow-blue-600/30' 
                    : 'bg-blue-100 shadow-md shadow-blue-200/50') 
                  : (theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200')
              }`}
            >
              <ThumbsUp size={28} className={`transition-colors duration-300 ${
                mood === 'neutral' 
                  ? 'text-blue-500' 
                  : (theme === 'dark' ? 'text-gray-300' : 'text-gray-500')
              }`} />
              <span className={`text-sm font-medium transition-colors duration-300 ${
                mood === 'neutral'
                  ? (theme === 'dark' ? 'text-blue-300' : 'text-blue-700')
                  : (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')
              }`}>Calm</span>
            </button>
          </div>
          
          {/* Activity suggestions based on mood */}
          {showActivities && (
            <div className={`mt-6 p-4 rounded-lg max-w-md transition-all duration-500 transform animate-fade-in-up ${
              theme === 'dark' 
                ? 'bg-gray-700 text-gray-200 border border-gray-600' 
                : 'bg-white shadow-lg border border-gray-100 text-gray-700'
            }`} style={{ animation: 'fadeInUp 0.5s ease-out' }}>
              <div className="flex items-center mb-3">
                <Star size={16} className={theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'} />
                <span className="text-sm ml-2 font-medium">Suggested activities for your mood:</span>
              </div>
              <div className="space-y-3">
                {activitySuggestions[mood].map((activity, index) => (
                  <div key={index} className="flex items-center p-2 rounded-lg hover:bg-opacity-10 hover:bg-purple-500 transition-colors duration-300">
                    <div className={`mr-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`}>
                      {activity.icon}
                    </div>
                    <span className="text-sm">{activity.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Inspirational Quote */}
        <div className={`relative overflow-hidden transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white' 
            : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800'
        } py-4 text-center text-sm italic`}>
          <div className="relative z-10 font-medium max-w-xl mx-auto">"{randomQuote}"</div>
          <div className="absolute inset-0 bg-black opacity-0 z-0"></div>
          {theme === 'light' && (
            <>
              <div className="absolute top-0 left-1/4 w-12 h-12 rounded-full bg-white opacity-10 blur-xl animate-float"></div>
              <div className="absolute bottom-0 right-1/3 w-8 h-8 rounded-full bg-purple-200 opacity-30 blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
            </>
          )}
        </div>

        {/* Chat area */}
        <div className={`flex-1 overflow-y-auto p-6 transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-gray-900' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50'
        }`}>
          <div className="max-w-3xl mx-auto">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex mb-8 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${
                    theme === 'dark' 
                      ? 'bg-purple-700' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-500'
                  }`}>
                    <Heart size={20} className="text-white" />
                  </div>
                )}
                
                <div 
                  className={`p-5 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg transition-all duration-300 group hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${
                    message.sender === 'user' 
                      ? theme === 'dark' 
                        ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-br-none' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none' 
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-100 rounded-bl-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-md'
                  }`}
                  onClick={() => toggleMessageExpand(message.id)}
                >
                  {message.sender === 'user' ? (
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-sm text-blue-100 font-medium">You</span>
                    </div>
                  ) : (
                    <div className="flex items-center mb-2">
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`}>
                        Support Mentor
                      </span>
                      <div className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        theme === 'dark' ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-700'
                      }`}>
                        Verified
                      </div>
                    </div>
                  )}
                  <p className={`text-sm leading-relaxed ${expandedMessageId === message.id ? '' : 'line-clamp-6'}`}>{message.text}</p>
                  
                  {/* Message timestamp and interaction */}
                  <div className="flex items-center justify-between mt-3">
                    <div className={`text-xs opacity-70 ${
                      message.sender === 'user' 
                        ? 'text-blue-100' 
                        : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    <div className={`flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      message.sender === 'user' ? 'text-blue-100' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <button className="hover:text-purple-400 transition-colors duration-300">
                        <MessageCircle size={16} />
                      </button>
                      <button className="hover:text-purple-400 transition-colors duration-300">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 ml-3 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden`}>
                    <span className="text-sm font-semibold text-white">You</span>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator with enhanced animation */}
            {isTyping && (
              <div className="flex mb-8 justify-start">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-purple-700' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                }`}>
                  <Heart size={20} className="text-white" />
                </div>
                <div className={`${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-gray-100' 
                    : 'bg-white text-gray-800 shadow-md'
                } p-5 rounded-2xl rounded-bl-none`}>
                  <div className="flex space-x-3 items-end h-6">
                    <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}></div>
                    <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className={`${
          theme === 'dark' 
            ? 'bg-gray-800 border-t border-gray-700' 
            : 'bg-white border-t border-gray-100'
        } p-6 transition-all duration-300`}>
          <div className="max-w-3xl mx-auto">
            {/* Suggested quick responses */}
            <div className="mb-4 flex flex-wrap gap-2">
              <button 
                onClick={() => setInput("I'm feeling anxious right now")}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                I'm feeling anxious right now
              </button>
              <button 
                onClick={() => setInput("Can you suggest a breathing exercise?")}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                Can you suggest a breathing exercise?
              </button>
              <button 
                onClick={() => setInput("I need help with sleep anxiety")}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                I need help with sleep anxiety
              </button>
            </div>
            
            <div className="flex">
              <div className="relative flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here... We're here to help ❤️"
                  className={`w-full transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                      : 'bg-white border border-gray-200 text-gray-800 focus:border-purple-400'
                  } rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm`}
                  rows="2"
                />
                <div className={`absolute right-4 bottom-4 text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {input.length > 0 ? `${input.length} characters` : ''}
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={input.trim() === '' || isTyping}
                className={`ml-3 p-5 rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 ${
                  input.trim() === '' || isTyping 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:-translate-y-1'
                } ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg shadow-purple-900/30' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-md shadow-purple-500/20'
                }`}
              >
                <Send size={22} />
              </button>
            </div>
            
            {/* Add 'Enter to send' helper text */}
            <div className={`mt-2 text-xs text-center ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Press Enter to send, Shift+Enter for a new line
            </div>
          </div>
        </div>
      </div>
      
      {/* Add global CSS animation for fade-in effect */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
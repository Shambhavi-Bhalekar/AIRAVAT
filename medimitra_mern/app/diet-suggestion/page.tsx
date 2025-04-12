"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { PlusCircle, X, Calendar, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function LifestylePlanner() {
  // Sample user allergies (in a real app, this would come from user's profile/database)
  const [allergies, setAllergies] = useState(['Peanuts', 'Shellfish', 'Lactose']);
  
  // User inputs for lifestyle
  const [lifestyleGoals, setLifestyleGoals] = useState({
    primaryGoal: '',
    weight: '',
    targetWeight: '',
    weeklyExercise: '',
    dietaryPreference: '',
    sleepHours: '',
    waterIntake: '',
    specificRequirements: ''
  });
  
  // Generated plan
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLifestyleGoals(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit data to get AI recommendations
  const generatePlan = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would be an actual API call to Gemini
      // For demo purposes, we'll simulate a response
      
      // Constructing the prompt that would be sent to Gemini
      const prompt = `
        Generate a personalized health and lifestyle plan for a person with the following information:
        
        Primary Goal: ${lifestyleGoals.primaryGoal}
        Current Weight: ${lifestyleGoals.weight}
        Target Weight: ${lifestyleGoals.targetWeight}
        Weekly Exercise: ${lifestyleGoals.weeklyExercise}
        Dietary Preference: ${lifestyleGoals.dietaryPreference}
        Sleep Hours: ${lifestyleGoals.sleepHours}
        Water Intake: ${lifestyleGoals.waterIntake}
        Special Requirements: ${lifestyleGoals.specificRequirements}
        
        Allergies: ${allergies.join(', ')}
        
        Please provide:
        1. A brief health assessment and recommendations
        2. A weekly meal plan (breakfast, lunch, dinner, snacks)
        3. Exercise recommendations
        4. Lifestyle adjustment suggestions
      `;
      
      console.log("Would send to Gemini API:", prompt);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a response from Gemini
      // In a real application, this would be the response from the API
      const simulatedResponse = {
        healthAssessment: {
          summary: "Based on your information, you're working toward " + lifestyleGoals.primaryGoal + ". Your current metrics and goals are reasonable and achievable with consistent effort.",
          keyPoints: [
            "The difference between your current and target weight suggests a realistic goal that can be achieved safely.",
            "Your dietary preferences align well with your health goals.",
            "Consider your allergies to " + allergies.join(", ") + " when following this plan."
          ]
        },
        mealPlan: {
          breakfast: [
            "Overnight oats with chia seeds and berries",
            "Vegetable omelet with whole grain toast",
            "Smoothie bowl with fruits and granola (nut-free)"
          ],
          lunch: [
            allergies.includes("Shellfish") ? "Grilled chicken salad with mixed greens and olive oil dressing" : "Seafood salad with mixed greens",
            "Quinoa bowl with roasted vegetables and avocado",
            allergies.includes("Lactose") ? "Dairy-free vegetable soup with a side of whole grain bread" : "Vegetable soup with yogurt"
          ],
          dinner: [
            "Baked fish with roasted vegetables and brown rice",
            allergies.includes("Peanuts") ? "Stir-fry vegetables with tofu and seed-based sauce" : "Stir-fry vegetables with peanut sauce",
            "Lean protein with sweet potato and steamed greens"
          ],
          snacks: [
            allergies.includes("Lactose") ? "Apple slices with almond butter" : "Greek yogurt with honey",
            "Carrot sticks with hummus",
            "Mixed berry bowl"
          ]
        },
        exercisePlan: {
          recommendations: [
            "Start with 3-4 days of " + lifestyleGoals.weeklyExercise + " per week",
            "Incorporate strength training 2 days per week",
            "Add flexibility exercises like yoga or stretching",
            "Aim for 8,000-10,000 steps daily"
          ],
          schedule: [
            { day: "Monday", activity: "Cardio (30 minutes)" },
            { day: "Tuesday", activity: "Strength training (upper body)" },
            { day: "Wednesday", activity: "Rest or light walking" },
            { day: "Thursday", activity: "Cardio (30 minutes)" },
            { day: "Friday", activity: "Strength training (lower body)" },
            { day: "Saturday", activity: "Longer activity (hike, swim, or bike)" },
            { day: "Sunday", activity: "Rest or yoga" }
          ]
        },
        lifestyleAdjustments: [
          "Aim for " + lifestyleGoals.sleepHours + " hours of quality sleep each night",
          "Drink " + lifestyleGoals.waterIntake + " of water daily",
          "Practice stress management techniques like meditation",
          "Consider a food journal to track your progress and identify patterns",
          "Schedule regular check-ins with healthcare providers"
        ]
      };
      
      setAiGeneratedPlan(simulatedResponse);
    } catch (err) {
      setError("Failed to generate plan. Please try again.");
      console.error("Error generating plan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Personal Health & Lifestyle Planner</h1>
          <p className="text-blue-600 mt-2">Create a personalized health plan based on your goals and dietary restrictions</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-blue-800 mb-4">Your Health Goals</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">Primary Goal</label>
                  <select
                    name="primaryGoal"
                    value={lifestyleGoals.primaryGoal}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your primary goal</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Improved Energy">Improved Energy</option>
                    <option value="Better Sleep">Better Sleep</option>
                    <option value="Stress Reduction">Stress Reduction</option>
                    <option value="Overall Health">Overall Health</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-600 mb-1">Current Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={lifestyleGoals.weight}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-600 mb-1">Target Weight (kg)</label>
                    <input
                      type="number"
                      name="targetWeight"
                      value={lifestyleGoals.targetWeight}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">Weekly Exercise</label>
                  <select
                    name="weeklyExercise"
                    value={lifestyleGoals.weeklyExercise}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select activity level</option>
                    <option value="Light walking">Light walking</option>
                    <option value="Moderate cardio">Moderate cardio</option>
                    <option value="Intense cardio">Intense cardio</option>
                    <option value="Weight training">Weight training</option>
                    <option value="Mixed activities">Mixed activities</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">Dietary Preference</label>
                  <select
                    name="dietaryPreference"
                    value={lifestyleGoals.dietaryPreference}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your diet</option>
                    <option value="No restrictions">No restrictions</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Pescatarian">Pescatarian</option>
                    <option value="Keto">Keto</option>
                    <option value="Paleo">Paleo</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Low-carb">Low-carb</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">Sleep Hours (daily)</label>
                  <select
                    name="sleepHours"
                    value={lifestyleGoals.sleepHours}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select sleep hours</option>
                    <option value="Less than 6 hours">Less than 6 hours</option>
                    <option value="6-7 hours">6-7 hours</option>
                    <option value="7-8 hours">7-8 hours</option>
                    <option value="8-9 hours">8-9 hours</option>
                    <option value="More than 9 hours">More than 9 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">Water Intake (daily)</label>
                  <select
                    name="waterIntake"
                    value={lifestyleGoals.waterIntake}
                    onChange={handleChange}
                    className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select water intake</option>
                    <option value="Less than 1 liter">Less than 1 liter</option>
                    <option value="1-2 liters">1-2 liters</option>
                    <option value="2-3 liters">2-3 liters</option>
                    <option value="More than 3 liters">More than 3 liters</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-1">Additional Requirements</label>
                  <textarea
                    name="specificRequirements"
                    value={lifestyleGoals.specificRequirements}
                    onChange={handleChange}
                    placeholder="Any specific conditions, preferences, or goals..."
                    rows="3"
                    className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-800">Your Allergies</h2>
              </div>
              
              <div className="mb-4">
                {allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy, index) => (
                      <div key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {allergy}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No allergies recorded</p>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Your allergies are automatically included in your plan recommendations.
              </p>
            </div>
            
            <button
              onClick={generatePlan}
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Generating Plan...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Generate Health Plan
                </>
              )}
            </button>
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-2">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{error}</p>
              </div>
            )}
            
            {!aiGeneratedPlan && !isLoading && (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Send size={48} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-blue-800 mb-2">Ready to Create Your Plan</h2>
                <p className="text-gray-600 mb-6">Fill in your health goals and click "Generate Health Plan" to receive AI-powered recommendations tailored to your needs.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-medium text-blue-700 mb-2">Personalized Meal Plans</h3>
                    <p className="text-sm text-gray-600">Get meal suggestions that account for your allergies and preferences</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-medium text-blue-700 mb-2">Exercise Recommendations</h3>
                    <p className="text-sm text-gray-600">Activity plans based on your current fitness level</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded">
                    <h3 className="font-medium text-blue-700 mb-2">Lifestyle Adjustments</h3>
                    <p className="text-sm text-gray-600">Practical tips to help you reach your health goals</p>
                  </div>
                </div>
              </div>
            )}
            
            {aiGeneratedPlan && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Personalized Health Plan</h2>
                  <div className="bg-blue-50 p-4 rounded mb-4">
                    <h3 className="font-medium text-blue-700 mb-2">Health Assessment</h3>
                    <p className="mb-3">{aiGeneratedPlan.healthAssessment.summary}</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {aiGeneratedPlan.healthAssessment.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-gray-700">{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Weekly Meal Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-medium text-blue-700 mb-2">Breakfast Options</h4>
                      <ul className="space-y-2">
                        {aiGeneratedPlan.mealPlan.breakfast.map((meal, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-medium text-blue-700 mb-2">Lunch Options</h4>
                      <ul className="space-y-2">
                        {aiGeneratedPlan.mealPlan.lunch.map((meal, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-medium text-blue-700 mb-2">Dinner Options</h4>
                      <ul className="space-y-2">
                        {aiGeneratedPlan.mealPlan.dinner.map((meal, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-medium text-blue-700 mb-2">Healthy Snacks</h4>
                      <ul className="space-y-2">
                        {aiGeneratedPlan.mealPlan.snacks.map((snack, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{snack}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Exercise Plan</h3>
                  <div className="mb-4">
                    <h4 className="font-medium text-blue-700 mb-2">Recommendations</h4>
                    <ul className="space-y-2">
                      {aiGeneratedPlan.exercisePlan.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Weekly Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                      {aiGeneratedPlan.exercisePlan.schedule.map((item, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded text-center">
                          <p className="font-medium text-blue-800">{item.day}</p>
                          <p className="text-sm">{item.activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Lifestyle Adjustments</h3>
                  <ul className="space-y-3">
                    {aiGeneratedPlan.lifestyleAdjustments.map((adjustment, index) => (
                      <li key={index} className="flex items-start bg-blue-50 p-3 rounded">
                        <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{adjustment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <p className="text-blue-800">
                    This plan is generated based on your inputs and should be reviewed with a healthcare professional before making significant changes to your diet or exercise routine.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
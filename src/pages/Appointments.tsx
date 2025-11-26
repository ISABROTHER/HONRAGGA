// src/pages/Appointments.tsx
import React, { useState } from 'react';
import { Calendar, Clock, User, Briefcase, FileText, Send, CheckCircle, ArrowRight } from 'lucide-react';

export function Appointments() {
  const [activeTab, setActiveTab] = useState<'appointment' | 'application'>('appointment');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Reset after 5s
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Appointments & Applications
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">
              Schedule a meeting with the MP's office or submit applications for grants, jobs, and support programs.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm inline-flex">
              <button
                onClick={() => setActiveTab('appointment')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'appointment' ? 'bg-blue-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Book Appointment
              </button>
              <button
                onClick={() => setActiveTab('application')}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'application' ? 'bg-blue-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Applications
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Submission Received</h3>
                <p className="text-slate-500">We have received your request and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* DYNAMIC FORM CONTENT */}
                {activeTab === 'appointment' ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="text" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Contact Number</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 text-xs font-bold">GH</div>
                          <input type="tel" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="024 XXX XXXX" />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="date" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white">
                            <option>Morning (9am - 12pm)</option>
                            <option>Afternoon (1pm - 4pm)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Purpose of Visit</label>
                      <textarea required rows={4} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Please briefly explain the reason for the appointment..." />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Application Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Job Opportunity', 'Educational Grant', 'Business Support', 'Health Support', 'Other'].map((type) => (
                          <label key={type} className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200">
                            <input type="radio" name="appType" className="text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm font-medium text-slate-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="text" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Applicant name" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input type="email" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@example.com" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Cover Letter / Details</label>
                      <textarea required rows={5} className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell us about your application..." />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Upload Documents (CV/Proposal)</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                        <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <span className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <button type="submit" className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    {activeTab === 'appointment' ? 'Schedule Appointment' : 'Submit Application'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
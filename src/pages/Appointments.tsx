// src/pages/Appointments.tsx
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Briefcase,
  FileText,
  CheckCircle,
  ArrowRight,
  Info,
  AlertTriangle,
} from 'lucide-react';

// --- TYPES ---
type Tab = 'appointment' | 'application';
type TimeSlot = 'morning' | 'afternoon';

// --- HON. AVAILABILITY SETUP ---
// You can later move this to Supabase or an admin dashboard.
const HON_AVAILABILITY: Record<string, TimeSlot[]> = {
  // Weekday names must match Date.toLocaleDateString('en-US', { weekday: 'long' })
  Monday: ['morning', 'afternoon'],
  Wednesday: ['morning'],
  Friday: ['afternoon'],
};

const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  morning: 'Morning (9am - 12pm)',
  afternoon: 'Afternoon (1pm - 4pm)',
};

function getWeekdayName(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

function isHonAvailable(dateStr: string, slot: TimeSlot): boolean {
  const weekday = getWeekdayName(dateStr);
  if (!weekday) return false;
  const daySlots = HON_AVAILABILITY[weekday];
  if (!daySlots) return false;
  return daySlots.includes(slot);
}

function findNextAvailableSlot(
  fromDateStr: string,
  preferredSlot: TimeSlot
): { dateStr: string; weekday: string; slot: TimeSlot } | null {
  if (!fromDateStr) return null;
  const start = new Date(fromDateStr + 'T00:00:00');
  const maxDaysAhead = 30;

  for (let i = 0; i <= maxDaysAhead; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    const daySlots = HON_AVAILABILITY[weekday];

    if (daySlots && daySlots.length > 0) {
      // If preferred slot is available, use it, else fall back to first slot for that day
      const slot = daySlots.includes(preferredSlot)
        ? preferredSlot
        : (daySlots[0] as TimeSlot);

      const dateStr = d.toISOString().slice(0, 10);
      return { dateStr, weekday, slot };
    }
  }
  return null;
}

export function Appointments() {
  const [activeTab, setActiveTab] = useState<Tab>('appointment');
  const [submitted, setSubmitted] = useState(false);

  // NEW: controlled fields for availability logic
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTimeSlot, setAppointmentTimeSlot] = useState<TimeSlot>('morning');

  // NEW: availability feedback
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(null);
  const [availabilityStatus, setAvailabilityStatus] = useState<
    'idle' | 'available' | 'unavailable'
  >('idle');

  const todayISO = new Date().toISOString().slice(0, 10);

  const updateAvailability = (dateStr: string, slot: TimeSlot) => {
    if (!dateStr) {
      setAvailabilityStatus('idle');
      setAvailabilityMessage(null);
      return;
    }

    if (isHonAvailable(dateStr, slot)) {
      const weekday = getWeekdayName(dateStr);
      setAvailabilityStatus('available');
      setAvailabilityMessage(
        `Hon. is available on ${weekday}, ${dateStr} during ${TIME_SLOT_LABELS[slot]}.`
      );
    } else {
      const weekday = getWeekdayName(dateStr);
      const next = findNextAvailableSlot(dateStr, slot);
      setAvailabilityStatus('unavailable');

      if (next) {
        setAvailabilityMessage(
          `Hon. is not available on ${weekday || 'this day'}. Next available slot is ` +
            `${next.weekday}, ${next.dateStr} – ${TIME_SLOT_LABELS[next.slot]}.`
        );
      } else {
        setAvailabilityMessage(
          `Hon. is not available on this day. No available slots found in the next 30 days.`
        );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only enforce availability on appointment tab
    if (activeTab === 'appointment') {
      if (!appointmentDate) {
        setAvailabilityStatus('unavailable');
        setAvailabilityMessage('Please select a date for your appointment.');
        return;
      }

      if (!isHonAvailable(appointmentDate, appointmentTimeSlot)) {
        const weekday = getWeekdayName(appointmentDate);
        const next = findNextAvailableSlot(appointmentDate, appointmentTimeSlot);
        setAvailabilityStatus('unavailable');

        if (next) {
          setAvailabilityMessage(
            `Hon. is not available on ${weekday || 'this day'} for the selected period. ` +
              `Next available slot is ${next.weekday}, ${next.dateStr} – ${TIME_SLOT_LABELS[next.slot]}. ` +
              `Please adjust your date and time.`
          );
        } else {
          setAvailabilityMessage(
            `Hon. is not available on this day. No available slots found in the next 30 days. ` +
              `Please pick another date.`
          );
        }
        return; // Do NOT mark as submitted if unavailable
      }
    }

    // If we reach here, either:
    // - activeTab is "application" OR
    // - appointment is within availability window
    setSubmitted(true);
    setAvailabilityStatus('idle');
    setAvailabilityMessage(null);

    setTimeout(() => setSubmitted(false), 5000);
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
              Schedule a meeting with the MP&apos;s office or submit applications for grants,
              jobs, and support programs.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm inline-flex">
              <button
                onClick={() => {
                  setActiveTab('appointment');
                  setSubmitted(false);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'appointment'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Book Appointment
              </button>
              <button
                onClick={() => {
                  setActiveTab('application');
                  setSubmitted(false);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeTab === 'application'
                    ? 'bg-blue-900 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900'
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
                <p className="text-slate-500">
                  We have received your request and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* HON AVAILABILITY INFO BAR (only for appointment tab) */}
                {activeTab === 'appointment' && (
                  <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50/80 px-4 py-3 flex gap-3 items-start">
                    <Info className="w-5 h-5 text-blue-700 mt-0.5" />
                    <div className="text-xs sm:text-sm text-blue-900">
                      <p className="font-semibold mb-1">
                        Hon. Appointment Availability (Prototype Schedule)
                      </p>
                      <ul className="space-y-0.5">
                        <li>• Mondays – Morning & Afternoon</li>
                        <li>• Wednesdays – Morning only</li>
                        <li>• Fridays – Afternoon only</li>
                      </ul>
                      <p className="mt-1 text-[11px] text-blue-900/80">
                        If you pick a date and time outside these periods, the system will show you
                        the next available slot for Hon.
                      </p>
                    </div>
                  </div>
                )}

                {/* DYNAMIC FORM CONTENT */}
                {activeTab === 'appointment' ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Contact Number
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 text-xs font-bold">
                            GH
                          </div>
                          <input
                            type="tel"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="024 XXX XXXX"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Preferred Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="date"
                            required
                            min={todayISO}
                            value={appointmentDate}
                            onChange={(e) => {
                              const value = e.target.value;
                              setAppointmentDate(value);
                              updateAvailability(value, appointmentTimeSlot);
                            }}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <select
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                            value={appointmentTimeSlot}
                            onChange={(e) => {
                              const slot = e.target.value as TimeSlot;
                              setAppointmentTimeSlot(slot);
                              if (appointmentDate) {
                                updateAvailability(appointmentDate, slot);
                              }
                            }}
                          >
                            <option value="morning">{TIME_SLOT_LABELS.morning}</option>
                            <option value="afternoon">{TIME_SLOT_LABELS.afternoon}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Availability Status Block */}
                    {availabilityMessage && (
                      <div
                        className={`rounded-2xl px-4 py-3 text-xs sm:text-sm flex gap-3 items-start ${
                          availabilityStatus === 'available'
                            ? 'bg-green-50 border border-green-100 text-green-800'
                            : 'bg-amber-50 border border-amber-100 text-amber-900'
                        }`}
                      >
                        {availabilityStatus === 'available' ? (
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <p>{availabilityMessage}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Purpose of Visit
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Please briefly explain the reason for the appointment..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Application Type
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Job Opportunity',
                          'Educational Grant',
                          'Business Support',
                          'Health Support',
                          'Other',
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200"
                          >
                            <input
                              type="radio"
                              name="appType"
                              className="text-blue-600 focus:ring-blue-500"
                              required
                            />
                            <span className="text-sm font-medium text-slate-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Applicant name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="email"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Cover Letter / Details
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Tell us about your application..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Upload Documents (CV/Proposal)
                      </label>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                        <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <span className="text-sm text-slate-500 font-medium">
                          Click to upload or drag and drop
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    {activeTab === 'appointment'
                      ? 'Schedule Appointment'
                      : 'Submit Application'}
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

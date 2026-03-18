import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlansAndPricing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API}plans/allPlans`,
      );
      console.log(response.data.plans)
      setPlans(response.data?.plans || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const getBestDiscount = (plan) => {
    if (plan.price === 0) return null;
    return plan.discounts.reduce((best, d) =>
      d.discountPercent > (best?.discountPercent ?? 0) ? d : best, null
    );
  };

  const getTermLabel = (discount) => {
    if (!discount) return null;
    if (discount.duration === 36) return "For first 3-yr term";
    if (discount.duration === 24) return "For first 2-yr term";
    if (discount.duration === 12) return "For first 1-yr term";
    if (discount.duration === 6) return "For first 6-month term";
    return `For first ${discount.duration}-month term`;
  };

  const featureList = [
    { label: "Students", key: null, getValue: (p) => `Up to ${p.limits.students}` },
    { label: "Staff", key: null, getValue: (p) => `Up to ${p.limits.staff}` },
    { label: "Courses", key: null, getValue: (p) => `Up to ${p.limits.courses}` },
    { label: "Student Info", key: (p) => p.features.academic.studentInfo },
    { label: "Classrooms", key: (p) => p.features.academic.classrooms },
    { label: "Attendance", key: (p) => p.features.academic.attendance },
    { label: "Exam Module", key: (p) => p.features.academic.exam },
    { label: "Timetable", key: (p) => p.features.academic.timetable },
    { label: "Student Reports", key: (p) => p.features.reports.studentsReport },
    { label: "Classroom Activity", key: (p) => p.features.reports.classroomActivity },
    { label: "Certificate", key: (p) => p.features.administration.certificate },
    { label: "ID Card", key: (p) => p.features.administration.idCard },
  ];

  const planAccents = [
    { color: "#6366f1", shadow: "rgba(99,102,241,0.22)", badgeBg: "#eef2ff", badgeText: "#4338ca", badgeBgDark: "rgba(99,102,241,0.15)", badgeTextDark: "#a5b4fc" },
    { color: "#0ea5e9", shadow: "rgba(14,165,233,0.22)", badgeBg: "#e0f2fe", badgeText: "#0369a1", badgeBgDark: "rgba(14,165,233,0.15)", badgeTextDark: "#7dd3fc" },
    { color: "#10b981", shadow: "rgba(16,185,129,0.22)", badgeBg: "#d1fae5", badgeText: "#065f46", badgeBgDark: "rgba(16,185,129,0.15)", badgeTextDark: "#6ee7b7" },
    { color: "#f59e0b", shadow: "rgba(245,158,11,0.22)", badgeBg: "#fef3c7", badgeText: "#92400e", badgeBgDark: "rgba(245,158,11,0.15)", badgeTextDark: "#fcd34d" },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
 
      <div className="max-w-7xl mx-auto px-4 py-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-24 text-gray-400 dark:text-gray-500">
            <p className="text-2xl font-medium">No Active Plans</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => {
              const accent = planAccents[i % planAccents.length];
              const isFree = plan.price === 0;
              const bestDiscount = getBestDiscount(plan);
              const hasDiscount = bestDiscount && bestDiscount.discountPercent > 0;
              const discountedPrice = hasDiscount
                ? Math.round(plan.price * (1 - bestDiscount.discountPercent / 100))
                : plan.price;
              const termLabel = getTermLabel(bestDiscount);

              return (
                <div
                  key={plan.planId}
                  className="relative rounded-3xl flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 group"
                  style={{
                    boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px -8px ${accent.shadow}`,
                  }}
                >
                  <div className="h-1 w-full rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${accent.color}, ${accent.color}cc)` }} />

                  {hasDiscount && (
                    <div
                      className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full dark:hidden"
                      style={{ backgroundColor: accent.badgeBg, color: accent.badgeText }}
                    >
                      {bestDiscount.discountPercent}% OFF
                    </div>
                  )}
                  {hasDiscount && (
                    <div
                      className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full hidden dark:block"
                      style={{ backgroundColor: accent.badgeBgDark, color: accent.badgeTextDark }}
                    >
                      {bestDiscount.discountPercent}% OFF
                    </div>
                  )}

                  <div className="p-6 pb-5">
                    <h2 className="text-sm font-bold mb-5 pr-16 tracking-tight text-gray-700 dark:text-gray-200 uppercase">{plan.name}</h2>

                    <div className="mb-6 min-h-[80px]">
                      {isFree ? (
                        <>
                          <span className="text-4xl font-extrabold tracking-tight">Free</span>
                          <p className="text-xs mt-2 text-gray-400 dark:text-gray-500 font-medium">For 1 Month</p>
                        </>
                      ) : (
                        <>
                          {hasDiscount && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 line-through mb-1 font-medium">
                              ₹{plan.price}<span className="text-xs">/mo</span>
                            </p>
                          )}
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold tracking-tight" style={{ color: accent.color }}>
                              ₹{discountedPrice}
                            </span>
                            <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">/mo</span>
                          </div>
                          {termLabel && (
                            <p className="text-xs mt-1.5 text-gray-400 dark:text-gray-500 font-medium">{termLabel}</p>
                          )}
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`customise/${plan.planId}`)}
                      className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: accent.color,
                        boxShadow: `0 4px 16px -2px ${accent.shadow}`,
                      }}
                    >
                      Customise Plan
                    </button>
                  </div>

                  <div className="flex-1 border-t border-gray-100 dark:border-gray-800 px-4 py-3">
                    {featureList.map((f, fi) => {
                      const isText = f.key === null;
                      const value = isText ? f.getValue(plan) : f.key(plan);

                      return (
                        <div
                          key={fi}
                          className={`flex items-center justify-between py-2 px-3 rounded-xl text-sm ${fi % 2 === 0 ? "bg-gray-50 dark:bg-white/[0.03]" : ""}`}
                        >
                          <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">{f.label}</span>
                          {isText ? (
                            <span className="font-bold text-xs text-gray-700 dark:text-gray-300">{value}</span>
                          ) : value ? (
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${accent.color}20` }}
                            >
                              <svg className="w-3 h-3" style={{ color: accent.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-6 py-4 border-t border-gray-50 dark:border-gray-800/50">
                    <div className="flex items-center gap-1.5 justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">30-day money-back guarantee</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansAndPricing;

import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const CustomisePlan = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API}/plans/plan/${planId}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        },
      );
      setPlan(response.data?.plan);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanDetails();
  }, [planId]);

  const handleChange = (field, value) => {
    setPlan((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLimitChange = (field, value) => {
    setPlan((prev) => ({
      ...prev,
      limits: {
        ...prev.limits,
        [field]: value,
      },
    }));
  };

  const handleFeatureChange = (category, feature) => {
    setPlan((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [category]: {
          ...prev.features[category],
          [feature]: !prev.features[category][feature],
        },
      },
    }));
  };

  const handleDiscountChange = (index, value) => {
    setPlan((prev) => ({
      ...prev,
      discounts: prev.discounts.map((item, i) =>
        i === index ? { ...item, discountPercent: value } : item,
      ),
    }));
  };
  const updatePlan = async () => {
    toast.promise(
      axios.put(
        `${import.meta.env.VITE_REACT_API}/plans/updatePlans/${planId}`,
        plan,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        },
      ),
      {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      },
    );
  };

  const baseStyle =
    "px-4 py-2 rounded-lg font-medium transition-all duration-200";

  if (loading || !plan) {
    return <div className="p-6">Loading...</div>;
  }
  return (
    <div className="w-full h-auto lg:p-6 space-y-6 bg-gray-100 dark:bg-slate-900">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl lg:p-6 space-y-6 lg:w-8/12">
        <div className="grid md:grid-cols-2 lg:gap-6 gap-2">
          <div>
            <label className="text-sm font-medium">Plan Name</label>
            <input
              type="text"
              value={plan.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              type="number"
              value={plan.actualPrice}
              onChange={(e) => handleChange("price", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Currency</label>
            <input
              type="text"
              value={plan.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700"
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Limits</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {["students", "staff", "courses"].map((limit) => (
              <div key={limit}>
                <label className="text-sm capitalize">{limit}</label>
                <input
                  type="number"
                  value={plan.limits?.[limit]}
                  onChange={(e) => handleLimitChange(limit, e.target.value)}
                  className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Features</h3>
          {Object.entries(plan.features || {}).map(([category, features]) => (
            <div key={category} className="mb-4">
              <h4 className="font-semibold capitalize mb-2">{category}</h4>

              <div className="grid md:grid-cols-3 lg:gap-3 gap-2">
                {Object.entries(features).map(([feature, value]) => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 p-2 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleFeatureChange(category, feature)}
                    />
                    <span className="capitalize">{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Discounts</h3>
          <div className="flex flex-col  gap-2 lg:gap-3">
            {plan.discounts.map((dis, index) => {
              console.log(plan);
              return (
                <div className=" rounded-2xl  p-2">
                  <label className="text-sm font-medium">
                    {dis.duration} {dis.durationType}
                  </label>
                  <input
                    type="text"
                    value={dis.discountPercent}
                    onChange={(e) =>
                      handleDiscountChange(index, e.target.value)
                    }
                    className="w-full mt-1 p-2 rounded-lg border dark:bg-slate-700"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={updatePlan}
            className="px-6 py-2 bg-[#24324F] text-white rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className=" bg-white dark:bg-slate-800 rounded-2xl shadow-xl lg:w-4/12">
        {plans.map((plan, i) => {
          const accent = planAccents[i % planAccents.length];
          const isFree = plan.actualPrice === 0;
          const bestDiscount = getBestDiscount(plan);
          const hasDiscount = bestDiscount && bestDiscount.discountPercent > 0;
          const discountedPrice = hasDiscount
            ? Math.round(
                plan.actualPrice * (1 - bestDiscount.discountPercent / 100),
              )
            : plan.actualPrice;
          const termLabel = getTermLabel(bestDiscount);

          return (
            <div
              key={plan.planId}
              className="relative rounded-3xl flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 group"
              style={{
                boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px -8px ${accent.shadow}`,
              }}
            >
              <div
                className="h-1 w-full rounded-t-3xl"
                style={{
                  background: `linear-gradient(90deg, ${accent.color}, ${accent.color}cc)`,
                }}
              />

              {hasDiscount && (
                <div
                  className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full dark:hidden"
                  style={{
                    backgroundColor: accent.badgeBg,
                    color: accent.badgeText,
                  }}
                >
                  {bestDiscount.discountPercent}% OFF
                </div>
              )}
              {hasDiscount && (
                <div
                  className="absolute top-5 right-5 text-xs font-bold px-2.5 py-1 rounded-full hidden dark:block"
                  style={{
                    backgroundColor: accent.badgeBgDark,
                    color: accent.badgeTextDark,
                  }}
                >
                  {bestDiscount.discountPercent}% OFF
                </div>
              )}

              <div className="p-6 pb-5">
                <h2 className="text-sm font-bold mb-5 pr-16 tracking-tight text-gray-700 dark:text-gray-200 uppercase">
                  {plan.name}
                </h2>

                <div className="mb-6 min-h-[80px]">
                  {isFree ? (
                    <>
                      <span className="text-4xl font-extrabold tracking-tight">
                        Free
                      </span>
                      <p className="text-xs mt-2 text-gray-400 dark:text-gray-500 font-medium">
                        Forever free
                      </p>
                    </>
                  ) : (
                    <>
                      {hasDiscount && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 line-through mb-1 font-medium">
                          ₹{plan.actualPrice}
                          <span className="text-xs">/mo</span>
                        </p>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-4xl font-extrabold tracking-tight"
                          style={{ color: accent.color }}
                        >
                          ₹{discountedPrice}
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
                          /mo
                        </span>
                      </div>
                      {termLabel && (
                        <p className="text-xs mt-1.5 text-gray-400 dark:text-gray-500 font-medium">
                          {termLabel}
                        </p>
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
                      <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                        {f.label}
                      </span>
                      {isText ? (
                        <span className="font-bold text-xs text-gray-700 dark:text-gray-300">
                          {value}
                        </span>
                      ) : value ? (
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${accent.color}20` }}
                        >
                          <svg
                            className="w-3 h-3"
                            style={{ color: accent.color }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 text-gray-400 dark:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-4 border-t border-gray-50 dark:border-gray-800/50">
                <div className="flex items-center gap-1.5 justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomisePlan;

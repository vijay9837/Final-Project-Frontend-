import axios from "axios";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const CustomisePlan = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API}plans/plan/${planId}`,
      );
      setPlan(response.data.plan);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
      console.log(plan);

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
      discount: prev.discount.map((item, i) =>
        i === index ? { ...item, discountPercent: value } : item,
      ),
    }));
  };
  const updatePlan = async () => {
    toast.promise(
      axios.put(
        `${import.meta.env.VITE_REACT_API}plans/updatePlans/${planId}`,
        plan,
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
      <button onClick={()=> navigate('/settings/plans') } className="border-2 border-blue-950 lg:px-3 lg:py-2 flex items-center justify-center lg:gap-3 lg:rounded-lg text-blue-950 cursor-pointer"> <FaLongArrowAltLeft/> Back</button>
      
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
              value={plan.price}
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
            {console.log(plan.discounts)}
            {plan.discount.map((dis,index) => {
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
      <div className=" bg-white dark:bg-slate-800 rounded-2xl shadow-xl lg:w-4/12"></div>
    </div>
  );
};

export default CustomisePlan;

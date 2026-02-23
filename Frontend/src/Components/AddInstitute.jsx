import React, { useState } from "react";
import axios from "axios";

const AddInstitute = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    email: "",
    password: "",
    confirmPassword: "",
    establishedDate: "",
    city: "",
    officialEmail: "",
    phone: "",
    alternatePhone: "",
    course: "",
    totalStudents: "",
    aadhaar: "",
    gstNumber: "",
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !formData.phone ||
      !formData.instituteName ||
      !formData.establishedDate ||
      !formData.city
    ) {
      alert("Please fill all mandatory fields!");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.instituteName);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("contact", formData.phone);
      payload.append("alternatePhone", formData.alternatePhone);
      payload.append("city", formData.city);
      payload.append("officialEmail", formData.officialEmail);
      payload.append("numberOfStudents", formData.totalStudents);
      payload.append("aadhaarNumber", formData.aadhaar);
      payload.append("courses", formData.course);
      payload.append("gstNumber", formData.gstNumber);
      payload.append("establishedDate", formData.establishedDate);

      if (logoFile) payload.append("logo", logoFile);

      const res = await axios.post(
        import.meta.env.VITE_REACT_NGROK_MAIN + "/institute/register",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (res.data.success) {
        alert("Institute Registered Successfully!");
        setFormData({
          instituteName: "",
          email: "",
          password: "",
          confirmPassword: "",
          establishedDate: "",
          city: "",
          officialEmail: "",
          phone: "",
          alternatePhone: "",
          course: "",
          totalStudents: "",
          aadhaar: "",
          gstNumber: "",
        });
        setLogoPreview(null);
        setLogoFile(null);
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl ">
      {/* Form Container */}
      <div className="bg-white rounded-2xl h-full w-full shadow-sm">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
          <div className="bg-[#24324F] text-white rounded-xl p-5 mb-6">
            <h2 className="text-3xl font-semibold">
              Institute Registration Form
            </h2>
            <p className="text-sm opacity-90">
              Fill all details carefully. Fields marked (*) are mandatory
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Institute Basic Info + Logo */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-indigo-700 mb-4 text-xl">
                Institute Basic Information
              </h3>

              <div className="mb-4 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <label className="text-sm text-slate-600">
                    Institute Logo *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="block mt-2 text-sm text-slate-600
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:bg-[#24324F] file:text-white
                      hover:file:bg-[#151b26] cursor-pointer"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Upload institute logo (JPG / PNG)
                  </p>
                </div>
                {logoPreview && (
                  <div className="w-28 h-28 border border-slate-300 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-3 mb-3">
                <div className="flex-1">
                  <label className="text-sm text-slate-600">
                    Institute Name *
                  </label>
                  <input
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-600">
                    Institute Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-600">
                    Enter Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-600">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-sm text-slate-600">
                    Established Date *
                  </label>
                  <input
                    type="date"
                    name="establishedDate"
                    value={formData.establishedDate}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-slate-600">City *</label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-md px-3 py-2 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-indigo-700 mb-3">
                Contact Information
              </h3>
              <div className="flex flex-col md:flex-row gap-3 mb-3">
                <input
                  name="officialEmail"
                  placeholder="Official Email *"
                  value={formData.officialEmail}
                  onChange={handleChange}
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2"
                />
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2"
                />
              </div>
              <input
                name="alternatePhone"
                placeholder="Alternate Phone"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Academic / Admission */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-indigo-700 mb-3">
                Academic / Admission Details
              </h3>
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2"
                >
                  <option>Select Course</option>
                  <option>Java</option>
                  <option>Python</option>
                  <option>C++</option>
                  <option>Php</option>
                </select>
                <input
                  name="totalStudents"
                  placeholder="Total Students"
                  value={formData.totalStudents}
                  onChange={handleChange}
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Legal Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-indigo-700 mb-3">
                Legal Information
              </h3>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  name="aadhaar"
                  placeholder="Aadhar Number (Optional)"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2"
                />
                <input
                  name="gstNumber"
                  placeholder="GST Number (Optional)"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="flex-1 border border-slate-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#24324F] text-white px-10 py-3 rounded-lg shadow-lg hover:opacity-90 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Registering..." : "Register Institute"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInstitute;

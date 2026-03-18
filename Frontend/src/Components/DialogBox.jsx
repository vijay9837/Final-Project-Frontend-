import React, { useState, useEffect } from "react";

const DialogBox = ({ isOpen, onClose, title , message  }) => {
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-80 transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <p className="text-gray-600">{message}</p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
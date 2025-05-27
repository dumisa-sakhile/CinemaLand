import React from "react";

interface OutdatedModalProps {
  onClose: () => void;
}

const OutdatedModal: React.FC<OutdatedModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
    <div
      className="bg-[#1C1917] p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center transform transition-transform duration-300 ease-out scale-100"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description">
      {/* Icon */}
      <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-600 bg-opacity-20">
        <svg
          className="w-10 h-10 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2
        id="modal-title"
        className="text-3xl font-extrabold text-red-500 mb-4 tracking-wide">
        Site Outdated
      </h2>
      <p
        id="modal-description"
        className="mb-8 text-gray-300 text-lg leading-relaxed">
        This site is no longer maintained.
        <br />
        Please visit the new site at:
      </p>
      <a
        href="https://trailer-base.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-8 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition">
        trailer-base.vercel.app
      </a>
      <br />
      <button
        onClick={onClose}
        className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-50 transition">
        Close and Continue
      </button>
    </div>
  </div>
);

export default OutdatedModal;

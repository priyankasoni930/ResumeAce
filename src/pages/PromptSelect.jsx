import React from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiEdit3, FiInfo } from "react-icons/fi";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "@/components/Navbar";

const PromptSelect = () => {
  const navigate = useNavigate();

  const redirectWithState = (path, state) => {
    setTimeout(() => {
      navigate(path, { state });
    }, 500);
  };

  const handleSelectionResume = async (promptType) => {
    redirectWithState("/resume-upload", { promptType });
  };

  const handleSelectionText = async (promptType) => {
    redirectWithState("/text-input", { promptType });
  };
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <AuroraBackground className="absolute inset-0" />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8 p-4">
          <h1 className="text-4xl font-bold text-center text-white mb-12">
            How would you like to input your skills?
          </h1>
          <div className="grid gap-8 md:grid-cols-2">
            <button
              onClick={() => handleSelectionResume("resume")}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                  <FiUpload className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Upload Resume
                </h2>
                <p className="text-gray-600">
                  Make sure your resume is in PDF format
                </p>
              </div>
              <div className="px-8 py-4 bg-purple-50 flex items-center text-sm text-purple-600">
                <FiInfo className="w-5 h-5 mr-2" />
                Beta feature, supports resumes up to 2 pages long
              </div>
            </button>

            <button
              onClick={() => handleSelectionText("text")}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
            >
              <div className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                  <FiEdit3 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Text Prompt
                </h2>
                <p className="text-gray-600">
                  Write about your skills and experience
                </p>
              </div>
              <div className="px-8 py-4 bg-indigo-50 text-sm text-indigo-600">
                Ideal for customized input
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptSelect;

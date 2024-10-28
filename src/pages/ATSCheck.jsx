import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function ATSCheck() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a resume file");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(
        "https://ats-checker-pvn0.onrender.com/api/ats-check",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AuroraBackground>
        <main className="flex-grow pt-5 sm:pt-5">
          <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Card className="bg-white backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  ATS Resume Check
                </CardTitle>
                <p className="mt-2 text-sm text-gray-600">
                  Upload your resume to check its ATS compatibility score
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-center items-center w-full">
                      <label
                        htmlFor="resume-upload"
                        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer
                          ${
                            file
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300 hover:border-gray-400 bg-white"
                          }
                        `}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload
                            className={`w-12 h-12 mb-3 ${
                              file ? "text-green-500" : "text-gray-400"
                            }`}
                          />
                          {file ? (
                            <p className="text-sm text-green-600">
                              {file.name}
                            </p>
                          ) : (
                            <>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PDF files only
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading || !file}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                        ${
                          loading || !file
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        }`}
                    >
                      {loading ? "Analyzing..." : "Check Resume"}
                    </button>
                  </div>
                </form>

                {result && (
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Analysis Results
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          ATS Compatibility Score
                        </p>
                        <p className="text-3xl font-bold text-indigo-600">
                          {result.score}%
                        </p>
                      </div>
                      {result.suggestions && (
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            Suggestions for Improvement
                          </p>
                          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {result.suggestions.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </AuroraBackground>
    </div>
  );
}

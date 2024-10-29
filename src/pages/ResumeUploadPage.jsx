"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeUploadPage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
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

    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch(
        "http://localhost:3000/api/generate-cover-letter",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate cover letter");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to generate cover letter. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCoverLetter = (text) => {
    if (!text) return "";
    const paragraphs = text.split("\n");
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AuroraBackground>
        <main className="flex-grow pt-5 sm:pt-5">
          <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Card className="bg-white backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Generate Cover Letter
                </CardTitle>
                <p className="mt-2 text-sm text-gray-600">
                  Upload your resume and enter the job description to generate a
                  tailored cover letter
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

                    <Textarea
                      placeholder="Enter the job description here"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={6}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <Button
                      type="submit"
                      disabled={loading || !file || !jobDescription.trim()}
                      className={`w-full ${
                        loading || !file || !jobDescription.trim()
                          ? "bg-primary/50"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      {loading ? "Generating..." : "Generate Cover Letter"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {result && (
              <Card className="mt-8 bg-white backdrop-blur-sm">
                <CardContent className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Your Cover Letter
                    </h2>
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <div className="prose max-w-none font-serif text-gray-800 leading-relaxed">
                        {formatCoverLetter(result.coverLetter)}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() =>
                        navigator.clipboard.writeText(result.coverLetter)
                      }
                      className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      Copy to Clipboard
                    </Button>
                    <Button
                      onClick={() => {
                        const blob = new Blob([result.coverLetter], {
                          type: "text/plain",
                        });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "cover-letter.txt";
                        a.click();
                        window.URL.revokeObjectURL(url);
                      }}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Download as Text
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </AuroraBackground>
    </div>
  );
}

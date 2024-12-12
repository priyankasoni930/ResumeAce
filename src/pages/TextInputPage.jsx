import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BACKEND_URL = "https://ats-checker-1.onrender.com"; // Adjust this to match your backend port

export default function TextInputPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [skillsExperience, setSkillsExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription.trim() || !skillsExperience.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/generate-cover-letter/text`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add this header to handle CORS
            Accept: "application/json",
          },
          body: JSON.stringify({
            jobDescription: jobDescription,
            skillsExperience: skillsExperience,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate cover letter");
      }

      setResult(data.data);
    } catch (err) {
      setError(
        err.message || "Failed to generate cover letter. Please try again."
      );
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
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Card className="bg-white backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Generate Cover Letter
                </CardTitle>
                <p className="mt-2 text-sm text-gray-600">
                  Enter the job description and your skills/experience to
                  generate a tailored cover letter
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Job Description
                      </label>
                      <Textarea
                        placeholder="Enter the job description here"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={6}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Skills & Experience
                      </label>
                      <Textarea
                        placeholder="Enter your skills and experience here"
                        value={skillsExperience}
                        onChange={(e) => setSkillsExperience(e.target.value)}
                        rows={6}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      disabled={
                        loading ||
                        !jobDescription.trim() ||
                        !skillsExperience.trim()
                      }
                      className="w-full"
                    >
                      {loading ? "Generating..." : "Generate Cover Letter"}
                    </Button>
                  </div>
                </form>

                {result && (
                  <div className="mt-8 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Generated Cover Letter
                      </h3>
                      <div className="whitespace-pre-wrap p-4 bg-gray-50 rounded-md">
                        {result.coverLetter}
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

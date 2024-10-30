import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const GuideItem = ({ title, description }) => (
  <div className="flex items-start space-x-4 p-6 bg-purple-50 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
    <div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default function Guides() {
  const guidelines = [
    {
      title: "Address the Hiring Manager",
      description:
        'Always address your cover letter to a specific person if possible. Use "Dear [Hiring Manager\'s Name]," instead of a generic greeting like "To Whom It May Concern."',
    },
    {
      title: "Use a Professional Format",
      description:
        "Use a standard business letter format with your contact information at the top, followed by the date and the employer's contact information.",
    },
    {
      title: "Start with a Strong Opening",
      description:
        "Begin with a compelling introduction that states the position you are applying for and a brief statement on why you are the ideal candidate.",
    },
    {
      title: "Tailor Your Letter to the Job",
      description:
        "Customize your cover letter for each job application. Highlight your skills and experiences that are most relevant to the specific job you are applying for.",
    },
    {
      title: "Show Enthusiasm",
      description:
        "Express your excitement about the role and the company. Let your passion for the industry and the position shine through.",
    },
    {
      title: "Highlight Key Achievements",
      description:
        "Provide specific examples of your achievements and how they relate to the job you are applying for. Use metrics and numbers to quantify your successes when possible.",
    },
    {
      title: "Keep It Concise",
      description:
        "Aim to keep your cover letter to one page. Be clear and concise, avoiding unnecessary details.",
    },
    {
      title: "Use a Professional Tone",
      description:
        "Maintain a professional and respectful tone throughout your cover letter. Avoid using slang or overly casual language.",
    },
    {
      title: "Proofread Carefully",
      description:
        "Check for spelling and grammatical errors. Proofread your cover letter multiple times, and consider having a friend or colleague review it as well.",
    },
    {
      title: "Include a Call to Action",
      description:
        "End your cover letter with a call to action, such as requesting an interview or expressing your desire to discuss your application further.",
    },
    {
      title: "Sign Off Professionally",
      description:
        'Use a formal closing such as "Sincerely," followed by your full name. If submitting a hard copy, leave space for your signature above your typed name.',
    },
    {
      title: "Match Your Resume",
      description:
        "Ensure that the style and format of your cover letter match your resume for a cohesive and professional look.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AuroraBackground>
        <main className="flex-grow container mx-auto px-4 py-16">
          <Card className="bg-black bg-opacity-90 backdrop-blur-lg shadow-xl border-black rounded-2xl overflow-hidden max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold text-center text-white mb-8">
                Guidelines for Writing a Cover Letter
              </h1>
              <div className="space-y-6">
                {guidelines.map((item, index) => (
                  <GuideItem
                    key={index}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </AuroraBackground>
    </div>
  );
}

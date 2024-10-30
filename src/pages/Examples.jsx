import React, { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const industries = [
  { name: "Software Development", icon: "💻" },
  { name: "Marketing", icon: "📊" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Finance", icon: "💰" },
  { name: "Education (Teacher)", icon: "🏫" },
  { name: "Sales", icon: "📈" },
  { name: "Graphic Design", icon: "🖌️" },
  { name: "Customer Service", icon: "🛃" },
];

const coverLetters = {
  "Software Development": `
Dear [Hiring Manager's Name],

I am writing to express my interest in the Software Developer position at [Company Name] as advertised on [Job Board/Company Website]. With a strong background in software development, a passion for problem-solving, and experience in developing web applications, I am excited about the opportunity to contribute to your team.

In my previous role at [Previous Company], I developed and maintained several high-traffic web applications using JavaScript, Node.js, and Express. I was responsible for designing and implementing RESTful APIs, optimizing database queries, and ensuring code quality through rigorous testing. One of my significant achievements was leading a project that reduced page load times by 40%, significantly enhancing user experience.

I am particularly drawn to [Company Name] because of your commitment to innovation and cutting-edge technology. I am eager to bring my expertise in full-stack development, including proficiency in front-end frameworks like React and Angular, to your team. I am confident that my ability to work collaboratively and my proactive approach to problem-solving will make me a valuable asset to your development team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and enthusiasm can contribute to the success of [Company Name].

Sincerely,
[Your Name]`,
  Marketing: `
Dear [Hiring Manager's Name],

I am writing to apply for the Marketing Manager position at [Company Name]. With a proven track record in developing successful marketing campaigns and a passion for digital marketing, I am excited about the opportunity to contribute to your team.

In my previous role at [Previous Company], I managed multiple marketing campaigns that resulted in a 30% increase in customer engagement and a 20% boost in sales. I have extensive experience with SEO, content marketing, and social media strategies, which I believe are crucial for driving brand awareness and achieving business objectives. My ability to analyze market trends and consumer behavior has consistently enabled me to develop targeted and effective marketing strategies.

I am particularly impressed with [Company Name]'s innovative approach to marketing and its dedication to providing exceptional value to its customers. I am eager to bring my skills in project management, creative problem-solving, and data-driven decision-making to your team. I am confident that my background in both traditional and digital marketing will allow me to make a significant contribution to your marketing efforts.

Thank you for considering my application. I look forward to the opportunity to discuss how my experience and skills align with the goals of [Company Name].

Sincerely,
[Your Name]`,
  Healthcare: `
Dear [Hiring Manager's Name],

I am writing to express my interest in the Registered Nurse position at [Hospital/Clinic Name]. With a Bachelor of Science in Nursing and over five years of experience in providing compassionate and high-quality patient care, I am excited about the opportunity to contribute to your healthcare team.

In my previous role at [Previous Hospital/Clinic], I worked in a fast-paced environment where I was responsible for administering medication, monitoring patient progress, and coordinating with interdisciplinary teams to develop comprehensive care plans. I have a strong ability to manage multiple tasks simultaneously while maintaining a high level of patient care and satisfaction. One of my key achievements was leading a patient education initiative that improved patient compliance and health outcomes by 25%.

I am particularly drawn to [Hospital/Clinic Name] because of your commitment to patient-centered care and innovative treatment approaches. I am eager to bring my skills in patient assessment, critical thinking, and collaborative teamwork to your organization. I am confident that my dedication to providing exceptional care and my proactive approach to patient education will make me a valuable asset to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and passion for patient care align with the goals of [Hospital/Clinic Name].

Sincerely,
[Your Name]`,
  Finance: `
Dear [Hiring Manager's Name],

I am writing to express my interest in the Financial Analyst position at [Company Name]. With a Master's degree in Finance and over four years of experience in financial analysis and modeling, I am excited about the opportunity to contribute to your team.

In my previous role at [Previous Company], I conducted detailed financial analyses, developed financial models, and provided actionable insights that informed strategic decision-making. I was responsible for preparing financial reports, forecasting revenues, and analyzing market trends to support business growth. One of my significant achievements was identifying cost-saving opportunities that resulted in a 15% reduction in operating expenses.

I am particularly drawn to [Company Name] because of your reputation for financial excellence and innovation. I am eager to bring my expertise in data analysis, financial modeling, and strategic planning to your organization. I am confident that my analytical skills and attention to detail will make me a valuable asset to your finance team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and skills can contribute to the success of [Company Name].

Sincerely,
[Your Name]`,
  "Education (Teacher)": `
Dear [Hiring Manager’s Name],

I am excited to apply for the Elementary School Teacher position at [School Name]. With a Bachelor’s degree in Elementary Education and over six years of experience teaching in diverse classroom settings, I am eager to bring my passion for education and dedication to student development to your esteemed school.

In my previous role at [Previous School], I successfully implemented innovative lesson plans that engaged students and fostered a love for learning. I focused on creating a positive and inclusive classroom environment where all students felt valued and motivated to succeed. One of my key achievements was improving reading comprehension scores by 20% through a targeted literacy program.

I am particularly drawn to [School Name] because of your commitment to academic excellence and holistic student development. I am eager to contribute my skills in curriculum development, classroom management, and differentiated instruction to your team. I am confident that my experience and enthusiasm for teaching will make a positive impact on your students.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and teaching philosophy align with the goals of [School Name].

Sincerely,
[Your Name]`,
  Sales: `
Dear [Hiring Manager’s Name],

I am writing to express my interest in the Sales Representative position at [Company Name]. With over five years of experience in sales and a proven track record of exceeding targets, I am excited about the opportunity to bring my skills and passion for sales to your team.

In my previous role at [Previous Company], I consistently met and exceeded sales goals, achieving a 25% increase in revenue within my first year. I have a strong ability to build and maintain client relationships, and I excel at identifying customer needs and presenting tailored solutions. One of my key achievements was securing a major contract with a Fortune 500 company, resulting in significant business growth.

I am particularly impressed with [Company Name]’s innovative products and commitment to customer satisfaction. I am eager to leverage my sales expertise, strategic thinking, and communication skills to drive sales and contribute to your company’s success. I am confident that my proactive approach and passion for sales will make me a valuable asset to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and skills align with the goals of [Company Name].

Sincerely,
[Your Name]`,
  "Graphic Design": `
Dear [Hiring Manager’s Name],

I am excited to apply for the Graphic Designer position at [Company Name]. With a Bachelor’s degree in Graphic Design and over five years of experience in creating visually compelling designs, I am eager to bring my creativity and technical skills to your team.

In my previous role at [Previous Company], I worked on a wide range of projects, including branding, print design, and digital media. I have a strong ability to translate client ideas into visually appealing and effective designs. One of my key achievements was leading a rebranding project that resulted in a 30% increase in brand recognition and customer engagement.

I am particularly impressed with [Company Name]’s innovative approach to design and your commitment to quality. I am eager to contribute my skills in Adobe Creative Suite, typography, and layout design to your team. I am confident that my creativity and attention to detail will make me a valuable asset to your design team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and design philosophy align with the goals of [Company Name].

Sincerely,
[Your Name]`,
  "Customer Service": `
Dear [Hiring Manager’s Name],

I am writing to express my interest in the Customer Service Representative position at [Company Name]. With over four years of experience in customer service and a passion for helping people, I am excited about the opportunity to join your team and provide exceptional service to your customers.

In my previous role at [Previous Company], I handled a high volume of customer inquiries and resolved issues promptly and effectively. I have a strong ability to communicate clearly and empathetically, ensuring that customers feel heard and valued. One of my significant achievements was implementing a new customer feedback system that improved customer satisfaction ratings by 20%.

I am particularly drawn to [Company Name] because of your dedication to customer satisfaction and innovative approach to service. I am eager to bring my skills in problem-solving, communication, and customer relationship management to your team. I am confident that my dedication to providing excellent service and my proactive approach to addressing customer needs will make me a valuable asset to your customer service team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and skills align with the goals of [Company Name].

Sincerely,
[Your Name]`,
};

const IndustryCard = ({ industry, icon, onClick }) => (
  <Card
    className="cursor-pointer rounded-3xl hover:shadow-lg transition-shadow duration-300"
    onClick={onClick}
  >
    <CardContent className="flex items-center justify-center p-6">
      <div className="text-center">
        <span className="text-4xl mb-2">{icon}</span>
        <h3 className="font-semibold text-lg">{industry}</h3>
      </div>
    </CardContent>
  </Card>
);

const CoverLetterModal = ({ industry, content, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <Card className="w-full rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {industry} Cover Letter Example
          </h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <pre className="whitespace-pre-wrap font-mono text-sm">{content}</pre>
      </CardContent>
    </Card>
  </div>
);

export default function Examples() {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AuroraBackground>
        <main className="flex-grow container mx-auto px-4 py-16">
          <Card className="bg-purple-50 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-20">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Cover Letter Examples
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industries.map((industry) => (
                  <IndustryCard
                    key={industry.name}
                    industry={industry.name}
                    icon={industry.icon}
                    onClick={() => setSelectedIndustry(industry.name)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </AuroraBackground>
      {selectedIndustry && (
        <CoverLetterModal
          industry={selectedIndustry}
          content={coverLetters[selectedIndustry]}
          onClose={() => setSelectedIndustry(null)}
        />
      )}
    </div>
  );
}

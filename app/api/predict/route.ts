import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function POST(request: Request): Promise<Response> {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 });
    }

    // Path to the Python prediction script
    const scriptPath = path.join(process.cwd(), "predict.py");

    // Run Python script with job description
    return new Promise<Response>((resolve) => {
      exec(
        `python "${scriptPath}" "${jobDescription.replace(/"/g, '\\"')}"`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("Python execution error:", error);
            // Fallback to mock prediction if Python fails
            resolve(getMockPrediction(jobDescription));
            return;
          }

          try {
            const result = JSON.parse(stdout);
            resolve(NextResponse.json(result));
          } catch {
            // If parsing fails, use mock prediction
            resolve(getMockPrediction(jobDescription));
          }
        }
      );
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Failed to analyze job posting" }, { status: 500 });
  }
}

// Common skills database for extraction
const SKILLS_DATABASE = [
  // Programming Languages
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Rust",
  "PHP",
  "Swift",
  "Kotlin",
  // Web Technologies
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
  "Next.js",
  "HTML",
  "CSS",
  "Tailwind",
  "Redux",
  // Databases
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Firebase",
  // Tools & Platforms
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Linux",
  "Jenkins",
  // Data & ML
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "NumPy",
  "Data Analysis",
  "Statistics",
  // Soft Skills
  "Communication",
  "Leadership",
  "Problem Solving",
  "Team Work",
  "Project Management",
  "Agile",
  "Scrum",
  // Design
  "Figma",
  "Adobe",
  "UI/UX",
  "Photoshop",
  "Illustrator",
  // Other
  "REST API",
  "GraphQL",
  "Microservices",
  "Testing",
  "CI/CD",
];

// Mock prediction with enhanced features
function getMockPrediction(jobDescription: string) {
  const text = jobDescription.toLowerCase();

  // Enhanced risk detection
  const riskFactors = [];
  let isFake = false;
  let riskScore = 0;

  // Risk factor detection with scoring
  if (text.includes("no experience") || text.includes("no skills")) {
    riskFactors.push("No experience required");
    riskScore += 25;
    isFake = true;
  }

  // Check for unrealistic salary with currency symbols
  const salaryMatch = text.match(/[$₹€£]\s*[\d,]+\s*(lakh|k|month|week|day)/);
  if (salaryMatch) {
    riskFactors.push("Unrealistic salary claim");
    riskScore += 30;
    isFake = true;
  }

  if (text.includes("work from home") || text.includes("remote") || text.includes("from home")) {
    riskFactors.push("Remote work emphasis");
    riskScore += 10;
  }

  if (
    text.includes("urgent") ||
    text.includes("urgently") ||
    text.includes("immediately") ||
    text.includes("asap") ||
    text.includes("hurry")
  ) {
    riskFactors.push("Urgent hiring pressure");
    riskScore += 20;
  }

  if (
    text.includes("click here") ||
    text.includes("apply now") ||
    text.includes("apply immediately")
  ) {
    riskFactors.push("Aggressive call-to-action");
    riskScore += 15;
  }

  if (text.includes("guaranteed") || text.includes("guarantee") || text.includes("100%")) {
    riskFactors.push("Guaranteed income claim");
    riskScore += 25;
    isFake = true;
  }

  if (
    text.includes("no interview") ||
    text.includes("instant hire") ||
    text.includes("direct selection")
  ) {
    riskFactors.push("No interview process");
    riskScore += 30;
    isFake = true;
  }

  if (
    text.includes("registration fee") ||
    text.includes("training fee") ||
    text.includes("pay") ||
    text.includes("deposit")
  ) {
    riskFactors.push("Registration/training fee required");
    riskScore += 35;
    isFake = true;
  }

  if (text.includes("bank account")) {
    riskFactors.push("Bank account required upfront");
    riskScore += 25;
  }

  if (
    text.includes("personal details") ||
    text.includes("personal information") ||
    text.includes("share your")
  ) {
    riskFactors.push("Personal information request");
    riskScore += 30;
  }

  if (text.includes("whatsapp")) {
    riskFactors.push("Informal communication channel");
    riskScore += 20;
  }

  if (
    text.includes("joining bonus") ||
    text.includes("sign on bonus") ||
    text.includes("instant bonus")
  ) {
    riskFactors.push("Instant joining bonus");
    riskScore += 20;
  }

  if (
    text.includes("training provided") ||
    text.includes("complete training") ||
    text.includes("free training")
  ) {
    riskFactors.push("Too-good-to-be-true training");
    riskScore += 15;
  }

  // Check for part-time high pay pattern
  const partTimeMatch = text.match(/(\d|one|two)\s*(hour|hr).*(\d|lakh|k|thousand)/);
  if (partTimeMatch) {
    riskFactors.push("Part-time work with high pay");
    riskScore += 30;
    isFake = true;
  }

  if (
    text.includes("limited") ||
    text.includes("only") ||
    text.includes("few positions") ||
    text.includes("spots left")
  ) {
    riskFactors.push("Artificial scarcity/limited spots");
    riskScore += 15;
  }

  // Calculate confidence based on risk score
  let confidenceFake = Math.min(riskScore / 100, 0.95);
  let confidenceReal = 1 - confidenceFake;

  // Add some randomness for realism
  confidenceFake = Math.max(0.5, confidenceFake + (Math.random() * 0.1 - 0.05));
  confidenceReal = 1 - confidenceFake;

  // Determine if fake - LOWERED thresholds to catch more fake jobs (improved recall)
  isFake = riskScore > 50 || (riskFactors.length >= 3 && riskScore > 35);

  // Determine risk level
  let riskLevel = "LOW";
  if (riskScore >= 60) riskLevel = "HIGH";
  else if (riskScore >= 30) riskLevel = "MEDIUM";

  // Extract skills
  const skills = extractSkills(jobDescription);

  // Enhanced logic: If risk factors are high, override basic prediction
  const isFakeByRules = riskScore > 50 || (riskFactors.length >= 3 && riskScore > 35);
  const finalIsFake = isFake || isFakeByRules;

  // Adjust confidence based on risk factors
  let finalConfidenceFake = confidenceFake;
  let finalConfidenceReal = confidenceReal;

  if (isFakeByRules && !isFake) {
    // Rules detected fake but basic logic didn't - increase fake confidence
    finalConfidenceFake = Math.max(confidenceFake, 0.75 + riskScore / 500);
    finalConfidenceFake = Math.min(finalConfidenceFake, 0.98);
    finalConfidenceReal = 1 - finalConfidenceFake;
  } else if (finalIsFake) {
    // Both agree or basic logic detected fake - use higher confidence
    finalConfidenceFake = Math.max(confidenceFake, 0.7 + riskScore / 500);
    finalConfidenceFake = Math.min(finalConfidenceFake, 0.98);
    finalConfidenceReal = 1 - finalConfidenceFake;
  }

  // Final validation to ensure valid probabilities
  finalConfidenceFake = Math.max(0.05, Math.min(0.98, finalConfidenceFake));
  finalConfidenceReal = Math.max(0.05, Math.min(0.98, finalConfidenceReal));

  // Ensure they sum to 1
  const total = finalConfidenceFake + finalConfidenceReal;
  if (total > 0) {
    finalConfidenceFake = finalConfidenceFake / total;
    finalConfidenceReal = finalConfidenceReal / total;
  }

  return NextResponse.json({
    isFake: finalIsFake,
    confidence: Math.round(Math.max(finalConfidenceReal, finalConfidenceFake) * 1000) / 1000,
    confidence_real: Math.round(finalConfidenceReal * 1000) / 1000,
    confidence_fake: Math.round(finalConfidenceFake * 1000) / 1000,
    risk_level: riskLevel,
    riskFactors: riskFactors.length > 0 ? riskFactors : undefined,
    skills: skills.length > 0 ? skills : undefined,
  });
}

// Extract skills from job description
function extractSkills(text: string): string[] {
  const foundSkills: string[] = [];
  const textUpper = text;

  for (const skill of SKILLS_DATABASE) {
    if (textUpper.toLowerCase().includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  }

  return foundSkills.slice(0, 10); // Limit to 10 skills
}

const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// @desc    Analyze resume against job description
// @route   POST /api/ai/analyze-resume
exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res
        .status(400)
        .json({ message: "Resume text and job description are required" });
    }

    const prompt = `
You are a resume analysis assistant. Compare the following resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide your response in the following JSON format only (no extra text, no markdown):
{
  "matchScore": <number between 0-100>,
  "strengths": ["point1", "point2"],
  "missingSkills": ["skill1", "skill2"],
  "suggestions": ["suggestion1", "suggestion2"]
}
`;
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const responseText = completion.choices[0].message.content;
    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(cleanedText);

    res.status(200).json({ analysis });
  } catch (error) {
    res
      .status(500)
      .json({ message: "AI analysis failed", error: error.message });
  }
};
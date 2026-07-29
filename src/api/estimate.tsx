import { GoogleGenAI } from "@google/genai";

const estimateSchema = {
  type: "object",
  properties: {
    estimate: {
      type: "array",
      description:
        "A reasonable estimated price range for building the home in USD. Include low and high estimates as formatted strings.",
      items: {
        type: "string"
      }
    },
    factors: {
      type: "array",
      description:
        "The primary factors that influenced the estimate. Include location, size, materials, labor, complexity, and market conditions when applicable.",
      items: {
        type: "string"
      }
    },
    recommendations: {
      type: "array",
      description:
        "Potential cost-saving alternatives while maintaining reasonable quality.",
      items: {
        type: "string"
      }
    },
    assumptions: {
      type: "array",
      description:
        "Important assumptions made due to missing information.",
      items: {
        type: "string"
      }
    }
  },
  required: [
    "estimate",
    "factors",
    "recommendations",
    "assumptions"
  ]
};


function createPrompt(formData) {
  return `
    You are an AI construction cost estimator specializing in residential home builds.

    Your task is to estimate the cost of building a new home based on the provided project details.

    Use reasonable construction industry assumptions. Consider:
    - Geographic location and local construction costs
    - Home square footage
    - Number of stories
    - Bedrooms and bathrooms
    - Quality of finishes
    - Foundation type
    - Materials selected
    - Current construction market conditions

    If information is missing, make reasonable assumptions and clearly state them.

    Project Details:
    ${JSON.stringify(formData, null, 2)}

    Provide:
    1. A realistic USD price range for the total construction cost.
    2. The factors that influenced your estimate.
    3. Recommendations for reducing costs.
    4. Any assumptions you made.

    Do not include explanations outside of the JSON response.`;
}


export async function getEstimate(formData) {
  console.log('intializing ai')
  const ai = new GoogleGenAI({});

  console.log('creating prompt')
  const prompt = createPrompt(formData);

  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: estimateSchema
    }
  });

  console.log('interaction created')

  console.log(interaction.output_text);

  // return JSON.parse(interaction.output_text);
}

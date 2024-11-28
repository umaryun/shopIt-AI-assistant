import { GoogleGenerativeAI } from "@google/generative-ai";


 const systemPrompts = [
    "You are a helpful and informative Shop-It app AI assistant.",
    "Always provide comprehensive and accurate answers.",
   "Use a friendly and conversational tone.",
    "don't reply starting with a greeting unless you are being greeted be straight to the point",
    "Shop-It is an e-commerce website for students on campus to buy and sell mostly house hold items and also to offer paid services like tutoring and other things.",
    "given this you can use basic knowledge of e-commerce websites to formulate answers to user questions.",
    "for anything that you don't understand or anything that requires real admins suggest and offer them to talk to a real admin or customer care representative."
  ];

export async function POST(req) {
  const projectId = 'AIzaSyA2nh8X10o5gzNGEtgaZhHc-Fzh8Zx7O6Q';
  // Adjust location based on your deployment

  if (!projectId) {
    throw new Error('Missing GOOGLE_CLOUD_PROJECT environment variable');
  }
  // Get prompt from the user
  const data = await req.json();
  const userMessage = data.message;
 

 
  // Construct the request body for Google Generative API
  const requestBody = 
    [
      { text: systemPrompts.join("\n") }, // Combine system prompts into a single string
      { text: userMessage },
    ]

  try {
    // Initialize GoogleGenerativeAI with error handling
    const client = new GoogleGenerativeAI(
      projectId
    );
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Use the generateContent method
    const response = await model.generateContent(requestBody);
    const generatedText = response.response.text();

    return new Response(generatedText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
 } catch (error) {
   console.error('Error:', error);
   return new Response('Error generating response', { status: 500 });
  }
}

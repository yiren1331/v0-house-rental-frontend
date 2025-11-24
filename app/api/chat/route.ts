import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // System prompt for the rental assistant
    const systemPrompt = `You are a helpful AI assistant for a house rental website in Klang Valley, Malaysia. 
Your role is to help users find rental properties, answer questions about listings, provide information about different areas in Klang Valley (KLCC, Petaling Jaya, Shah Alam, Subang Jaya, Mont Kiara, Bangsar, Bukit Bintang, Damansara, Puchong, Cyberjaya, Putrajaya, Klang, Kajang), and assist with rental inquiries.

You should:
- Be friendly and professional
- Provide accurate information about rental properties
- Help users understand the rental process
- Suggest suitable properties based on their needs
- Answer questions about amenities, pricing, and locations
- Use both English and Bahasa Melayu terms when appropriate
- Be concise but helpful

Always respond in the same language the user is using (English or Bahasa Melayu).`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      maxTokens: 500,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("[v0] Error in chat API:", error)
    return Response.json({ message: "Sorry, I encountered an error. Please try again." }, { status: 500 })
  }
}

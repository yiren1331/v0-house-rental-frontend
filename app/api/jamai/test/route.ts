import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.JAMAI_API_KEY
  const projectId = process.env.JAMAI_PROJECT_ID
  const baseUrl = process.env.JAMAI_BASE_URL || "https://api.jamaibase.com"

  console.log("[v0] Testing JamAI credentials...")
  console.log("[v0] API Key length:", apiKey?.length || 0)
  console.log("[v0] API Key prefix:", apiKey ? apiKey.substring(0, 10) : "MISSING")
  console.log("[v0] Project ID:", projectId || "MISSING")
  console.log("[v0] Base URL:", baseUrl)

  if (!apiKey || !projectId) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing credentials",
        details: {
          hasApiKey: !!apiKey,
          hasProjectId: !!projectId,
          apiKeyLength: apiKey?.length || 0,
        },
        instructions: "Please ensure JAMAI_API_KEY and JAMAI_PROJECT_ID are set in your environment variables.",
      },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/gen_tables/action`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-Project-Id": projectId,
        "Content-Type": "application/json",
      },
    })

    let data
    try {
      data = await response.json()
    } catch (e) {
      data = await response.text()
    }

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response data:", JSON.stringify(data, null, 2))

    if (!response.ok) {
      let errorMessage = "Invalid credentials"
      let suggestions = []

      if (response.status === 401) {
        errorMessage = "Authentication failed - Invalid API key or Project ID"
        suggestions = [
          "1. Go to https://cloud.jamaibase.com/",
          "2. Navigate to Settings > API Keys",
          "3. Generate a new API key (or copy existing valid key)",
          "4. Make sure the API key matches the project ID",
          "5. Update JAMAI_API_KEY in your Vercel environment variables",
          "6. Restart your development server to load new variables",
        ]
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          status: response.status,
          details: data,
          suggestions,
          debug: {
            apiKeyPresent: !!apiKey,
            apiKeyLength: apiKey.length,
            projectIdPresent: !!projectId,
            baseUrl,
          },
        },
        { status: response.status },
      )
    }

    console.log("[v0] ✓ Credential test SUCCESS")
    return NextResponse.json({
      success: true,
      message: "✓ JamAI credentials are valid!",
      tables: data.items || [],
      tableCount: data.items?.length || 0,
    })
  } catch (error: any) {
    console.error("[v0] Credential test ERROR:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Connection failed",
        message: error.message,
        suggestions: [
          "Check if JAMAI_BASE_URL is correct (should be https://api.jamaibase.com)",
          "Verify your network connection",
          "Ensure the JamAI service is accessible",
        ],
      },
      { status: 500 },
    )
  }
}

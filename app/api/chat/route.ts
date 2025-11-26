import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(req: Request) {
  console.log("[v0] Chat API: Request received")

  try {
    const { messages } = await req.json()
    console.log("[v0] Chat API: Processing", messages.length, "messages")

    const lastMessage = messages[messages.length - 1]
    const userQuery = lastMessage.content

    console.log("[v0] Chat API: User query:", userQuery)

    const isMalay = /\b(saya|nak|cari|rumah|bilik|harga|murah|dengan|di|hartanah|dekat|ada|ekat|mana)\b/i.test(
      userQuery.toLowerCase(),
    )
    console.log("[v0] Chat API: Detected language:", isMalay ? "Malay" : "English")

    const sql = neon(process.env.DATABASE_URL!)

    let locationFilter = ""
    let bedroomsFilter = 0
    let maxPriceFilter = 0
    let furnishedFilter = ""

    const locations = [
      "KLCC",
      "Bukit Bintang",
      "Mont Kiara",
      "Petaling Jaya",
      "Subang Jaya",
      "Shah Alam",
      "Cheras",
      "Ampang",
      "Setapak",
      "Kepong",
      "Wangsa Maju",
      "Titiwangsa",
      "Sentul",
      "Puchong",
      "Cyberjaya",
      "Putrajaya",
      "Klang",
      "Damansara",
      "Kajang",
      "Bangi",
      "Serdang",
    ]

    for (const loc of locations) {
      if (userQuery.toLowerCase().includes(loc.toLowerCase())) {
        locationFilter = loc
        console.log("[v0] Chat API: Detected location:", locationFilter)
        break
      }
    }

    const bedroomMatch = userQuery.match(/(\d+)\s*(bilik|bedroom|room|bed)/i)
    if (bedroomMatch) {
      bedroomsFilter = Number.parseInt(bedroomMatch[1])
      console.log("[v0] Chat API: Detected bedrooms:", bedroomsFilter)
    }

    const maxPriceMatch = userQuery.match(/(?:bawah|under|below|maksimum|max)\s*(?:RM|rm)?\s*(\d+)/i)
    if (maxPriceMatch) {
      maxPriceFilter = Number.parseInt(maxPriceMatch[1])
      console.log("[v0] Chat API: Detected max price:", maxPriceFilter)
    }

    if (userQuery.match(/fully furnished|lengkap|berperabot lengkap/i)) {
      furnishedFilter = "fully"
    } else if (userQuery.match(/partial|separuh|semi/i)) {
      furnishedFilter = "partial"
    }

    let properties
    if (locationFilter) {
      properties = await sql`
        SELECT id, title, title_ms, location, price, bedrooms, furnished, contact_number
        FROM properties
        WHERE is_available = true
          AND LOWER(location) = ${locationFilter.toLowerCase()}
        ORDER BY created_at DESC
      `
      console.log("[v0] Chat API: Fetched", properties.length, "properties from database for location:", locationFilter)
    } else {
      properties = await sql`
        SELECT id, title, title_ms, location, price, bedrooms, furnished, contact_number
        FROM properties
        WHERE is_available = true
        ORDER BY created_at DESC
        LIMIT 20
      `
      console.log("[v0] Chat API: Fetched", properties.length, "properties from database")
    }

    let filteredProperties = properties

    if (bedroomsFilter > 0) {
      filteredProperties = filteredProperties.filter((p: any) => p.bedrooms === bedroomsFilter)
    }

    if (maxPriceFilter > 0) {
      filteredProperties = filteredProperties.filter((p: any) => Number.parseFloat(p.price) <= maxPriceFilter)
    }

    if (furnishedFilter) {
      filteredProperties = filteredProperties.filter((p: any) => p.furnished === furnishedFilter)
    }

    console.log("[v0] Chat API: Filtered to", filteredProperties.length, "matching properties")

    if (filteredProperties.length === 0) {
      const noResultsMessage = isMalay
        ? `Maaf, tiada hartanah ${locationFilter ? `di ${locationFilter}` : ""} yang sepadan dengan carian anda. Sila cuba dengan kriteria yang berbeza.`
        : `Sorry, no properties ${locationFilter ? `in ${locationFilter}` : ""} match your search. Please try different criteria.`
      return NextResponse.json({ message: noResultsMessage })
    }

    const greeting = isMalay
      ? `Saya jumpa ${filteredProperties.length} hartanah${locationFilter ? ` di ${locationFilter}` : ""} untuk anda:\n\n`
      : `I found ${filteredProperties.length} properties${locationFilter ? ` in ${locationFilter}` : ""} for you:\n\n`

    const propertyList = filteredProperties
      .map((p: any, index: number) => {
        const title = isMalay ? p.title_ms || p.title : p.title
        const furnishedText =
          p.furnished === "fully"
            ? isMalay
              ? "Lengkap"
              : "Fully Furnished"
            : p.furnished === "partial"
              ? isMalay
                ? "Separuh"
                : "Partially Furnished"
              : isMalay
                ? "Tanpa Perabot"
                : "Unfurnished"

        if (isMalay) {
          return `**${index + 1}. ${title}**
📍 Lokasi: ${p.location}
💰 Harga: RM${p.price}/bulan
🛏️ Bilik Tidur: ${p.bedrooms}
🪑 Perabot: ${furnishedText}
📞 Hubungi: ${p.contact_number}

[Lihat Hartanah](/search?title=${encodeURIComponent(p.title)})`
        } else {
          return `**${index + 1}. ${title}**
📍 Location: ${p.location}
💰 Price: RM${p.price}/month
🛏️ Bedrooms: ${p.bedrooms}
🪑 Furnished: ${furnishedText}
📞 Contact: ${p.contact_number}

[View Property](/search?title=${encodeURIComponent(p.title)})`
        }
      })
      .join("\n\n")

    const finalMessage = greeting + propertyList

    return NextResponse.json({ message: finalMessage })
  } catch (error: any) {
    console.error("[v0] Chat API: Error:", error)

    return NextResponse.json(
      {
        message: "Maaf, saya menghadapi masalah teknikal. / Sorry, I encountered a technical error.",
      },
      { status: 500 },
    )
  }
}

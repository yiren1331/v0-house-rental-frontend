"use client"

import { PropertyCard } from "@/components/property-card"
import { useLanguage } from "@/contexts/language-context"

const properties = [
  {
    id: 1,
    title: "Modern KLCC Apartment",
    location: "KLCC, Kuala Lumpur",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    image: "/modern-apartment-klcc-view.jpg",
    contact: "+60 12-345 6789",
    furnished: "fully" as const,
  },
  {
    id: 2,
    title: "Cozy Studio in Bukit Bintang",
    location: "Bukit Bintang, Kuala Lumpur",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    image: "/cozy-studio-apartment-malaysia.jpg",
    contact: "+60 11-222 3333",
    furnished: "fully" as const,
  },
  {
    id: 3,
    title: "Spacious Mont Kiara Condo",
    location: "Mont Kiara, Kuala Lumpur",
    price: 4200,
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    image: "/mont-kiara-luxury-condo.jpg",
    contact: "+60 13-456 7890",
    furnished: "partial" as const,
  },
  {
    id: 4,
    title: "Luxury Bangsar Penthouse",
    location: "Bangsar, Kuala Lumpur",
    price: 7500,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: "/luxury-penthouse-bangsar.jpg",
    contact: "+60 12-987 6543",
    furnished: "fully" as const,
  },
  {
    id: 5,
    title: "Modern PJ Apartment",
    location: "Petaling Jaya, Selangor",
    price: 2200,
    bedrooms: 2,
    bathrooms: 2,
    area: 900,
    image: "/damansara-modern-house.jpg",
    contact: "+60 16-789 0123",
    furnished: "fully" as const,
  },
  {
    id: 6,
    title: "Subang Jaya Family Home",
    location: "Subang Jaya, Selangor",
    price: 3800,
    bedrooms: 4,
    bathrooms: 3,
    area: 1800,
    image: "/ampang-villa-with-pool.jpg",
    contact: "+60 19-234 5678",
    furnished: "unfurnished" as const,
  },
]

export function FeaturedProperties() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24" id="properties">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t("featuredTitle")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">{t("featuredSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  )
}

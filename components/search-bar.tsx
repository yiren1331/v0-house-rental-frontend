"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Users, Banknote, Sofa } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

const klangValleyAreas = [
  "KLCC",
  "Bukit Bintang",
  "Mont Kiara",
  "Bangsar",
  "Damansara",
  "Cheras",
  "Ampang",
  "Wangsa Maju",
  "Setapak",
  "Kepong",
  "Sentul",
  "Titiwangsa",
  "Petaling Jaya",
  "Shah Alam",
  "Subang Jaya",
  "Puchong",
  "Cyberjaya",
  "Putrajaya",
  "Klang",
  "Kajang",
]

export function SearchBar() {
  const { t } = useLanguage()
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [moveInDate, setMoveInDate] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [furnished, setFurnished] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (moveInDate) params.set("moveInDate", moveInDate)
    if (bedrooms) params.set("bedrooms", bedrooms)
    if (furnished && furnished !== "any") params.set("furnished", furnished)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <Card className="p-6 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {t("location")}
          </label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t("locationPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {klangValleyAreas.map((area) => (
                <SelectItem key={area} value={area.toLowerCase()}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Banknote className="h-4 w-4 text-muted-foreground" />
            {t("minPrice")}
          </label>
          <Input
            type="number"
            placeholder="1000"
            min="0"
            step="100"
            className="h-12"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Banknote className="h-4 w-4 text-muted-foreground" />
            {t("maxPrice")}
          </label>
          <Input
            type="number"
            placeholder="5000"
            min="0"
            step="100"
            className="h-12"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {t("moveInDate")}
          </label>
          <Input type="date" className="h-12" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            {t("bedrooms")}
          </label>
          <Input
            type="number"
            placeholder={t("bedroomsPlaceholder")}
            min="1"
            className="h-12"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sofa className="h-4 w-4 text-muted-foreground" />
            {t("furnished")}
          </label>
          <Select value={furnished} onValueChange={setFurnished}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t("furnishedPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("furnishedPlaceholder")}</SelectItem>
              <SelectItem value="fully">{t("fullyFurnished")}</SelectItem>
              <SelectItem value="partial">{t("partiallyFurnished")}</SelectItem>
              <SelectItem value="unfurnished">{t("unfurnished")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end md:col-span-2 lg:col-span-3">
          <Button onClick={handleSearch} className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
            <Search className="h-5 w-5 mr-2" />
            {t("search")}
          </Button>
        </div>
      </div>
    </Card>
  )
}

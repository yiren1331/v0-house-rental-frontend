"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Calendar, Users, Banknote, Sofa } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

  return (
    <Card className="p-6 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {t("location")}
          </label>
          <Select>
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
          <Input type="number" placeholder="1000" min="0" step="100" className="h-12" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Banknote className="h-4 w-4 text-muted-foreground" />
            {t("maxPrice")}
          </label>
          <Input type="number" placeholder="5000" min="0" step="100" className="h-12" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {t("moveInDate")}
          </label>
          <Input type="date" className="h-12" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            {t("bedrooms")}
          </label>
          <Input type="number" placeholder={t("bedroomsPlaceholder")} min="1" className="h-12" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Sofa className="h-4 w-4 text-muted-foreground" />
            {t("furnished")}
          </label>
          <Select>
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
          <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
            <Search className="h-5 w-5 mr-2" />
            {t("search")}
          </Button>
        </div>
      </div>
    </Card>
  )
}

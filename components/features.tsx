"use client"

import { Shield, Clock, CheckCircle, Home } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: CheckCircle,
      titleKey: "verifiedListings",
      descKey: "verifiedDesc",
    },
    {
      icon: Home,
      titleKey: "easyBooking",
      descKey: "easyBookingDesc",
    },
    {
      icon: Clock,
      titleKey: "support",
      descKey: "supportDesc",
    },
    {
      icon: Shield,
      titleKey: "flexibleTerms",
      descKey: "flexibleTermsDesc",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{t("whyChooseUs")}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">{t("whyChooseSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.titleKey} className="text-center border-border/50">
                <CardContent className="pt-8 pb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm text-pretty">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

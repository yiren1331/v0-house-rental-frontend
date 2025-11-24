"use client"

import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
          {t("heroTitle1")}
          <span className="text-primary block mt-2">{t("heroTitle2")}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{t("heroSubtitle")}</p>
      </div>
    </section>
  )
}

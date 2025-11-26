import { HeroSection } from "@/components/hero-section"
import { SearchBar } from "@/components/search-bar"
import { FeaturedProperties } from "@/components/featured-properties"
import { Features } from "@/components/features"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <SearchBar />
      </div>
      <FeaturedProperties />
      <Features />
      <Footer />
    </main>
  )
}

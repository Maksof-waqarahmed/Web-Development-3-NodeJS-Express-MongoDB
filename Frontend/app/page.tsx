import Header from "@/components/Header"
import ProductGrid from "@/components/ProductGrid"
import { Suspense } from "react"

export const metadata = {
  title: "ShopHub - E-Commerce Store",
  description: "Browse our collection of quality products",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to ShopHub</h1>
          <p className="text-muted-foreground">Discover amazing products at great prices</p>
        </div>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  )
}

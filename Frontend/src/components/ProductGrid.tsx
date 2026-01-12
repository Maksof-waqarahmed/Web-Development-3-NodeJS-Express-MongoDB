"use client"
import { products } from "../data/products"
import ProductCard from "./ProductCard"

interface ProductGridProps {
  searchQuery: string
  selectedCategory: string
  onSelectProduct: (product: any) => void
}

export default function ProductGrid({ searchQuery, selectedCategory, onSelectProduct }: ProductGridProps) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <div className="mb-6">
        <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  )
}

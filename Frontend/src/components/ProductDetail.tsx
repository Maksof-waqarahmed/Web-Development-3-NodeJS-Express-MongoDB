"use client"

import { ArrowLeft, ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

interface ProductDetailProps {
  product: any
  onBack: () => void
  onAddToCart: (product: any) => void
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-muted rounded-lg overflow-hidden h-96 md:h-auto flex items-center justify-center">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">{product.category}</p>
            <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-semibold text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="border-t border-b border-border py-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="text-sm text-green-600 font-semibold">In Stock</p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <p className="font-semibold text-foreground mb-2">Key Features:</p>
              {product.features?.map((feature: string, i: number) => (
                <p key={i} className="text-muted-foreground">
                  • {feature}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
              >
                −
              </button>
              <span className="px-6 py-2 border-l border-r border-border text-foreground font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                onAddToCart({ ...product, quantity })
                onBack()
              }}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            <button className="p-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

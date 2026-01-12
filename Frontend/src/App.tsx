"use client"

import { useState } from "react"
import Header from "./components/Header"
import ProductGrid from "./components/ProductGrid"
import Cart from "./components/Cart"
import ProductDetail from "./components/ProductDetail"
import "./App.css"

export default function App() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showCart, setShowCart] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const addToCart = (product: any) => {
    const existing = cartItems.find((item) => item.id === product.id)
    if (existing) {
      setCartItems(cartItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(!showCart)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} />
          ) : (
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex gap-8 mb-8">
                {/* Filters */}
                <div className="w-48 flex-shrink-0">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
                  <div className="space-y-2">
                    {["all", "electronics", "clothing", "books", "home"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors ${
                          selectedCategory === cat
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Products */}
                <div className="flex-1">
                  <ProductGrid
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    onSelectProduct={setSelectedProduct}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Sidebar */}
        {showCart && <Cart items={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />}
      </div>
    </div>
  )
}

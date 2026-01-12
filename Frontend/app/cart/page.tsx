"use client"

import { ShoppingBag, ArrowRight, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const router = useRouter()
  const { user } = useAuth()

  const tax = total * 0.1
  const finalTotal = total + tax

  const handleCheckout = () => {
    if (!user) {
      router.push("/login")
      return
    }
    if (items.length === 0) {
      return
    }
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="text-primary hover:text-primary/80 mb-8 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <ShoppingBag className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4 mx-auto opacity-50" />
            <p className="text-muted-foreground text-lg mb-4">Your cart is empty</p>
            <Link href="/" className="text-primary hover:text-primary/80 font-semibold">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                    <p className="text-primary font-bold">${item.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-2 py-1 text-foreground hover:bg-muted"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 text-foreground font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 text-foreground hover:bg-muted"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

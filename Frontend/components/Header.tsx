"use client"

import { ShoppingCart, Search, LogIn, UserIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-foreground">ShopHub</h1>
        </Link>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              {user.profileImage ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                  <Image src={user.profileImage || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <span className="text-sm font-medium text-foreground hidden sm:inline max-w-[100px] truncate">
                {user.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useOrders } from "@/context/OrderContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const { user } = useAuth()
  const { getOrdersByUserId } = useOrders()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const userOrders = getOrdersByUserId(user.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="text-primary hover:text-primary/80 mb-8 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <Package className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        </div>

        {userOrders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="w-16 h-16 text-muted-foreground mb-4 mx-auto opacity-50" />
              <p className="text-muted-foreground text-lg mb-4">No orders yet</p>
              <Link href="/" className="text-primary hover:text-primary/80 font-semibold">
                Start Shopping
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">${order.total.toFixed(2)}</div>
                      <div
                        className={`text-sm font-semibold capitalize ${
                          order.status === "completed" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Payment: {order.paymentMethod}</p>
                    {order.stripePaymentId && (
                      <p className="text-sm text-muted-foreground">Payment ID: {order.stripePaymentId}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

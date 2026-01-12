"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Order {
  id: string
  userId: string
  items: any[]
  total: number
  status: "pending" | "completed" | "cancelled"
  paymentMethod: string
  createdAt: string
  stripePaymentId?: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void
  getOrdersByUserId: (userId: string) => Order[]
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (orderData: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    setOrders((prevOrders) => [newOrder, ...prevOrders])
  }

  const getOrdersByUserId = (userId: string) => {
    return orders.filter((order) => order.userId === userId)
  }

  return <OrderContext.Provider value={{ orders, addOrder, getOrdersByUserId }}>{children}</OrderContext.Provider>
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}

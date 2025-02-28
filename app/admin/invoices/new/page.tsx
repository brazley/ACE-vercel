"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function NewInvoicePage() {
  const router = useRouter()
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }])
  const [salesTax, setSalesTax] = useState(false)
  const [deposit, setDeposit] = useState(0)

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const taxAmount = salesTax ? subtotal * 0.1 : 0 // Assuming 10% sales tax
    return subtotal + taxAmount - deposit
  }

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }])
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Implement invoice submission logic here
    console.log("Invoice submitted:", { items, salesTax, deposit })
    router.push("/admin/dashboard")
  }

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">New Invoice</h1>
          <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select required>
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client1">Client 1</SelectItem>
                      <SelectItem value="client2">Client 2</SelectItem>
                      <SelectItem value="client3">Client 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Select required>
                    <SelectTrigger id="project">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project1">Project 1</SelectItem>
                      <SelectItem value="project2">Project 2</SelectItem>
                      <SelectItem value="project3">Project 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional notes" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          placeholder="Item description"
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value))}
                          min={1}
                          required
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, "price", Number.parseFloat(e.target.value))}
                          min={0}
                          step={0.01}
                          required
                        />
                      </TableCell>
                      <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" variant="outline" onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <div className="flex items-center space-x-2">
                <Switch id="sales-tax" checked={salesTax} onCheckedChange={setSalesTax} />
                <Label htmlFor="sales-tax">Apply Sales Tax (10%)</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit Amount</Label>
                <Input
                  id="deposit"
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number.parseFloat(e.target.value))}
                  min={0}
                  step={0.01}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
                {salesTax && <p>Tax: ${(calculateSubtotal() * 0.1).toFixed(2)}</p>}
                {deposit > 0 && <p>Deposit: ${deposit.toFixed(2)}</p>}
                <p className="font-bold">Total: ${calculateTotal().toFixed(2)}</p>
              </div>
              <Button type="submit">Create Invoice</Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Layout>
  )
}


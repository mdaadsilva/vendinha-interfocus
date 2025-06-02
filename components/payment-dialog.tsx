"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Debt } from "./dashboard"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  debt: Debt
  onUpdatePayment: (debtId: string, newPaidValue: number) => void
}

export function PaymentDialog({ open, onOpenChange, debt, onUpdatePayment }: PaymentDialogProps) {
  const [paymentAmount, setPaymentAmount] = useState("")
  const [isAdditional, setIsAdditional] = useState(true)

  const remainingAmount = debt.totalValue - debt.paidValue

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number.parseFloat(paymentAmount)
    if (isNaN(amount) || amount <= 0) {
      alert("Digite um valor válido!")
      return
    }

    let newPaidValue: number

    if (isAdditional) {
      newPaidValue = debt.paidValue + amount
    } else {
      newPaidValue = amount
    }

    if (newPaidValue > debt.totalValue) {
      alert("O valor pago não pode ser maior que o valor total da dívida!")
      return
    }

    onUpdatePayment(debt.id, newPaidValue)
    setPaymentAmount("")
  }

  const handleQuickPay = (amount: number) => {
    if (isAdditional) {
      const newTotal = debt.paidValue + amount
      if (newTotal <= debt.totalValue) {
        onUpdatePayment(debt.id, newTotal)
      }
    } else {
      if (amount <= debt.totalValue) {
        onUpdatePayment(debt.id, amount)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Pagamento</DialogTitle>
          <DialogDescription>
            Cliente: {debt.name} - CPF: {debt.cpf}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Valor Total:</span>
              <span className="font-semibold">R$ {debt.totalValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Já Pago:</span>
              <span className="font-semibold text-green-600">R$ {debt.paidValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm text-gray-600">Restante:</span>
              <span className="font-semibold text-red-600">R$ {remainingAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={isAdditional ? "default" : "outline"}
                onClick={() => setIsAdditional(true)}
                size="sm"
                className="flex-1"
              >
                Pagamento Adicional
              </Button>
              <Button
                type="button"
                variant={!isAdditional ? "default" : "outline"}
                onClick={() => setIsAdditional(false)}
                size="sm"
                className="flex-1"
              >
                Definir Total Pago
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment">{isAdditional ? "Valor do Pagamento" : "Total Pago"}</Label>
                <Input
                  id="payment"
                  type="number"
                  step="0.01"
                  min="0"
                  max={isAdditional ? remainingAmount : debt.totalValue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Confirmar
                </Button>
              </div>
            </form>

            {isAdditional && remainingAmount > 0 && (
              <div className="space-y-2">
                <Label className="text-sm">Pagamentos Rápidos:</Label>
                <div className="flex gap-2 flex-wrap">
                  {remainingAmount >= 10 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => handleQuickPay(10)}>
                      R$ 10,00
                    </Button>
                  )}
                  {remainingAmount >= 20 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => handleQuickPay(20)}>
                      R$ 20,00
                    </Button>
                  )}
                  {remainingAmount >= 50 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => handleQuickPay(50)}>
                      R$ 50,00
                    </Button>
                  )}
                  <Button type="button" variant="outline" size="sm" onClick={() => handleQuickPay(remainingAmount)}>
                    Quitar (R$ {remainingAmount.toFixed(2)})
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Phone, Calendar, FileText } from "lucide-react"
import type { Debt } from "./dashboard"

interface DebtListProps {
  debts: Debt[]
  onPayment: (debt: Debt) => void
}

export function DebtList({ debts, onPayment }: DebtListProps) {
  if (debts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma dívida encontrada</h3>
          <p className="text-gray-500 text-center">
            Não há dívidas cadastradas ou que correspondam aos filtros aplicados.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {debts.map((debt) => (
        <Card key={debt.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{debt.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        CPF: {debt.cpf}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {debt.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {debt.month}
                      </span>
                    </div>
                  </div>
                  <Badge variant={debt.status === "QUITADA" ? "default" : "destructive"}>{debt.status}</Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Valor Total:</span>
                    <div className="font-semibold text-lg">R$ {debt.totalValue.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Valor Pago:</span>
                    <div className="font-semibold text-lg text-green-600">R$ {debt.paidValue.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Restante:</span>
                    <div className="font-semibold text-lg text-red-600">
                      R$ {(debt.totalValue - debt.paidValue).toFixed(2)}
                    </div>
                  </div>
                </div>

                {debt.observation && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-sm text-gray-600">Observação:</span>
                    <p className="text-sm mt-1">{debt.observation}</p>
                  </div>
                )}
              </div>

              {debt.status === "PENDENTE" && (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={() => onPayment(debt)} size="sm">
                    Registrar Pagamento
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

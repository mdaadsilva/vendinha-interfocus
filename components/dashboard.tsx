"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DebtForm } from "@/components/debt-form"
import { DebtList } from "@/components/debt-list"
import { PaymentDialog } from "@/components/payment-dialog"
import { ReportDialog } from "@/components/report-dialog"
import { Store, Plus, LogOut, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export interface Debt {
  id: string
  name: string
  cpf: string
  phone: string
  totalValue: number
  paidValue: number
  month: string
  observation: string
  status: "PENDENTE" | "QUITADA"
  createdAt: Date
}

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [debts, setDebts] = useState<Debt[]>([])
  const [filteredDebts, setFilteredDebts] = useState<Debt[]>([])
  const [searchCpf, setSearchCpf] = useState("")
  const [filterMonth, setFilterMonth] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showDebtForm, setShowDebtForm] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Carregar dados do localStorage
  useEffect(() => {
    const savedDebts = localStorage.getItem("vendinha-debts")
    if (savedDebts) {
      const parsedDebts = JSON.parse(savedDebts).map((debt: any) => ({
        ...debt,
        createdAt: new Date(debt.createdAt),
      }))
      setDebts(parsedDebts)
    }
  }, [])

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem("vendinha-debts", JSON.stringify(debts))
  }, [debts])

  // Aplicar filtros
  useEffect(() => {
    let filtered = debts

    if (searchCpf) {
      filtered = filtered.filter((debt) => debt.cpf.includes(searchCpf))
    }

    if (filterMonth !== "all") {
      filtered = filtered.filter((debt) => debt.month === filterMonth)
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((debt) => debt.status === filterStatus)
    }

    setFilteredDebts(filtered)
  }, [debts, searchCpf, filterMonth, filterStatus])

  const addDebt = (newDebt: Omit<Debt, "id" | "status" | "createdAt">) => {
    // Verificar se já existe dívida para o CPF no mês
    const existingDebt = debts.find((debt) => debt.cpf === newDebt.cpf && debt.month === newDebt.month)

    if (existingDebt) {
      alert("Já existe uma dívida para este CPF no mês selecionado!")
      return false
    }

    const debt: Debt = {
      ...newDebt,
      id: Date.now().toString(),
      status: newDebt.paidValue >= newDebt.totalValue ? "QUITADA" : "PENDENTE",
      createdAt: new Date(),
    }

    setDebts((prev) => [...prev, debt])
    setShowDebtForm(false)
    return true
  }

  const updatePayment = (debtId: string, newPaidValue: number) => {
    setDebts((prev) =>
      prev.map((debt) => {
        if (debt.id === debtId) {
          const updatedDebt = {
            ...debt,
            paidValue: newPaidValue,
            status: newPaidValue >= debt.totalValue ? ("QUITADA" as const) : ("PENDENTE" as const),
          }
          return updatedDebt
        }
        return debt
      }),
    )
    setShowPaymentDialog(false)
    setSelectedDebt(null)
  }

  const deleteDebtsByCpf = (cpf: string) => {
    setDebts((prev) => prev.filter((debt) => debt.cpf !== cpf))
    setShowDeleteDialog(false)
    setDeleteConfirm("")
  }

  const handleDeleteClick = () => {
    if (deleteConfirm) {
      deleteDebtsByCpf(deleteConfirm)
    }
  }

  const clearFilters = () => {
    setSearchCpf("")
    setFilterMonth("all")
    setFilterStatus("all")
  }

  const totalPending = filteredDebts.filter((debt) => debt.status === "PENDENTE").length
  const totalPaid = filteredDebts.filter((debt) => debt.status === "QUITADA").length
  const totalValue = filteredDebts.reduce((sum, debt) => sum + debt.totalValue, 0)
  const totalReceived = filteredDebts.reduce((sum, debt) => sum + debt.paidValue, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Store className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema Vendinha</h1>
                <p className="text-sm text-gray-500">Controle de Dívidas</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Dívidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredDebts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalPending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Quitadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalPaid}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalValue.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Recebido: R$ {totalReceived.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por CPF..."
                  value={searchCpf}
                  onChange={(e) => setSearchCpf(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filtrar por mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  <SelectItem value="01/2025">Janeiro 2025</SelectItem>
                  <SelectItem value="02/2025">Fevereiro 2025</SelectItem>
                  <SelectItem value="03/2025">Março 2025</SelectItem>
                  <SelectItem value="04/2025">Abril 2025</SelectItem>
                  <SelectItem value="05/2025">Maio 2025</SelectItem>
                  <SelectItem value="06/2025">Junho 2025</SelectItem>
                  <SelectItem value="07/2025">Julho 2025</SelectItem>
                  <SelectItem value="08/2025">Agosto 2025</SelectItem>
                  <SelectItem value="09/2025">Setembro 2025</SelectItem>
                  <SelectItem value="10/2025">Outubro 2025</SelectItem>
                  <SelectItem value="11/2025">Novembro 2025</SelectItem>
                  <SelectItem value="12/2025">Dezembro 2025</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                  <SelectItem value="QUITADA">Quitada</SelectItem>
                </SelectContent>
              </Select>
              {(searchCpf || filterMonth !== "all" || filterStatus !== "all") && (
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <ReportDialog debts={filteredDebts} />
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir por CPF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Excluir Dívidas por CPF</DialogTitle>
                    <DialogDescription>
                      Digite o CPF para excluir todas as dívidas relacionadas. Esta ação não pode ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Digite o CPF (apenas números)"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value.replace(/\D/g, ""))}
                      maxLength={11}
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowDeleteDialog(false)} className="flex-1">
                        Cancelar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteClick}
                        disabled={deleteConfirm.length !== 11}
                        className="flex-1"
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={() => setShowDebtForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Dívida
              </Button>
            </div>
          </div>
        </div>

        {/* Debt List */}
        <DebtList
          debts={filteredDebts}
          onPayment={(debt) => {
            setSelectedDebt(debt)
            setShowPaymentDialog(true)
          }}
        />

        {/* Dialogs */}
        <DebtForm open={showDebtForm} onOpenChange={setShowDebtForm} onSubmit={addDebt} />

        {selectedDebt && (
          <PaymentDialog
            open={showPaymentDialog}
            onOpenChange={setShowPaymentDialog}
            debt={selectedDebt}
            onUpdatePayment={updatePayment}
          />
        )}
      </div>
    </div>
  )
}

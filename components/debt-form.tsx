"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Debt } from "./dashboard"

interface DebtFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (debt: Omit<Debt, "id" | "status" | "createdAt">) => boolean
}

export function DebtForm({ open, onOpenChange, onSubmit }: DebtFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    totalValue: "",
    paidValue: "",
    month: "",
    observation: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.cpf.length !== 11) {
      alert("CPF deve ter 11 dígitos!")
      return
    }

    const success = onSubmit({
      name: formData.name,
      cpf: formData.cpf,
      phone: formData.phone,
      totalValue: Number.parseFloat(formData.totalValue),
      paidValue: Number.parseFloat(formData.paidValue) || 0,
      month: formData.month,
      observation: formData.observation,
    })

    if (success) {
      setFormData({
        name: "",
        cpf: "",
        phone: "",
        totalValue: "",
        paidValue: "",
        month: "",
        observation: "",
      })
    }
  }

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.slice(0, 11)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.slice(0, 11)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Dívida</DialogTitle>
          <DialogDescription>Cadastre uma nova dívida de cliente</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Cliente</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF (11 dígitos)</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => setFormData((prev) => ({ ...prev, cpf: formatCpf(e.target.value) }))}
              placeholder="12345678901"
              maxLength={11}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }))}
              placeholder="11999999999"
              maxLength={11}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalValue">Valor Total</Label>
              <Input
                id="totalValue"
                type="number"
                step="0.01"
                min="0"
                value={formData.totalValue}
                onChange={(e) => setFormData((prev) => ({ ...prev, totalValue: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paidValue">Valor Pago</Label>
              <Input
                id="paidValue"
                type="number"
                step="0.01"
                min="0"
                value={formData.paidValue}
                onChange={(e) => setFormData((prev) => ({ ...prev, paidValue: e.target.value }))}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Mês</Label>
            <Select
              value={formData.month}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, month: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="observation">Observações</Label>
            <Textarea
              id="observation"
              value={formData.observation}
              onChange={(e) => setFormData((prev) => ({ ...prev, observation: e.target.value }))}
              placeholder="Observações sobre a dívida..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Cadastrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

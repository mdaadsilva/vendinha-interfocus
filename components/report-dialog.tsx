"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download } from "lucide-react"
import type { Debt } from "./dashboard"

interface ReportDialogProps {
  debts: Debt[]
}

export function ReportDialog({ debts }: ReportDialogProps) {
  const [open, setOpen] = useState(false)

  const generateReport = () => {
    const totalValue = debts.reduce((sum, debt) => sum + debt.totalValue, 0)
    const totalPaid = debts.reduce((sum, debt) => sum + debt.paidValue, 0)
    const totalPending = debts.filter((debt) => debt.status === "PENDENTE").length
    const totalPaidCount = debts.filter((debt) => debt.status === "QUITADA").length

    let reportContent = `RELATÓRIO DE DÍVIDAS - SISTEMA VENDINHA\n`
    reportContent += `Gerado em: ${new Date().toLocaleString("pt-BR")}\n`
    reportContent += `${"=".repeat(60)}\n\n`

    reportContent += `RESUMO GERAL:\n`
    reportContent += `Total de Dívidas: ${debts.length}\n`
    reportContent += `Dívidas Pendentes: ${totalPending}\n`
    reportContent += `Dívidas Quitadas: ${totalPaidCount}\n`
    reportContent += `Valor Total: R$ ${totalValue.toFixed(2)}\n`
    reportContent += `Valor Recebido: R$ ${totalPaid.toFixed(2)}\n`
    reportContent += `Valor Pendente: R$ ${(totalValue - totalPaid).toFixed(2)}\n\n`

    reportContent += `${"=".repeat(60)}\n\n`
    reportContent += `DETALHAMENTO DAS DÍVIDAS:\n\n`

    debts.forEach((debt, index) => {
      reportContent += `${index + 1}. ${debt.name}\n`
      reportContent += `   CPF: ${debt.cpf}\n`
      reportContent += `   Telefone: ${debt.phone}\n`
      reportContent += `   Mês: ${debt.month}\n`
      reportContent += `   Valor Total: R$ ${debt.totalValue.toFixed(2)}\n`
      reportContent += `   Valor Pago: R$ ${debt.paidValue.toFixed(2)}\n`
      reportContent += `   Valor Restante: R$ ${(debt.totalValue - debt.paidValue).toFixed(2)}\n`
      reportContent += `   Status: ${debt.status}\n`
      if (debt.observation) {
        reportContent += `   Observação: ${debt.observation}\n`
      }
      reportContent += `   Cadastrado em: ${debt.createdAt.toLocaleString("pt-BR")}\n`
      reportContent += `\n`
    })

    return reportContent
  }

  const downloadReport = () => {
    const content = generateReport()
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `relatorio-dividas-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-2" />
          Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Relatório de Dívidas</DialogTitle>
          <DialogDescription>Visualize e baixe o relatório completo das dívidas</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">{generateReport()}</pre>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Fechar
            </Button>
            <Button onClick={downloadReport} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

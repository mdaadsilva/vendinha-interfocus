"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Store, AlertCircle } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [recoveryWord, setRecoveryWord] = useState("")
  const [showRecovery, setShowRecovery] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      onLogin()
    } else {
      setError("Senha incorreta!")
    }
  }

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault()
    if (recoveryWord === "vendinha") {
      alert("Senha: admin123")
      setShowRecovery(false)
      setRecoveryWord("")
    } else {
      alert("Palavra secreta incorreta!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Store className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Sistema Vendinha</CardTitle>
          <CardDescription>Controle de Dívidas de Clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Dialog open={showRecovery} onOpenChange={setShowRecovery}>
              <DialogTrigger asChild>
                <Button variant="link" className="text-sm">
                  Esqueci minha senha
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Recuperar Senha</DialogTitle>
                  <DialogDescription>Digite a palavra secreta para recuperar sua senha</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleRecovery} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recovery">Palavra Secreta</Label>
                    <Input
                      id="recovery"
                      type="text"
                      placeholder="Digite a palavra secreta"
                      value={recoveryWord}
                      onChange={(e) => setRecoveryWord(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Recuperar
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">Respostas Enviadas com Sucesso!</h1>

        <Card className="p-8 text-left">
          <p className="text-foreground/90 mb-4 leading-relaxed">
            Muito obrigado por participar desta pesquisa acadêmica. Suas respostas são extremamente importantes para o
            desenvolvimento deste estudo.
          </p>

          <p className="text-foreground/90 mb-4 leading-relaxed">
            Os dados coletados contribuirão para uma melhor compreensão sobre as percepções e motivações relacionadas ao
            uso de medicamentos antidiabéticos por indivíduos não diabéticos.
          </p>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Pesquisador Responsável:</strong> Daniel Gustavo dos Reis
            </p>
            <p className="text-sm text-muted-foreground mt-2">Centro Universitário de Adamantina (FAI)</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface ConsentPageProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export function ConsentPage({ formData, updateFormData, onNext }: ConsentPageProps) {
  const [error, setError] = useState("")

  const handleSubmit = () => {
    if (!formData.consentAccepted) {
      setError("Você precisa aceitar os termos para continuar")
      return
    }
    setError("")
    onNext()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pesquisa Acadêmica</h1>
        <p className="text-muted-foreground">Centro Universitário de Adamantina (FAI)</p>
      </div>

      <Card className="p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Termo de Consentimento Livre e Esclarecido (TCLE)</h2>

        <div className="space-y-4 text-sm text-foreground/90 leading-relaxed max-h-[400px] overflow-y-auto pr-2">
          <p className="font-semibold text-base">
            Título do Estudo: PERCEPÇÕES E MOTIVAÇÕES POR TRÁS DO USO DE ANTIDIABÉTICOS POR INDIVÍDUOS NÃO DIABÉTICOS NA
            BUSCA POR EMAGRECIMENTO
          </p>

          <p>
            <strong>Pesquisador Responsável:</strong> Daniel Gustavo dos Reis
          </p>

          <p>
            O (A) Senhor (a) está sendo convidado (a) a participar de uma pesquisa. Por favor, leia este documento com
            bastante atenção antes de assiná-lo.
          </p>

          <p>
            <strong>Objetivo da pesquisa:</strong> Analisar por meio de levantamento de dados a compreensão de
            indivíduos saudáveis, não diabéticos, sobre o uso de medicamentos antidiabéticos com finalidade de
            emagrecimento.
          </p>

          <div>
            <p className="font-semibold mb-2">Se o(a) Sr.(a) aceitar participar da pesquisa:</p>
            <p>Você vai responder a um questionário online com 19 perguntas:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>6 sobre seu perfil (como idade e gênero)</li>
              <li>5 sobre o que você sabe e pensa sobre medicamentos para diabetes usados para emagrecimento</li>
              <li>8 sobre motivações, influência das redes sociais e satisfação com o corpo</li>
            </ul>
            <p className="mt-2">Leva em média 10 a 15 minutos para responder.</p>
          </div>

          <p>
            <strong>Riscos:</strong> Possível desconforto emocional ou constrangimento. O questionário foi elaborado de
            forma ética e respeitosa, garantindo o sigilo das informações.
          </p>

          <p>
            <strong>Benefícios:</strong> Contribuição social e científica ao investigar as motivações relacionadas ao
            uso de medicamentos antidiabéticos por indivíduos saudáveis.
          </p>

          <p>
            Sua participação é <strong>totalmente voluntária</strong>. Não há nenhum tipo de pagamento e você não terá
            nenhum custo.
          </p>

          <p>
            <strong>Contato dos pesquisadores:</strong>
          </p>
          <ul className="list-none ml-4">
            <li>Daniel Gustavo dos Reis: (18) 99626-3139</li>
            <li>Lorena Santos Danta: (18) 99660-7148</li>
            <li>Niegge Caroline Rodrigues: (18) 99600-6837</li>
          </ul>
        </div>
      </Card>

      <Card className="p-6 mb-6 border-2 border-primary/20">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={formData.consentAccepted}
            onCheckedChange={(checked) => {
              updateFormData({ consentAccepted: checked })
              setError("")
            }}
            className="mt-1"
          />
          <label htmlFor="consent" className="text-sm font-medium leading-relaxed cursor-pointer">
            Li e aceito os termos do Termo de Consentimento Livre e Esclarecido. Concordo em participar do estudo
            intitulado: "PERCEPÇÕES E MOTIVAÇÕES POR TRÁS DO USO DE ANTIDIABÉTICOS POR INDIVÍDUOS NÃO DIABÉTICOS NA
            BUSCA POR EMAGRECIMENTO".
          </label>
        </div>
        {error && <p className="text-sm text-destructive mt-3 ml-8">{error}</p>}
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          Continuar
        </Button>
      </div>

      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-1 rounded-full bg-primary"></div>
          <div className="w-8 h-1 rounded-full bg-muted"></div>
          <div className="w-8 h-1 rounded-full bg-muted"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Página 1 de 3</p>
      </div>
    </div>
  )
}

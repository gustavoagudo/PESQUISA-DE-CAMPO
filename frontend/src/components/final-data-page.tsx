"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { FileQuestion, ArrowLeft, Loader2 } from "lucide-react"
import { submitForm, type FormSubmitData } from "@/services/api" // Ajuste o caminho conforme sua estrutura
import { toast } from "sonner" // ou use seu sistema de toast preferido

interface FinalDataPageProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function FinalDataPage({ formData, updateFormData, onNext, onBack }: FinalDataPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Mapear os dados do formulário para o formato do backend
  const mapFormDataToAPI = (): FormSubmitData => {
    return {
      email: formData.email || "",
      faixaEtaria: formData.ageRange || "",
      genero: formData.gender === "outro" ? formData.genderOther : formData.gender || "",
      matriculadoFAI: formData.enrolled || "",
      curso: formData.course || "",
      possuiDiabetes: formData.hasDiabetes || "",
      tipoDiabetes:
        formData.diabetesType === "outro" ? formData.diabetesTypeOther : formData.diabetesType || "",
      insatisfeitoCorpo: formData.bodyDissatisfaction || "",
      seConsidera: formData.selfPerception || "",
      complicacoes: formData.complications || "",
      descricaoComplicacoes: formData.complicationsDescription || "",
      metodosEmagrecimento: formData.weightLossMethods
        ? (Array.isArray(formData.weightLossMethods)
            ? formData.weightLossMethods.join(", ")
            : formData.weightLossMethods)
        : "",
      metodoDeuCerto: formData.methodWorked || "",
      utilizouAntidiabeticos: formData.usedAntidiabetics || "",
      considerariaUtilizar: formData.wouldConsider || "",
      motivoNaoUtilizacao: formData.reasonNotToUse || "",
      utilizariaSemReceita: formData.withoutPrescription || "",
      primeiroContato: formData.firstContact || "",
      cienciaEfeitosAdversos: formData.awareOfSideEffects || "",
      efeitosAdversosSentidos: formData.sideEffectsExperienced
        ? (Array.isArray(formData.sideEffectsExperienced)
            ? formData.sideEffectsExperienced.join(", ")
            : formData.sideEffectsExperienced)
        : "",
    }
  }

  const handleSubmit = async () => {
    // Validação básica
    if (!formData.weightLossMethods || !formData.usedAntidiabetics || !formData.withoutPrescription) {
      setError("Por favor, responda todas as questões obrigatórias")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const apiData = mapFormDataToAPI()
      
      console.log("Enviando dados:", apiData) // Para debug

      await submitForm(apiData)

      // Sucesso! Ir para página de sucesso
      toast.success("Formulário enviado com sucesso!")
      onNext()
    } catch (err) {
      console.error("Erro ao enviar:", err)
      const errorMessage = err instanceof Error ? err.message : "Erro ao enviar formulário. Tente novamente."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed =
    formData.weightLossMethods && formData.usedAntidiabetics && formData.withoutPrescription

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <FileQuestion className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Questões Finais</h1>
        <p className="text-muted-foreground">Última etapa da pesquisa</p>
      </div>

      {error && (
        <Card className="p-4 mb-6 bg-destructive/10 border-destructive">
          <p className="text-sm text-destructive flex items-center gap-2">
            <span>⚠️</span> {error}
          </p>
        </Card>
      )}

      <div className="space-y-6">
        {/* Question 11 - Weight Loss Methods */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            11. Você já utilizou os seguintes métodos para emagrecimento? *
          </Label>
          <div className="space-y-3">
            {[
              { value: "dieta", label: "Dieta restritiva" },
              { value: "exercicios", label: "Exercícios físicos" },
              { value: "medicamentos", label: "Medicamentos para emagrecer" },
              { value: "cirurgia", label: "Cirurgia bariátrica" },
              { value: "nenhum", label: "Nenhum dos anteriores" },
            ].map((method) => (
              <div key={method.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`method-${method.value}`}
                  checked={formData.weightLossMethods?.includes(method.value)}
                  onCheckedChange={(checked) => {
                    const current = formData.weightLossMethods || []
                    if (checked) {
                      updateFormData({ weightLossMethods: [...current, method.value] })
                    } else {
                      updateFormData({
                        weightLossMethods: current.filter((m: string) => m !== method.value),
                      })
                    }
                  }}
                />
                <Label htmlFor={`method-${method.value}`} className="cursor-pointer font-normal">
                  {method.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Question 12 - Method Worked */}
        {formData.weightLossMethods?.length > 0 && !formData.weightLossMethods.includes("nenhum") && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label className="text-base font-semibold mb-4 block">12. Se sim, deu certo?</Label>
            <RadioGroup
              value={formData.methodWorked}
              onValueChange={(value) => updateFormData({ methodWorked: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="worked-1" />
                  <Label htmlFor="worked-1" className="cursor-pointer font-normal">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parcialmente" id="worked-2" />
                  <Label htmlFor="worked-2" className="cursor-pointer font-normal">
                    Parcialmente
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="worked-3" />
                  <Label htmlFor="worked-3" className="cursor-pointer font-normal">
                    Não
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        )}

        {/* Question 13 - Used Antidiabetics */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            13. Você já utilizou medicamentos antidiabéticos a fim de perda de peso? (como ozempic, mounjaro,
            semaglutida, liraglutida) *
          </Label>
          <RadioGroup
            value={formData.usedAntidiabetics}
            onValueChange={(value) => updateFormData({ usedAntidiabetics: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="antidiabetics-1" />
                <Label htmlFor="antidiabetics-1" className="cursor-pointer font-normal">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="antidiabetics-2" />
                <Label htmlFor="antidiabetics-2" className="cursor-pointer font-normal">
                  Não
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 14 - Would Consider */}
        {formData.usedAntidiabetics === "nao" && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label className="text-base font-semibold mb-4 block">14. Se não, você consideraria utilizar?</Label>
            <RadioGroup
              value={formData.wouldConsider}
              onValueChange={(value) => updateFormData({ wouldConsider: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="consider-1" />
                  <Label htmlFor="consider-1" className="cursor-pointer font-normal">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="consider-2" />
                  <Label htmlFor="consider-2" className="cursor-pointer font-normal">
                    Não
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        )}

        {/* Question 15 - Reason Not To Use */}
        {formData.wouldConsider === "nao" && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label htmlFor="reason" className="text-base font-semibold mb-4 block">
              15. Caso considere, qual alternativa se encaixa na não utilização:
            </Label>
            <Textarea
              id="reason"
              value={formData.reasonNotToUse}
              onChange={(e) => updateFormData({ reasonNotToUse: e.target.value })}
              placeholder="Descreva o motivo..."
              className="min-h-[100px]"
            />
          </Card>
        )}

        {/* Question 16 - Without Prescription */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            16. Você utilizaria medicamentos para diabetes a fim de emagrecimento sem acompanhamento médico, comprando
            diretamente na farmácia (sem receita), ou somente com orientação e prescrição médica? *
          </Label>
          <RadioGroup
            value={formData.withoutPrescription}
            onValueChange={(value) => updateFormData({ withoutPrescription: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sem-receita" id="prescription-1" />
                <Label htmlFor="prescription-1" className="cursor-pointer font-normal">
                  Compraria sem receita médica
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="com-receita" id="prescription-2" />
                <Label htmlFor="prescription-2" className="cursor-pointer font-normal">
                  Somente com orientação e prescrição médica
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 17 - First Contact */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            17. O seu primeiro contato com a informação sobre a possibilidade de utilização dos medicamentos para
            tratamento de diabetes mellitus para fins de emagrecimento foi através de:
          </Label>
          <RadioGroup
            value={formData.firstContact}
            onValueChange={(value) => updateFormData({ firstContact: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="redes-sociais" id="contact-1" />
                <Label htmlFor="contact-1" className="cursor-pointer font-normal">
                  Redes sociais
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amigos" id="contact-2" />
                <Label htmlFor="contact-2" className="cursor-pointer font-normal">
                  Amigos/Familiares
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medico" id="contact-3" />
                <Label htmlFor="contact-3" className="cursor-pointer font-normal">
                  Profissional de saúde
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="midia" id="contact-4" />
                <Label htmlFor="contact-4" className="cursor-pointer font-normal">
                  Mídia (TV, rádio, jornais)
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 18 - Aware of Side Effects */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            18. Você tem ciência dos efeitos adversos desses medicamentos?
          </Label>
          <RadioGroup
            value={formData.awareOfSideEffects}
            onValueChange={(value) => updateFormData({ awareOfSideEffects: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="aware-1" />
                <Label htmlFor="aware-1" className="cursor-pointer font-normal">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="aware-2" />
                <Label htmlFor="aware-2" className="cursor-pointer font-normal">
                  Não
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 19 - Side Effects Experienced */}
        {formData.usedAntidiabetics === "sim" && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label className="text-base font-semibold mb-4 block">
              19. Caso você já tenha utilizado, qual efeito adverso abaixo você sentiu:
            </Label>
            <div className="space-y-3">
              {[
                { value: "nausea", label: "Náusea" },
                { value: "vomito", label: "Vômito" },
                { value: "diarreia", label: "Diarreia" },
                { value: "constipacao", label: "Constipação" },
                { value: "dor-abdominal", label: "Dor abdominal" },
                { value: "fadiga", label: "Fadiga" },
                { value: "nenhum", label: "Nenhum" },
              ].map((effect) => (
                <div key={effect.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`effect-${effect.value}`}
                    checked={formData.sideEffectsExperienced?.includes(effect.value)}
                    onCheckedChange={(checked) => {
                      const current = formData.sideEffectsExperienced || []
                      if (checked) {
                        updateFormData({ sideEffectsExperienced: [...current, effect.value] })
                      } else {
                        updateFormData({
                          sideEffectsExperienced: current.filter((e: string) => e !== effect.value),
                        })
                      }
                    }}
                  />
                  <Label htmlFor={`effect-${effect.value}`} className="cursor-pointer font-normal">
                    {effect.label}
                  </Label>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline" size="lg" className="px-6 bg-transparent" disabled={isSubmitting}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canProceed || isSubmitting}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar Respostas"
          )}
        </Button>
      </div>

      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-1 rounded-full bg-primary"></div>
          <div className="w-8 h-1 rounded-full bg-secondary"></div>
          <div className="w-8 h-1 rounded-full bg-accent"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Página 3 de 3</p>
      </div>
    </div>
  )
}
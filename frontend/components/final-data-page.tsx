"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileCheck, ArrowLeft } from "lucide-react"

interface FinalDataPageProps {
  formData: any
  updateFormData: (data: any) => void
  onSubmit: () => void
  onBack: () => void
}

export function FinalDataPage({ formData, updateFormData, onSubmit, onBack }: FinalDataPageProps) {
  const weightLossOptions = [
    { id: "dieta", label: "Dieta" },
    { id: "musculacao", label: "Musculação" },
    { id: "atividade-fisica", label: "Atividade física" },
    { id: "alimentacao-saudavel", label: "Alimentação saudável" },
    { id: "outro", label: "Outro" },
    { id: "nao-utilizei", label: "Não utilizei" },
  ]

  const toggleWeightLossMethod = (method: string) => {
    const methods = formData.weightLossMethods || []
    if (methods.includes(method)) {
      updateFormData({ weightLossMethods: methods.filter((m: string) => m !== method) })
    } else {
      updateFormData({ weightLossMethods: [...methods, method] })
    }
  }

  const canSubmit =
    formData.usedMedication && formData.prescriptionPreference && formData.firstContact && formData.awareOfSideEffects

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
          <FileCheck className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dados Finais</h1>
        <p className="text-muted-foreground">Última etapa do questionário</p>
      </div>

      <div className="space-y-6">
        {/* Question 11 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            11. Você já utilizou os seguintes métodos para emagrecimento:
          </Label>
          <div className="space-y-3">
            {weightLossOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={formData.weightLossMethods?.includes(option.id)}
                  onCheckedChange={() => toggleWeightLossMethod(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          {formData.weightLossMethods?.includes("outro") && (
            <div className="animate-in slide-in-from-top-1 fade-in duration-300">
              <Input
                value={formData.weightLossMethodsOther}
                onChange={(e) => updateFormData({ weightLossMethodsOther: e.target.value })}
                placeholder="Especifique"
                className="mt-3"
              />
            </div>
          )}
        </Card>

        {/* Question 12 */}
        {formData.weightLossMethods?.length > 0 && !formData.weightLossMethods?.includes("nao-utilizei") && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label className="text-base font-semibold mb-4 block">12. Se sim, deu certo?</Label>
            <RadioGroup
              value={formData.methodsWorked}
              onValueChange={(value) => updateFormData({ methodsWorked: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="worked-1" />
                  <Label htmlFor="worked-1" className="cursor-pointer font-normal">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="worked-2" />
                  <Label htmlFor="worked-2" className="cursor-pointer font-normal">
                    Não
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        )}

        {/* Question 13 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            13. Você já utilizou medicamentos antidiabéticos a fim de perda de peso? (como ozempic, mounjaro,
            semaglutida, liraglutida)
          </Label>
          <RadioGroup
            value={formData.usedMedication}
            onValueChange={(value) => updateFormData({ usedMedication: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="medication-1" />
                <Label htmlFor="medication-1" className="cursor-pointer font-normal">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="medication-2" />
                <Label htmlFor="medication-2" className="cursor-pointer font-normal">
                  Não
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 14 */}
        {formData.usedMedication === "nao" && (
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao-sei" id="consider-3" />
                  <Label htmlFor="consider-3" className="cursor-pointer font-normal">
                    Não sei dizer
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        )}

        {/* Question 15 */}
        {(formData.usedMedication === "nao" || formData.wouldConsider) && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label className="text-base font-semibold mb-4 block">
              15. Caso considere, qual alternativa se encaixa na não utilização:
            </Label>
            <RadioGroup
              value={formData.notUsingReason}
              onValueChange={(value) => updateFormData({ notUsingReason: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recursos" id="reason-1" />
                  <Label htmlFor="reason-1" className="cursor-pointer font-normal">
                    Recursos financeiros
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prescricao" id="reason-2" />
                  <Label htmlFor="reason-2" className="cursor-pointer font-normal">
                    Sem prescrição médica
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medo" id="reason-3" />
                  <Label htmlFor="reason-3" className="cursor-pointer font-normal">
                    Medo
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outro" id="reason-4" />
                  <Label htmlFor="reason-4" className="cursor-pointer font-normal">
                    Outro
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ja-utilizei" id="reason-5" />
                  <Label htmlFor="reason-5" className="cursor-pointer font-normal">
                    Já utilizei
                  </Label>
                </div>
              </div>
            </RadioGroup>
            {formData.notUsingReason === "outro" && (
              <div className="animate-in slide-in-from-top-1 fade-in duration-300">
                <Input
                  value={formData.notUsingReasonOther}
                  onChange={(e) => updateFormData({ notUsingReasonOther: e.target.value })}
                  placeholder="Especifique"
                  className="mt-3"
                />
              </div>
            )}
          </Card>
        )}

        {/* Question 16 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            16. Você utilizaria medicamentos para diabetes a fim de emagrecimento sem acompanhamento médico, comprando
            diretamente na farmácia (sem receita), ou somente com orientação e prescrição médica?
          </Label>
          <RadioGroup
            value={formData.prescriptionPreference}
            onValueChange={(value) => updateFormData({ prescriptionPreference: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sem-prescricao" id="prescription-1" />
                <Label htmlFor="prescription-1" className="cursor-pointer font-normal">
                  Usaria sem prescrição médica, comprando por conta própria
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="com-prescricao" id="prescription-2" />
                <Label htmlFor="prescription-2" className="cursor-pointer font-normal">
                  Usaria apenas com prescrição e acompanhamento médico
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao-usaria" id="prescription-3" />
                <Label htmlFor="prescription-3" className="cursor-pointer font-normal">
                  Eu não usaria esses medicamentos em nenhuma circunstância
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sem-opiniao" id="prescription-4" />
                <Label htmlFor="prescription-4" className="cursor-pointer font-normal">
                  Ainda não tenho opinião formada sobre o assunto
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 17 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            17. O seu primeiro contato com a informação sobre a possibilidade de utilização dos medicamentos para
            tratamento de diabetes mellitus para fins de emagrecimento foi através de:
          </Label>
          <RadioGroup value={formData.firstContact} onValueChange={(value) => updateFormData({ firstContact: value })}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="redes-sociais" id="contact-1" />
                <Label htmlFor="contact-1" className="cursor-pointer font-normal">
                  Redes Sociais
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="familiares" id="contact-2" />
                <Label htmlFor="contact-2" className="cursor-pointer font-normal">
                  Familiares, amigos e/ou colegas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="televisao" id="contact-3" />
                <Label htmlFor="contact-3" className="cursor-pointer font-normal">
                  Televisão (jornais, programas, anúncios..)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outro" id="contact-4" />
                <Label htmlFor="contact-4" className="cursor-pointer font-normal">
                  Outro
                </Label>
              </div>
            </div>
          </RadioGroup>
          {formData.firstContact === "outro" && (
            <div className="animate-in slide-in-from-top-1 fade-in duration-300">
              <Input
                value={formData.firstContactOther}
                onChange={(e) => updateFormData({ firstContactOther: e.target.value })}
                placeholder="Especifique"
                className="mt-3"
              />
            </div>
          )}
        </Card>

        {/* Question 18 */}
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

        {/* Question 19 */}
        {formData.usedMedication === "sim" && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label htmlFor="side-effects" className="text-base font-semibold mb-4 block">
              19. Caso você já tenha utilizado, qual efeito adverso abaixo você sentiu:
            </Label>
            <Textarea
              id="side-effects"
              value={formData.sideEffectsExperienced}
              onChange={(e) => updateFormData({ sideEffectsExperienced: e.target.value })}
              placeholder="Descreva os efeitos adversos que você experimentou..."
              className="min-h-[100px]"
            />
          </Card>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline" size="lg" className="px-6 bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
        >
          Enviar Respostas
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

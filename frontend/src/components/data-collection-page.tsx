"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ClipboardList, ArrowLeft } from "lucide-react"

interface DataCollectionPageProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

export function DataCollectionPage({ formData, updateFormData, onNext, onBack }: DataCollectionPageProps) {
  const canProceed =
    formData.ageRange &&
    formData.gender &&
    formData.enrolled &&
    formData.course &&
    formData.hasDiabetes &&
    formData.bodyDissatisfaction &&
    formData.selfPerception &&
    formData.complications

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
          <ClipboardList className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dados Pessoais</h1>
        <p className="text-muted-foreground">Por favor, responda às questões abaixo</p>
      </div>

      <div className="space-y-6">
        {/* Question 1 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">1. Você se encontra em qual faixa etária?</Label>
          <RadioGroup value={formData.ageRange} onValueChange={(value) => updateFormData({ ageRange: value })}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="below-18" id="age-1" />
                <Label htmlFor="age-1" className="cursor-pointer font-normal">
                  Abaixo de 18 anos
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="18-30" id="age-2" />
                <Label htmlFor="age-2" className="cursor-pointer font-normal">
                  Entre 18 e 30 anos
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="31-40" id="age-3" />
                <Label htmlFor="age-3" className="cursor-pointer font-normal">
                  Entre 31 e 40 anos
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="above-41" id="age-4" />
                <Label htmlFor="age-4" className="cursor-pointer font-normal">
                  Acima de 41 anos
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 2 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">2. Qual seu gênero?</Label>
          <RadioGroup value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feminino" id="gender-1" />
                <Label htmlFor="gender-1" className="cursor-pointer font-normal">
                  Feminino
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="masculino" id="gender-2" />
                <Label htmlFor="gender-2" className="cursor-pointer font-normal">
                  Masculino
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outro" id="gender-3" />
                <Label htmlFor="gender-3" className="cursor-pointer font-normal">
                  Outro
                </Label>
              </div>
            </div>
          </RadioGroup>
          {formData.gender === "outro" && (
            <div className="animate-in slide-in-from-top-1 fade-in duration-300">
              <Input
                value={formData.genderOther}
                onChange={(e) => updateFormData({ genderOther: e.target.value })}
                placeholder="Especifique"
                className="mt-3"
              />
            </div>
          )}
        </Card>

        {/* Question 3 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            3. Você está matriculado no Centro Universitário de Adamantina (FAI)?
          </Label>
          <RadioGroup value={formData.enrolled} onValueChange={(value) => updateFormData({ enrolled: value })}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim-regular" id="enrolled-1" />
                <Label htmlFor="enrolled-1" className="cursor-pointer font-normal">
                  Sim, estou matriculado regularmente
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim-licenca" id="enrolled-2" />
                <Label htmlFor="enrolled-2" className="cursor-pointer font-normal">
                  Sim, porém estou em licença acadêmica e/ou trancado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="enrolled-3" />
                <Label htmlFor="enrolled-3" className="cursor-pointer font-normal">
                  Não
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 4 */}
        <Card className="p-6">
          <Label htmlFor="course" className="text-base font-semibold mb-4 block">
            4. Qual seu curso de graduação ou pós-graduação?
          </Label>
          <Input
            id="course"
            value={formData.course}
            onChange={(e) => updateFormData({ course: e.target.value })}
            placeholder="Digite o nome do seu curso"
          />
        </Card>

        {/* Question 5 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">5. Você possui diabetes mellitus?</Label>
          <RadioGroup value={formData.hasDiabetes} onValueChange={(value) => updateFormData({ hasDiabetes: value })}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="diabetes-1" />
                <Label htmlFor="diabetes-1" className="cursor-pointer font-normal">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="diabetes-2" />
                <Label htmlFor="diabetes-2" className="cursor-pointer font-normal">
                  Não
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 6 */}
        {formData.hasDiabetes === "sim" && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label className="text-base font-semibold mb-4 block">6. Se sim, qual tipo?</Label>
            <RadioGroup
              value={formData.diabetesType}
              onValueChange={(value) => updateFormData({ diabetesType: value })}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tipo-1" id="type-1" />
                  <Label htmlFor="type-1" className="cursor-pointer font-normal">
                    Tipo I
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tipo-2" id="type-2" />
                  <Label htmlFor="type-2" className="cursor-pointer font-normal">
                    Tipo II
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gestacional" id="type-3" />
                  <Label htmlFor="type-3" className="cursor-pointer font-normal">
                    Gestacional
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outro" id="type-4" />
                  <Label htmlFor="type-4" className="cursor-pointer font-normal">
                    Outro
                  </Label>
                </div>
              </div>
            </RadioGroup>
            {formData.diabetesType === "outro" && (
              <div className="animate-in slide-in-from-top-1 fade-in duration-300">
                <Input
                  value={formData.diabetesTypeOther}
                  onChange={(e) => updateFormData({ diabetesTypeOther: e.target.value })}
                  placeholder="Especifique"
                  className="mt-3"
                />
              </div>
            )}
          </Card>
        )}

        {/* Question 7 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            7. Você sente ou já sentiu-se insatisfeito com o seu corpo?
          </Label>
          <RadioGroup
            value={formData.bodyDissatisfaction}
            onValueChange={(value) => updateFormData({ bodyDissatisfaction: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim-atualmente" id="dissatisfaction-1" />
                <Label htmlFor="dissatisfaction-1" className="cursor-pointer font-normal">
                  Sim, atualmente me sinto insatisfeito com meu corpo
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim-passado" id="dissatisfaction-2" />
                <Label htmlFor="dissatisfaction-2" className="cursor-pointer font-normal">
                  Sim, já me senti insatisfeito, porém hoje não mais
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="dissatisfaction-3" />
                <Label htmlFor="dissatisfaction-3" className="cursor-pointer font-normal">
                  Não, nunca me senti insatisfeito
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 8 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">8. Você considera-se:</Label>
          <RadioGroup
            value={formData.selfPerception}
            onValueChange={(value) => updateFormData({ selfPerception: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abaixo" id="perception-1" />
                <Label htmlFor="perception-1" className="cursor-pointer font-normal">
                  Abaixo do peso
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adequado" id="perception-2" />
                <Label htmlFor="perception-2" className="cursor-pointer font-normal">
                  Peso adequado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sobrepeso" id="perception-3" />
                <Label htmlFor="perception-3" className="cursor-pointer font-normal">
                  Sobrepeso
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 9 */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">
            9. Você já enfrentou/enfrenta alguma complicação física, emocional ou psicológica relacionada ao seu peso,
            imagem corporal ou insatisfação com o próprio corpo?
          </Label>
          <RadioGroup
            value={formData.complications}
            onValueChange={(value) => updateFormData({ complications: value })}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="complications-1" />
                <Label htmlFor="complications-1" className="cursor-pointer font-normal">
                  Sim
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="complications-2" />
                <Label htmlFor="complications-2" className="cursor-pointer font-normal">
                  Não
                </Label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {/* Question 10 */}
        {formData.complications === "sim" && (
          <Card className="p-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <Label htmlFor="complications-desc" className="text-base font-semibold mb-4 block">
              10. Se sim, descreva brevemente o que vivenciou:
            </Label>
            <Textarea
              id="complications-desc"
              value={formData.complicationsDescription}
              onChange={(e) => updateFormData({ complicationsDescription: e.target.value })}
              placeholder="Descreva sua experiência..."
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
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8"
        >
          Próxima Página
        </Button>
      </div>

      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-1 rounded-full bg-primary"></div>
          <div className="w-8 h-1 rounded-full bg-secondary"></div>
          <div className="w-8 h-1 rounded-full bg-muted"></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Página 2 de 3</p>
      </div>
    </div>
  )
}

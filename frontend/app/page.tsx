"use client"

import { useState } from "react"
import { ConsentPage } from "@/components/consent-page"
import { DataCollectionPage } from "@/components/data-collection-page"
import { FinalDataPage } from "@/components/final-data-page"
import { SuccessPage } from "@/components/success-page"

export default function SurveyPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    // Page 1 - Consent
    consentAccepted: false,
    userEmail: "",

    // Page 2 - Data Collection
    ageRange: "",
    gender: "",
    genderOther: "",
    enrolled: "",
    course: "",
    hasDiabetes: "",
    diabetesType: "",
    diabetesTypeOther: "",
    bodyDissatisfaction: "",
    selfPerception: "",
    complications: "",
    complicationsDescription: "",

    // Page 3 - Final Data
    weightLossMethods: [] as string[],
    weightLossMethodsOther: "",
    methodsWorked: "",
    usedMedication: "",
    wouldConsider: "",
    notUsingReason: "",
    notUsingReasonOther: "",
    prescriptionPreference: "",
    firstContact: "",
    firstContactOther: "",
    awareOfSideEffects: "",
    sideEffectsExperienced: "",
  })

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 4))
  }

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    console.log("Survey submitted:", formData)
    setCurrentPage(4)
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 1 && <ConsentPage formData={formData} updateFormData={updateFormData} onNext={handleNext} />}
      {currentPage === 2 && (
        <DataCollectionPage
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {currentPage === 3 && (
        <FinalDataPage
          formData={formData}
          updateFormData={updateFormData}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}
      {currentPage === 4 && <SuccessPage />}
    </div>
  )
}

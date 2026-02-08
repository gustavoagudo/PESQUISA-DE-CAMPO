"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ConsentPage } from "./components/consent-page"
import { DataCollectionPage } from "./components/data-collection-page"
import { FinalDataPage } from "./components/final-data-page"
import { SuccessPage } from "./components/success-page"
import { Toaster } from "@/components/ui/sonner"

// Animação suave - apenas fade com scale mínimo
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 0.98,
  },
}

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3,
}

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState({
    // Page 1 - Consent
    email: "",
    consentAccepted: false,

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
    methodWorked: "",
    usedAntidiabetics: "",
    wouldConsider: "",
    reasonNotToUse: "",
    withoutPrescription: "",
    firstContact: "",
    awareOfSideEffects: "",
    sideEffectsExperienced: [] as string[],
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

  // Scroll suave para o topo quando mudar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="consent"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ConsentPage formData={formData} updateFormData={updateFormData} onNext={handleNext} />
          </motion.div>
        )}
        {currentPage === 2 && (
          <motion.div
            key="data-collection"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DataCollectionPage
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          </motion.div>
        )}
        {currentPage === 3 && (
          <motion.div
            key="final-data"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FinalDataPage
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          </motion.div>
        )}
        {currentPage === 4 && (
          <motion.div
            key="success"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SuccessPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
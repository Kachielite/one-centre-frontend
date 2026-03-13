import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import useCreateBrandProfile from "@/feature/brand-profile/hooks/use-create-brand-profile.ts"
import CustomTextInput from "@/core/components/custom-components/form/custom-text-input.tsx"
import CustomTextAreaInput from "@/core/components/custom-components/form/custom-textarea-input.tsx"
import { Card, CardContent, CardHeader } from "@/core/components/ui/card.tsx"
import { Button } from "@/core/components/ui/button.tsx"
import { ScrollArea } from "@/core/components/ui/scroll-area.tsx"

const TOTAL_STEPS = 6

export function BrandProfileOnboarding() {
  const {
    isCreatingBrandProfile,
    brandProfileCreationForm,
    createBrandProfileHandler,
  } = useCreateBrandProfile()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = () => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))
  }

  const prev = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 0))
  }

  const canProceed = () => {
    const name = brandProfileCreationForm.watch("name")
    const bio_context = brandProfileCreationForm.watch("bio_context")
    const tone_guidelines = brandProfileCreationForm.watch("tone_guidelines")

    if (step === 1) return name.trim().length >= 1
    if (step === 2) return bio_context.length >= 1
    if (step === 3) return (tone_guidelines as string).length >= 1
    return true
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-sm">
      {/* Progress */}
      <div className="absolute top-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i <= step ? "w-8 bg-primary" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-lg px-6">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 0: Introduction */}
          {step === 0 && (
            <motion.div
              key="name"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card>
                <CardHeader>
                  <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
                    Step 1 of {TOTAL_STEPS}
                  </p>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">
                    Create your Brand Profile
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-8 text-muted-foreground">
                    This is a quick setup to create a brand profile. It helps
                    the AI understand your brand&#39;s voice and vibe so it can
                    create posts that sound like you. You can always edit these
                    later in settings.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {/* Step 1: Name */}
          {step === 1 && (
            <motion.div
              key="name"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card>
                <CardHeader>
                  <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
                    Step 2 of {TOTAL_STEPS}
                  </p>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">
                    What do you call your brand
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    This is the name that the AI will use when it refers to your
                    brand in posts.
                  </p>
                </CardHeader>
                <CardContent>
                  <CustomTextInput
                    formController={brandProfileCreationForm}
                    id="name"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Bio Context */}
          {step === 2 && (
            <motion.div
              key="desc"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canProceed()) {
                    e.preventDefault()
                    next()
                  }
                }}
              >
                <CardHeader>
                  <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
                    Step 3 of {TOTAL_STEPS}
                  </p>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">
                    Tell us about your brand.
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    This helps the AI understand your brand and what values it
                    stands for. The AI will use this to create posts that align
                    with your brand&#39;s identity and resonate with your
                    audience.
                  </p>
                </CardHeader>
                <CardContent>
                  <CustomTextAreaInput
                    formController={brandProfileCreationForm}
                    id="bio_context"
                    rows={7}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Tone Guideline */}
          {step === 3 && (
            <motion.div
              key="tags"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card>
                <CardHeader>
                  <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
                    Step 4 of {TOTAL_STEPS}
                  </p>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">
                    Tell us about your brand&#39;s tone guidelines
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Describe your brand&#39;s vibe and tone guidelines. This
                    helps the AI understand your brand&#39;s personality and
                    create posts that sound like you. Be specific about the
                    tone, style, and personality traits that define your
                    brand&#39;s voice.
                  </p>
                </CardHeader>
                <CardContent>
                  <CustomTextAreaInput
                    formController={brandProfileCreationForm}
                    id="tone_guidelines"
                    rows={12}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: website */}
          {step === 4 && (
            <motion.div
              key="style"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card>
                <CardHeader>
                  <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
                    Step 5 of {TOTAL_STEPS}
                  </p>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">
                    Provide your brand&#39;s website URL (optional)
                  </h2>
                  <p className="mb-8 text-sm text-muted-foreground">
                    The AI can analyze your website&#39;s content, design, and
                    tone to better capture your brand&#39;s unique voice and
                    style in the posts it generates.
                  </p>
                </CardHeader>
                <CardContent>
                  <CustomTextInput
                    formController={brandProfileCreationForm}
                    id="website_url"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 5 && (
            <motion.div
              key="review"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">
                    Step 6 of {TOTAL_STEPS}
                  </p>
                  <h2 className="mb-2 text-2xl font-semibold text-foreground">
                    Review your brand profile information
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Look good? Hit create and start posting with it.
                  </p>
                </CardHeader>
                <CardContent className="max-h-100 bg-card p-5">
                  <ScrollArea>
                    <div className="max-h-100 space-y-4">
                      <div>
                        <p className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                          Name
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {brandProfileCreationForm.watch("name")}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                          Bio Context
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {brandProfileCreationForm.watch("bio_context")}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                          Tone Guidelines
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {
                            brandProfileCreationForm.watch(
                              "tone_guidelines"
                            ) as string
                          }
                        </p>
                      </div>
                      {brandProfileCreationForm.watch("website_url") && (
                        <div>
                          <p className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                            Website URL
                          </p>
                          <p className="text-sm text-foreground/80">
                            {brandProfileCreationForm.watch("website_url")}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <div>
            {step >= 2 && (
              <Button
                variant="ghost"
                onClick={prev}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <div>
            {step < TOTAL_STEPS - 1 ? (
              <Button
                onClick={next}
                disabled={!canProceed()}
                className="gap-1.5 bg-primary hover:bg-primary/90 disabled:opacity-30"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                disabled={isCreatingBrandProfile}
                onClick={async () => await createBrandProfileHandler()}
                className="glow-primary gap-1.5 bg-primary hover:bg-primary/90"
              >
                <Sparkles className="h-4 w-4" />
                {isCreatingBrandProfile
                  ? "Creating..."
                  : "Create Brand Profile"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

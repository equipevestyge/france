"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Trophy, Shirt, Euro, Star, Crown } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual desses jogadores brasileiros NUNCA jogou no PSG?",
    options: ["Ronaldinho", "Neymar", "Lucas Moura", "Vinicius Jr"],
    correct: 3,
    explanation: "Vinicius Jr nunca jogou no PSG. Ele saiu do Flamengo direto para o Real Madrid em 2018.",
  },
  {
    id: 2,
    question: "Qual é o nome do estádio do PSG?",
    options: ["Stade de France", "Parc des Princes", "Stade Vélodrome", "Allianz Riviera"],
    correct: 1,
    explanation: "O Parc des Princes é a casa do PSG desde 1974, com capacidade para 47.929 espectadores.",
  },
  {
    id: 3,
    question: "Qual é a cor principal do uniforme tradicional do PSG?",
    options: ["Vermelho", "Azul", "Branco", "Preto"],
    correct: 1,
    explanation: "O azul é a cor principal do PSG, complementada pelo vermelho e branco nas listras centrais.",
  },
  {
    id: 4,
    question: "Quantas vezes o PSG conquistou a Liga dos Campeões?",
    options: ["Nunca conquistou", "1 vez", "2 vezes", "3 vezes"],
    correct: 1,
    explanation: "O PSG conquistou sua primeira Champions League em 2024, realizando o sonho de todos os torcedores!",
  },
]

// Componente de notificação
const SuccessNotification = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (show) {
      // Som de notificação
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      audio.volume = 0.3
      audio.play().catch(() => {}) // Ignora erro se não conseguir tocar

      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-500">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Euro className="h-5 w-5 text-green-500" />
        </div>
        <div>
          <p className="font-bold">Parabéns! 🎉</p>
          <p className="text-sm">Você ganhou €15 de desconto!</p>
        </div>
      </div>
    </div>
  )
}

export default function PSGQuiz() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const handleAnswer = () => {
    const isCorrect = Number.parseInt(selectedAnswer) === questions[currentQuestion].correct

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1)
      setShowNotification(true)
    }

    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer("")
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const discount = correctAnswers * 15
  const originalPrice = 89.99
  const finalPrice = Math.max(originalPrice - discount, 29.99)

  // Tela inicial com presidente
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <Crown className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-4xl font-bold text-blue-900 mb-4">Mensagem do Presidente do PSG</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Placeholder para foto do presidente */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center border-4 border-blue-300">
                <div className="text-center">
                  <Crown className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-blue-800">Presidente PSG</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg border-2 border-blue-200">
              <blockquote className="text-lg text-gray-800 italic text-center leading-relaxed">
                "Torcedores fiéis do PSG! 🏆
                <br />
                <br />
                Estou extremamente feliz com nossa <strong>primeira conquista da Champions League!</strong>
                Este momento histórico merece ser celebrado com vocês, nossa torcida fiel.
                <br />
                <br />
                Por isso, estou liberando um <strong>desconto progressivo especial</strong> nas camisas oficiais do PSG.
                Mas apenas para os <strong>verdadeiros torcedores</strong> que conhecem nosso clube!
                <br />
                <br />
                Respondam corretamente às 4 perguntas e ganhem até <strong>€60 de desconto</strong>
                (€15 por resposta certa). Quem acertar todas, leva a camisa praticamente a preço de custo!
                <br />
                <br />
                <strong>Allez Paris! 💙❤️🤍</strong>"
              </blockquote>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-center space-x-2 text-yellow-800">
                <Star className="h-5 w-5" />
                <span className="font-semibold">Desconto máximo: €60 • Preço final: €29.99</span>
                <Star className="h-5 w-5" />
              </div>
            </div>

            <Button
              onClick={() => setGameStarted(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-6"
              size="lg"
            >
              <Trophy className="mr-3 h-6 w-6" />
              Começar Quiz do Torcedor Fiel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-blue-900">Parabéns, Torcedor Verdadeiro! 🎉</CardTitle>
            <CardDescription className="text-lg">
              Você acertou {correctAnswers} de {questions.length} perguntas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <Shirt className="h-12 w-12 text-blue-600" />
                <div className="text-right">
                  <p className="text-sm text-gray-600">Preço Original</p>
                  <p className="text-lg line-through text-gray-500">€{originalPrice}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Desconto conquistado:</span>
                  <span className="font-bold text-green-600">-€{discount}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Seu preço final:</span>
                  <span className="text-blue-600">€{finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {correctAnswers === 4 && (
                <div className="bg-green-100 p-4 rounded-lg border border-green-300">
                  <p className="text-green-800 font-semibold text-center">
                    🏆 PERFEITO! Você é um verdadeiro torcedor do PSG!
                    <br />
                    Camisa praticamente a preço de custo!
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                <Euro className="mr-2 h-5 w-5" />
                Comprar Agora
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.reload()}>
                Tentar Novamente
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>* Oferta válida apenas para verdadeiros torcedores do PSG</p>
              <p>** Preço de custo: €29.99 (desconto máximo aplicado)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 flex items-center justify-center p-4">
      <SuccessNotification show={showNotification} onClose={() => setShowNotification(false)} />

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Shirt className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-xl">Quiz do Torcedor PSG</CardTitle>
                <CardDescription>
                  Pergunta {currentQuestion + 1} de {questions.length}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Desconto atual</p>
              <p className="text-2xl font-bold text-green-600">€{correctAnswers * 15}</p>
            </div>
          </div>
          <Progress value={(currentQuestion / questions.length) * 100} className="w-full" />
        </CardHeader>

        <CardContent className="space-y-6">
          {!showResult ? (
            <>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-900">{questions[currentQuestion].question}</h3>

                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-blue-100 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                Confirmar Resposta
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-lg ${
                  Number.parseInt(selectedAnswer) === questions[currentQuestion].correct
                    ? "bg-green-50 border-2 border-green-200"
                    : "bg-red-50 border-2 border-red-200"
                }`}
              >
                <div className="flex items-center mb-3">
                  {Number.parseInt(selectedAnswer) === questions[currentQuestion].correct ? (
                    <>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <span className="text-green-800 font-semibold text-lg">Correto! +€15 de desconto</span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">✗</span>
                      </div>
                      <span className="text-red-800 font-semibold text-lg">Incorreto</span>
                    </>
                  )}
                </div>

                <p className="text-gray-700 mb-3">
                  <strong>Resposta correta:</strong>{" "}
                  {questions[currentQuestion].options[questions[currentQuestion].correct]}
                </p>

                <p className="text-gray-600 text-sm">{questions[currentQuestion].explanation}</p>
              </div>

              <Button onClick={nextQuestion} className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado Final"}
              </Button>
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progresso do desconto:</span>
              <span className="font-semibold">€{correctAnswers * 15} / €60</span>
            </div>
            <Progress value={(correctAnswers / 4) * 100} className="mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

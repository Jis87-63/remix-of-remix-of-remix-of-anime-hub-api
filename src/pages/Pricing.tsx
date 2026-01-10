import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Check, 
  Zap, 
  Crown, 
  Building2, 
  Sparkles,
  HelpCircle
} from "lucide-react";

export default function Pricing() {
  const { user } = useAuth();

  const plans = [
    {
      name: "Gratuito",
      icon: Zap,
      price: "R$ 0",
      period: "para sempre",
      description: "Perfeito para começar a explorar animes",
      features: [
        "Watchlist ilimitada",
        "Notificações de novos episódios",
        "Acesso ao catálogo completo",
        "API: 100 requisições/dia",
        "Suporte por email",
      ],
      limitations: [
        "Anúncios no site",
      ],
      cta: user ? "Plano Atual" : "Começar Grátis",
      ctaVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      icon: Crown,
      price: "R$ 9,90",
      period: "/mês",
      description: "Para fãs dedicados e desenvolvedores",
      features: [
        "Tudo do plano Gratuito",
        "Sem anúncios",
        "Notificações prioritárias",
        "API: 10.000 requisições/dia",
        "Suporte prioritário",
        "Badge exclusivo no perfil",
        "Acesso antecipado a novidades",
      ],
      limitations: [],
      cta: "Assinar Pro",
      ctaVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      icon: Building2,
      price: "Sob consulta",
      period: "",
      description: "Para empresas e grandes projetos",
      features: [
        "Tudo do plano Pro",
        "API: Requisições ilimitadas",
        "SLA garantido de 99.9%",
        "Suporte dedicado 24/7",
        "Integração personalizada",
        "Relatórios avançados",
        "White-label disponível",
      ],
      limitations: [],
      cta: "Falar com Vendas",
      ctaVariant: "outline" as const,
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento. Seu acesso Pro continuará até o final do período pago.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos cartões de crédito (Visa, Mastercard, Amex), Pix e boleto bancário.",
    },
    {
      question: "O plano gratuito é realmente grátis?",
      answer: "Sim! O plano gratuito é 100% grátis, sem período de teste ou pegadinhas. Você pode usar para sempre.",
    },
    {
      question: "Como funciona a API?",
      answer: "Ao criar uma conta, você recebe acesso à nossa API REST. A quantidade de requisições depende do seu plano.",
    },
    {
      question: "Posso mudar de plano depois?",
      answer: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento nas configurações da conta.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Preços Simples</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Escolha o plano </span>
              <span className="text-gradient">ideal para você</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece gratuitamente e faça upgrade quando precisar. 
              Sem surpresas, sem taxas escondidas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/10 to-background border-primary/50 shadow-lg shadow-primary/10"
                    : "bg-card border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl ${
                    plan.popular ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <plan.icon className={`h-6 w-6 ${
                      plan.popular ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>

                <Button
                  variant={plan.ctaVariant}
                  className="w-full mb-6"
                  asChild={!user || plan.name !== "Gratuito"}
                  disabled={user && plan.name === "Gratuito"}
                >
                  {user && plan.name === "Gratuito" ? (
                    <span>{plan.cta}</span>
                  ) : (
                    <Link to={plan.name === "Enterprise" ? "/contact" : "/auth"}>
                      {plan.cta}
                    </Link>
                  )}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <div key={i} className="flex items-start gap-3 opacity-60">
                      <span className="h-5 w-5 text-center text-muted-foreground shrink-0">—</span>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-xl bg-card border border-border"
                >
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está pronta para ajudar você a escolher o melhor plano
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Falar com a Equipe</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

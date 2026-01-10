import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  Zap, 
  Globe, 
  Code2, 
  Sparkles,
  Github,
  Twitter,
  Mail
} from "lucide-react";

export default function About() {
  const stats = [
    { value: "50K+", label: "Animes Catalogados" },
    { value: "10K+", label: "Usuários Ativos" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Suporte" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Paixão por Anime",
      description: "Somos fãs de anime assim como você. Construímos este projeto com amor e dedicação para a comunidade otaku.",
    },
    {
      icon: Users,
      title: "Comunidade em Primeiro Lugar",
      description: "Nossa prioridade é servir a comunidade de anime com as melhores ferramentas e recursos disponíveis.",
    },
    {
      icon: Zap,
      title: "Inovação Constante",
      description: "Estamos sempre buscando novas formas de melhorar sua experiência com tecnologias modernas e recursos inovadores.",
    },
    {
      icon: Globe,
      title: "Acesso Global",
      description: "Nossos serviços são acessíveis de qualquer lugar do mundo, com servidores distribuídos globalmente.",
    },
  ];

  const team = [
    {
      name: "Equipe AniHublist",
      role: "Desenvolvedores & Entusiastas",
      description: "Uma equipe apaixonada por anime e tecnologia, dedicada a criar a melhor experiência para fãs de anime.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-20 relative overflow-hidden">
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
              <span className="text-sm font-medium text-primary">Sobre Nós</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Conectando fãs de anime </span>
              <span className="text-gradient">ao redor do mundo</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              O AniHublist nasceu da paixão de fãs de anime que queriam criar 
              uma plataforma moderna e poderosa para acompanhar seus animes favoritos.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
              Nossa Missão
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Criar a plataforma de anime mais completa e intuitiva do mercado, 
              permitindo que fãs acompanhem seus animes favoritos, descubram novos títulos 
              e se conectem com uma comunidade global de otakus. Além disso, fornecemos uma 
              API robusta para desenvolvedores criarem suas próprias aplicações.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Nossos Valores
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam tudo o que fazemos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Quem Somos
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-violet-500 mx-auto mb-4 flex items-center justify-center">
                  <Code2 className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Faça parte da comunidade
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a milhares de fãs de anime que já usam o AniHublist
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link to="/auth">
                  Criar Conta Grátis
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8" asChild>
                <Link to="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Fale Conosco
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <a
                href="#"
                className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

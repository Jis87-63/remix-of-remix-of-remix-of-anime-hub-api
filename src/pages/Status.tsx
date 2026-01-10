import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Activity,
  Server,
  Database,
  Globe,
  Bell,
  Zap
} from "lucide-react";

export default function Status() {
  const services = [
    {
      name: "Website",
      icon: Globe,
      status: "operational",
      uptime: "99.98%",
      responseTime: "45ms",
    },
    {
      name: "API REST",
      icon: Zap,
      status: "operational",
      uptime: "99.95%",
      responseTime: "52ms",
    },
    {
      name: "Banco de Dados",
      icon: Database,
      status: "operational",
      uptime: "99.99%",
      responseTime: "12ms",
    },
    {
      name: "Autenticação",
      icon: Server,
      status: "operational",
      uptime: "99.97%",
      responseTime: "38ms",
    },
    {
      name: "Notificações Push",
      icon: Bell,
      status: "operational",
      uptime: "99.90%",
      responseTime: "85ms",
    },
  ];

  const incidents = [
    {
      date: "10 Jan 2026",
      title: "Manutenção Programada",
      description: "Atualização de infraestrutura realizada com sucesso.",
      status: "resolved",
      duration: "15 minutos",
    },
    {
      date: "05 Jan 2026",
      title: "Latência Elevada na API",
      description: "Detectamos latência elevada na API. Problema identificado e corrigido.",
      status: "resolved",
      duration: "8 minutos",
    },
    {
      date: "28 Dez 2025",
      title: "Indisponibilidade Parcial",
      description: "Alguns usuários experimentaram dificuldades de acesso. Serviço normalizado.",
      status: "resolved",
      duration: "23 minutos",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "operational":
        return {
          label: "Operacional",
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          icon: CheckCircle2,
        };
      case "degraded":
        return {
          label: "Degradado",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          icon: AlertTriangle,
        };
      case "outage":
        return {
          label: "Indisponível",
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          icon: XCircle,
        };
      default:
        return {
          label: "Desconhecido",
          color: "text-gray-500",
          bgColor: "bg-gray-500/10",
          icon: Activity,
        };
    }
  };

  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              allOperational ? "bg-green-500/10" : "bg-yellow-500/10"
            }`}>
              {allOperational ? (
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Status do Sistema
            </h1>
            <p className={`text-lg ${allOperational ? "text-green-500" : "text-yellow-500"}`}>
              {allOperational
                ? "Todos os sistemas estão operacionais"
                : "Alguns sistemas estão com problemas"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Última verificação: {new Date().toLocaleString("pt-BR")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Serviços
            </h2>

            <div className="space-y-3">
              {services.map((service, index) => {
                const config = getStatusConfig(service.status);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-card border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <service.icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uptime: {service.uptime} • Resposta: {service.responseTime}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor}`}>
                      <config.icon className={`h-4 w-4 ${config.color}`} />
                      <span className={`text-sm font-medium ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Uptime Graph Placeholder */}
      <section className="pb-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Uptime dos Últimos 90 Dias
            </h2>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-end gap-1 h-16">
                {Array.from({ length: 90 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${
                      Math.random() > 0.02 ? "bg-green-500" : "bg-yellow-500"
                    }`}
                    style={{ height: `${Math.random() * 30 + 70}%` }}
                    title={`Dia ${90 - i}: ${Math.random() > 0.02 ? "100%" : "99.5%"}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                <span>90 dias atrás</span>
                <span>Hoje</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incidents */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Incidentes Recentes
            </h2>

            {incidents.length === 0 ? (
              <div className="p-6 rounded-xl bg-card border border-border text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-foreground font-medium">Nenhum incidente recente</p>
                <p className="text-sm text-muted-foreground">
                  Todos os sistemas estão funcionando normalmente
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-xl bg-card border border-border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold text-foreground">
                          {incident.title}
                        </h3>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {incident.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {incident.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                        Resolvido
                      </span>
                      <span className="text-muted-foreground">
                        Duração: {incident.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20"
          >
            <Bell className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Receba alertas de status
            </h2>
            <p className="text-muted-foreground mb-4">
              Seja notificado automaticamente quando houver problemas nos serviços
            </p>
            <p className="text-sm text-muted-foreground">
              Em breve: inscrição para alertas por email
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

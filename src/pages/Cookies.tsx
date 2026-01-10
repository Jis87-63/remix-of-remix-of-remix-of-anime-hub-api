import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cookie, Settings, BarChart3, Shield, Info } from "lucide-react";

export default function Cookies() {
  const lastUpdated = "10 de Janeiro de 2026";

  const cookieTypes = [
    {
      name: "Cookies Essenciais",
      description: "Necessários para o funcionamento básico do site. Sem eles, o site não funciona corretamente.",
      examples: [
        { name: "session_token", purpose: "Manter você conectado", duration: "Sessão" },
        { name: "csrf_token", purpose: "Proteção contra ataques CSRF", duration: "Sessão" },
        { name: "preferences", purpose: "Salvar preferências de idioma", duration: "1 ano" },
      ],
      canDisable: false,
    },
    {
      name: "Cookies Funcionais",
      description: "Permitem funcionalidades aprimoradas e personalização.",
      examples: [
        { name: "theme", purpose: "Lembrar tema escolhido (claro/escuro)", duration: "1 ano" },
        { name: "notification_pref", purpose: "Preferências de notificação", duration: "1 ano" },
        { name: "last_viewed", purpose: "Últimos animes visualizados", duration: "30 dias" },
      ],
      canDisable: true,
    },
    {
      name: "Cookies Analíticos",
      description: "Nos ajudam a entender como você usa o site para melhorar a experiência.",
      examples: [
        { name: "_analytics", purpose: "Análise de uso anônimo", duration: "2 anos" },
        { name: "_session_id", purpose: "Identificar sessões únicas", duration: "Sessão" },
      ],
      canDisable: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Política de Cookies
            </h1>
            <p className="text-lg text-muted-foreground">
              Última atualização: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-card/50 border border-border mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">O que são Cookies?</h2>
                  <p className="text-muted-foreground">
                    Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. 
                    Eles são amplamente usados para fazer sites funcionarem de forma eficiente e fornecer informações 
                    aos proprietários do site.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cookie Types */}
            <div className="space-y-6 mb-12">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {index === 0 && <Shield className="h-5 w-5 text-green-500" />}
                      {index === 1 && <Settings className="h-5 w-5 text-blue-500" />}
                      {index === 2 && <BarChart3 className="h-5 w-5 text-violet-500" />}
                      <h3 className="text-lg font-semibold text-foreground">{type.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      type.canDisable 
                        ? 'bg-amber-500/10 text-amber-500' 
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      {type.canDisable ? 'Pode desativar' : 'Sempre ativo'}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{type.description}</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">Cookie</th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">Propósito</th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">Duração</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.examples.map((cookie, i) => (
                          <tr key={i} className="border-b border-border/50 last:border-0">
                            <td className="py-2 px-3 font-mono text-xs text-primary">{cookie.name}</td>
                            <td className="py-2 px-3 text-foreground">{cookie.purpose}</td>
                            <td className="py-2 px-3 text-muted-foreground">{cookie.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* How to manage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">Como gerenciar Cookies</h2>
                  <div className="text-muted-foreground space-y-3">
                    <p>Você pode controlar e/ou excluir cookies conforme desejar. Para detalhes, visite aboutcookies.org.</p>
                    
                    <p><strong className="text-foreground">No seu navegador:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Chrome: Configurações → Privacidade e segurança → Cookies</li>
                      <li>Firefox: Configurações → Privacidade e Segurança → Cookies</li>
                      <li>Safari: Preferências → Privacidade → Cookies</li>
                      <li>Edge: Configurações → Privacidade → Cookies</li>
                    </ul>
                    
                    <p className="text-amber-500 mt-4">
                      ⚠️ Desativar cookies essenciais pode afetar o funcionamento do site.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-primary/20 text-center"
            >
              <p className="text-muted-foreground mb-2">
                Tem dúvidas sobre nossa política de cookies?
              </p>
              <a 
                href="mailto:privacy@anihublist.vercel.app" 
                className="text-primary hover:underline font-medium"
              >
                Entre em contato conosco
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

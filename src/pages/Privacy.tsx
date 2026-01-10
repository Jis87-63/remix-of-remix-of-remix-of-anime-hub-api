import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Database, Lock, Share2, Trash2, Bell, Mail } from "lucide-react";

export default function Privacy() {
  const lastUpdated = "10 de Janeiro de 2026";

  const sections = [
    {
      icon: Eye,
      title: "1. Informações que Coletamos",
      content: `Coletamos as seguintes categorias de informações:

**Informações da Conta:**
• Email e senha (criptografada)
• Nome de exibição (opcional)
• Foto de perfil (opcional)

**Dados de Uso:**
• Animes adicionados à sua watchlist
• Preferências de notificação
• Logs de acesso e endereço IP
• Tipo de dispositivo e navegador

**Dados da API:**
• Chaves de API geradas
• Estatísticas de uso da API`
    },
    {
      icon: Database,
      title: "2. Como Usamos suas Informações",
      content: `Utilizamos suas informações para:

• Fornecer e manter o Serviço
• Autenticar sua identidade e proteger sua conta
• Enviar notificações sobre novos episódios (se autorizado)
• Melhorar e personalizar sua experiência
• Analisar tendências de uso para melhorar o Serviço
• Detectar e prevenir atividades fraudulentas
• Responder a suas solicitações de suporte
• Cumprir obrigações legais`
    },
    {
      icon: Lock,
      title: "3. Segurança dos Dados",
      content: `Implementamos medidas de segurança robustas:

• Criptografia TLS/SSL para todas as transmissões
• Senhas armazenadas com hash bcrypt
• API Keys criptografadas no banco de dados
• Acesso restrito aos dados por equipe autorizada
• Backups regulares e seguros
• Monitoramento contínuo de segurança

Nenhum método de transmissão pela Internet é 100% seguro. Fazemos o nosso melhor para proteger seus dados, mas não podemos garantir segurança absoluta.`
    },
    {
      icon: Share2,
      title: "4. Compartilhamento de Informações",
      content: `NÃO vendemos suas informações pessoais. Podemos compartilhar dados apenas:

• Com provedores de serviços que nos ajudam a operar o Serviço (hospedagem, email)
• Quando exigido por lei ou ordem judicial
• Para proteger os direitos, propriedade ou segurança do AniHublist
• Com seu consentimento explícito

Todos os terceiros com quem trabalhamos são obrigados contratualmente a proteger suas informações.`
    },
    {
      icon: Bell,
      title: "5. Notificações Push",
      content: `Se você optar por receber notificações push:

• Coletamos tokens de notificação do seu navegador
• Enviamos alertas sobre novos episódios dos animes na sua watchlist
• Você pode desativar as notificações a qualquer momento nas configurações do navegador
• Os tokens são armazenados de forma segura e usados apenas para notificações

Nunca enviamos notificações de marketing sem seu consentimento expresso.`
    },
    {
      icon: Database,
      title: "6. Cookies e Tecnologias Similares",
      content: `Utilizamos cookies para:

• Manter você conectado (cookies de sessão)
• Lembrar suas preferências
• Analisar uso do site (analytics)

Tipos de cookies:
• Essenciais: necessários para o funcionamento do site
• Funcionais: lembram suas preferências
• Analíticos: ajudam a entender como você usa o site

Você pode gerenciar cookies nas configurações do seu navegador.`
    },
    {
      icon: Trash2,
      title: "7. Seus Direitos",
      content: `Você tem os seguintes direitos sobre seus dados:

• **Acesso:** solicitar cópia dos seus dados pessoais
• **Correção:** corrigir dados imprecisos
• **Exclusão:** solicitar a exclusão da sua conta e dados
• **Portabilidade:** receber seus dados em formato legível
• **Oposição:** opor-se ao processamento de dados
• **Restrição:** limitar como usamos seus dados

Para exercer esses direitos, entre em contato conosco pelo email de suporte.`
    },
    {
      icon: Shield,
      title: "8. Retenção de Dados",
      content: `Retemos seus dados pelo tempo necessário para:

• Fornecer o Serviço enquanto você tiver uma conta ativa
• Cumprir obrigações legais (até 5 anos para alguns registros)
• Resolver disputas e fazer cumprir nossos acordos

Após exclusão da conta:
• Dados pessoais são removidos em até 30 dias
• Backups são removidos em até 90 dias
• Logs anônimos podem ser retidos para análise`
    },
    {
      icon: Shield,
      title: "9. Menores de Idade",
      content: `O AniHublist não é destinado a menores de 13 anos. Não coletamos intencionalmente informações de crianças menores de 13 anos.

Se você é pai/responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos remover esses dados.`
    },
    {
      icon: Mail,
      title: "10. Contato e Alterações",
      content: `Para dúvidas sobre esta política:

Email: privacy@anihublist.vercel.app
Website: https://anihublist.vercel.app/contact

Podemos atualizar esta política periodicamente. Alterações significativas serão notificadas por email ou aviso no site.

A data de "última atualização" no topo indica quando a política foi modificada pela última vez.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Política de Privacidade
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-6 rounded-2xl bg-card/50 border border-border mb-8">
              <p className="text-muted-foreground">
                No AniHublist, valorizamos sua privacidade. Esta política explica como coletamos, 
                usamos e protegemos suas informações pessoais quando você usa nosso serviço.
              </p>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-3">
                        {section.title}
                      </h2>
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed prose prose-invert prose-sm max-w-none">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

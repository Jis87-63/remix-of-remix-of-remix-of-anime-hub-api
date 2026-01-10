import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, Shield, AlertTriangle, Scale, Mail } from "lucide-react";

export default function Terms() {
  const lastUpdated = "10 de Janeiro de 2026";

  const sections = [
    {
      icon: FileText,
      title: "1. Aceitação dos Termos",
      content: `Ao acessar e utilizar o AniHublist ("Serviço"), você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não poderá acessar o Serviço.

O uso contínuo do Serviço após quaisquer alterações nestes termos constitui sua aceitação de tais alterações.`
    },
    {
      icon: Shield,
      title: "2. Descrição do Serviço",
      content: `O AniHublist é uma plataforma que oferece:
• Catálogo de animes com informações detalhadas
• Sistema de lista de acompanhamento (watchlist)
• Notificações sobre novos episódios
• API para desenvolvedores

Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspecto do Serviço a qualquer momento, sem aviso prévio.`
    },
    {
      icon: Scale,
      title: "3. Conta de Usuário",
      content: `Para utilizar determinados recursos do Serviço, você deve criar uma conta. Você é responsável por:
• Manter a confidencialidade de sua senha
• Todas as atividades que ocorrem sob sua conta
• Notificar-nos imediatamente sobre qualquer uso não autorizado

Você concorda em fornecer informações verdadeiras, precisas e completas durante o registro e manter essas informações atualizadas.`
    },
    {
      icon: AlertTriangle,
      title: "4. Uso Aceitável",
      content: `Você concorda em NÃO:
• Usar o Serviço para fins ilegais
• Tentar obter acesso não autorizado a sistemas ou redes
• Transmitir vírus, malware ou código malicioso
• Coletar dados de outros usuários sem consentimento
• Usar automação excessiva que sobrecarregue nossos servidores
• Violar direitos de propriedade intelectual

O descumprimento pode resultar em suspensão ou encerramento de sua conta.`
    },
    {
      icon: FileText,
      title: "5. Propriedade Intelectual",
      content: `Todo o conteúdo do AniHublist, incluindo textos, gráficos, logotipos, ícones e software, é propriedade do AniHublist ou de seus licenciadores e está protegido por leis de direitos autorais.

Os dados de anime exibidos são fornecidos através de APIs de terceiros (como AniList) e pertencem aos seus respectivos proprietários.

Você pode usar o Serviço apenas para fins pessoais e não comerciais, a menos que autorizado por escrito.`
    },
    {
      icon: Shield,
      title: "6. Uso da API",
      content: `Ao utilizar nossa API, você concorda com os seguintes termos:
• Rate limiting: Máximo de 60 requisições por minuto
• Não revender ou redistribuir dados da API comercialmente
• Incluir atribuição apropriada ao AniHublist
• Não usar a API para criar serviços concorrentes
• Manter sua API Key segura e confidencial

Reservamo-nos o direito de revogar o acesso à API a qualquer momento por violação destes termos.`
    },
    {
      icon: AlertTriangle,
      title: "7. Isenção de Garantias",
      content: `O Serviço é fornecido "COMO ESTÁ" e "CONFORME DISPONÍVEL", sem garantias de qualquer tipo, expressas ou implícitas.

Não garantimos que:
• O Serviço será ininterrupto ou livre de erros
• Os dados serão sempre precisos ou atualizados
• O Serviço atenderá às suas necessidades específicas

Você assume total responsabilidade pelo uso do Serviço.`
    },
    {
      icon: Scale,
      title: "8. Limitação de Responsabilidade",
      content: `Em nenhuma circunstância o AniHublist será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso ou outras perdas intangíveis.

Nossa responsabilidade total não excederá o valor pago por você ao AniHublist nos últimos 12 meses, se houver.`
    },
    {
      icon: FileText,
      title: "9. Modificações dos Termos",
      content: `Podemos revisar estes Termos de Serviço a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.

É sua responsabilidade revisar periodicamente estes termos. O uso continuado do Serviço após alterações constitui aceitação dos novos termos.`
    },
    {
      icon: Mail,
      title: "10. Contato",
      content: `Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco:

Email: legal@anihublist.vercel.app
Website: https://anihublist.vercel.app/contact

Responderemos a todas as consultas em até 5 dias úteis.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Termos de Serviço
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
                Bem-vindo ao AniHublist. Estes Termos de Serviço regem o uso do nosso site e serviços. 
                Por favor, leia atentamente antes de utilizar nossa plataforma.
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
                      <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
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

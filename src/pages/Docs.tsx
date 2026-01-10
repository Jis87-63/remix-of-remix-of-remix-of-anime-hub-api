import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Code2, 
  Key, 
  Zap, 
  Book, 
  Copy, 
  Check,
  ChevronRight,
  Terminal,
  Globe,
  Database,
  Sparkles,
  Lock,
  Rocket
} from "lucide-react";
import { useState } from "react";

const API_BASE_URL = "https://anihublistv.vercel.app";

const codeExamples = {
  javascript: `// Buscar lista de animes em alta
const response = await fetch('${API_BASE_URL}/api/v1/animes/trending', {
  headers: {
    'Authorization': 'Bearer ak_sua_api_key',
    'Content-Type': 'application/json'
  }
});
const animes = await response.json();
console.log(animes.data);`,
  
  python: `# Buscar lista de animes em alta
import requests

response = requests.get(
    '${API_BASE_URL}/api/v1/animes/trending',
    headers={
        'Authorization': 'Bearer ak_sua_api_key',
        'Content-Type': 'application/json'
    }
)
animes = response.json()
print(animes['data'])`,
  
  curl: `# Buscar lista de animes em alta
curl -X GET "${API_BASE_URL}/api/v1/animes/trending" \\
  -H "Authorization: Bearer ak_sua_api_key" \\
  -H "Content-Type: application/json"`,
};

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/animes/trending",
    description: "Lista animes em alta no momento",
    params: ["page", "limit"],
  },
  {
    method: "GET",
    path: "/api/v1/animes/popular",
    description: "Lista os animes mais populares de todos os tempos",
    params: ["page", "limit"],
  },
  {
    method: "GET",
    path: "/api/v1/animes/search",
    description: "Busca animes por título, gênero ou ano",
    params: ["q", "genre", "year", "status"],
  },
  {
    method: "GET",
    path: "/api/v1/animes/:id",
    description: "Busca detalhes de um anime específico",
    params: ["id"],
  },
  {
    method: "GET",
    path: "/api/v1/animes/season",
    description: "Lista animes da temporada atual",
    params: ["season", "year", "page", "limit"],
  },
  {
    method: "GET",
    path: "/api/v1/animes/genre/:genre",
    description: "Lista animes por gênero específico",
    params: ["genre", "page", "limit"],
  },
  {
    method: "GET",
    path: "/api/v1/animes/studio/:studio",
    description: "Lista animes por estúdio de produção",
    params: ["studio", "page", "limit"],
  },
];

const corsExample = `// Configuração CORS para chamadas externas
// Adicione estes headers nas suas requisições:

const headers = {
  'Authorization': 'Bearer ak_sua_api_key',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Exemplo com fetch
fetch('${API_BASE_URL}/api/v1/animes/trending', {
  method: 'GET',
  headers: headers,
  mode: 'cors'
})
.then(response => response.json())
.then(data => console.log(data));

// Exemplo com axios
import axios from 'axios';

const api = axios.create({
  baseURL: '${API_BASE_URL}/api/v1',
  headers: headers
});

api.get('/animes/trending').then(res => console.log(res.data));`;

const features = [
  {
    icon: Zap,
    title: "Ultra Rápido",
    description: "Respostas em menos de 50ms com cache global.",
  },
  {
    icon: Database,
    title: "Dados Completos",
    description: "50.000+ animes com informações detalhadas.",
  },
  {
    icon: Globe,
    title: "Alta Disponibilidade",
    description: "99.9% uptime com servidores globais.",
  },
  {
    icon: Lock,
    title: "Seguro",
    description: "Autenticação via API Key com rate limiting.",
  },
];

export default function Docs() {
  const [activeTab, setActiveTab] = useState<"javascript" | "python" | "curl">("javascript");
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">API v1.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">Construa apps incríveis com a </span>
              <span className="text-gradient">API de Animes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Integre dados de anime em seu projeto em minutos. 
              RESTful, rápida e bem documentada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="h-12 px-8 text-base" asChild>
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Key className="h-5 w-5 mr-2" />
                  {user ? "Gerenciar API Keys" : "Criar API Key Grátis"}
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                <Book className="h-5 w-5 mr-2" />
                Ver Documentação Completa
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-y border-border/50 bg-card/30">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Início Rápido
                </h2>
                <p className="text-muted-foreground">
                  Comece a usar a API em segundos
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { step: 1, title: "Crie uma conta", desc: "Registre-se gratuitamente" },
                { step: 2, title: "Gere sua API Key", desc: "No painel de controle" },
                { step: 3, title: "Faça requisições", desc: "Use os endpoints abaixo" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50"
                >
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary-foreground">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Code Example */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
              {/* Tabs */}
              <div className="flex items-center border-b border-border bg-secondary/30">
                {(["javascript", "python", "curl"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3.5 text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary bg-background/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "javascript" ? "JavaScript" : tab === "python" ? "Python" : "cURL"}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  onClick={handleCopy}
                  className="px-5 py-3.5 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </button>
              </div>

              {/* Code */}
              <pre className="p-6 overflow-x-auto">
                <code className="text-sm text-muted-foreground font-mono">
                  {codeExamples[activeTab]}
                </code>
              </pre>
            </div>

            {/* CORS Configuration */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Configuração CORS
                  </h3>
                  <p className="text-muted-foreground">
                    Para chamadas de outros sites e aplicações
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
                <div className="flex items-center border-b border-border bg-secondary/30 px-5 py-3.5">
                  <span className="text-sm font-medium text-foreground">Configuração CORS</span>
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="text-sm text-muted-foreground font-mono whitespace-pre-wrap">
                    {corsExample}
                  </code>
                </pre>
              </div>

              <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Headers CORS Habilitados</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code className="text-primary">Access-Control-Allow-Origin: *</code></li>
                  <li>• <code className="text-primary">Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS</code></li>
                  <li>• <code className="text-primary">Access-Control-Allow-Headers: Authorization, Content-Type, Accept</code></li>
                </ul>
                <p className="mt-3 text-sm text-muted-foreground">
                  A API suporta requisições de qualquer origem. Para segurança, sempre use sua API Key.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Terminal className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Endpoints Disponíveis
                </h2>
                <p className="text-muted-foreground">
                  Todos os recursos da API
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {endpoints.map((endpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-green-500/10 text-green-500">
                      {endpoint.method}
                    </span>
                    <div className="flex-1 min-w-0">
                      <code className="font-mono text-foreground font-medium">
                        {endpoint.path}
                      </code>
                      <p className="text-sm text-muted-foreground mt-1">
                        {endpoint.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {endpoint.params.map((param) => (
                          <span
                            key={param}
                            className="px-2.5 py-1 rounded-md text-xs bg-secondary text-muted-foreground font-mono"
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pronto para construir algo incrível?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Crie sua conta gratuita e comece a usar a API agora mesmo.
              Sem cartão de crédito necessário.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg" asChild>
              <Link to={user ? "/dashboard" : "/auth"}>
                <Key className="h-5 w-5 mr-2" />
                {user ? "Ir para Dashboard" : "Começar Gratuitamente"}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

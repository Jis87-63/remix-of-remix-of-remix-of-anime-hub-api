import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Key, 
  Plus, 
  Copy, 
  Check, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Activity,
  Clock,
  Loader2
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useApiKeys, useCreateApiKey, useToggleApiKey, useDeleteApiKey, ApiKey } from "@/hooks/useApiKeys";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: apiKeys, isLoading } = useApiKeys();
  const createApiKey = useCreateApiKey();
  const toggleApiKey = useToggleApiKey();
  const deleteApiKey = useDeleteApiKey();
  const { toast } = useToast();

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;

    try {
      const result = await createApiKey.mutateAsync(newKeyName);
      setCreatedKey(result.fullKey);
      setShowCreateDialog(false);
      setShowKeyDialog(true);
      setNewKeyName("");
      toast({
        title: "API Key criada!",
        description: "Copie e guarde sua chave em um lugar seguro.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar API Key",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    toast({
      title: "Copiado!",
      description: "A chave foi copiada para a área de transferência.",
    });
  };

  const handleToggleKey = async (key: ApiKey) => {
    try {
      await toggleApiKey.mutateAsync({ id: key.id, isActive: !key.is_active });
      toast({
        title: key.is_active ? "API Key desativada" : "API Key ativada",
        description: key.is_active 
          ? "A chave não poderá mais ser usada." 
          : "A chave pode ser usada novamente.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar API Key",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const handleDeleteKey = async () => {
    if (!keyToDelete) return;

    try {
      await deleteApiKey.mutateAsync(keyToDelete);
      setShowDeleteDialog(false);
      setKeyToDelete(null);
      toast({
        title: "API Key excluída",
        description: "A chave foi removida permanentemente.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao excluir API Key",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Gerencie suas API Keys e acompanhe o uso.
            </p>
          </motion.div>

          {/* API Keys Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">
                  API Keys
                </h2>
              </div>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Key
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : apiKeys && apiKeys.length > 0 ? (
              <div className="space-y-3">
                {apiKeys.map((key, index) => (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      key.is_active 
                        ? "bg-secondary/50 border-border" 
                        : "bg-muted/30 border-border/50 opacity-60"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground truncate">
                          {key.name}
                        </span>
                        {!key.is_active && (
                          <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                            Inativa
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="font-mono">{key.key_prefix}</span>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span>{key.requests_count} requests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(key.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleToggleKey(key)}
                      >
                        {key.is_active ? (
                          <ToggleRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setKeyToDelete(key.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Key className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Você ainda não tem nenhuma API Key
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar primeira key
                </Button>
              </div>
            )}
          </motion.div>

          {/* Usage Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <h3 className="font-medium text-foreground mb-2">
              Como usar sua API Key
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Inclua sua API Key no header de autorização das suas requisições:
            </p>
            <code className="block p-3 bg-background rounded-lg text-sm font-mono text-muted-foreground">
              Authorization: Bearer ak_sua_chave_aqui
            </code>
          </motion.div>
        </div>
      </div>

      {/* Create Key Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar nova API Key</DialogTitle>
            <DialogDescription>
              Dê um nome para identificar esta chave. O nome é apenas para sua referência.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Ex: Meu App, Projeto X, etc."
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="bg-secondary"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateKey}
              disabled={!newKeyName.trim() || createApiKey.isPending}
            >
              {createApiKey.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Criar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Show Key Dialog */}
      <Dialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sua API Key foi criada!</DialogTitle>
            <DialogDescription>
              Copie sua chave agora. Por segurança, ela não será exibida novamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
            <code className="flex-1 font-mono text-sm text-foreground break-all">
              {createdKey}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => createdKey && handleCopyKey(createdKey)}
            >
              {copiedKey === createdKey ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowKeyDialog(false)}>
              Entendi, copiei a chave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir API Key?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A chave será permanentemente excluída
              e qualquer aplicação usando ela deixará de funcionar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteKey}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}

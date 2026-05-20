/* ============================================================
   FAST FIX 72 — Admin Dashboard
   Gestion des clients et des réparations
   ============================================================ */

import { useState, useEffect } from "react";

const REPAIR_TYPES = [
  "Remplacement écran",
  "Remplacement batterie",
  "Remplacement connecteur",
  "Remplacement caméra",
  "Nettoyage/Dépoussiérage",
  "Remplacement boutons",
  "Réparation eau/humidité",
  "Remplacement vitre arrière",
  "Autre",
];
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState("clients");

  // Vérifier la session admin locale
  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      navigate("/admin");
    } else {
      setIsAdminLoggedIn(true);
    }
  }, [navigate]);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [isRepairDialogOpen, setIsRepairDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [editingRepair, setEditingRepair] = useState<any>(null);
  const [selectedRepairType, setSelectedRepairType] = useState<string>("");
  const [customRepairType, setCustomRepairType] = useState<string>("");
  const [clientSearchTerm, setClientSearchTerm] = useState<string>("");
  const [repairSearchTerm, setRepairSearchTerm] = useState<string>("");
  const [selectedClientForRepair, setSelectedClientForRepair] = useState<number | null>(null);

  // Queries
  const clientsQuery = trpc.clients.list.useQuery();
  const repairsQuery = trpc.repairs.list.useQuery();
  const quoteRequestsQuery = trpc.quoteRequests.list.useQuery();

  // Mutations
  const createClientMutation = trpc.clients.create.useMutation();
  const updateClientMutation = trpc.clients.update.useMutation();
  const deleteClientMutation = trpc.clients.delete.useMutation();
  const createRepairMutation = trpc.repairs.create.useMutation();
  const updateRepairMutation = trpc.repairs.update.useMutation();
  const deleteRepairMutation = trpc.repairs.delete.useMutation();
  const updateQuoteRequestMutation = trpc.quoteRequests.update.useMutation();
  const deleteQuoteRequestMutation = trpc.quoteRequests.delete.useMutation();

  // Attendre la vérification de session
  if (!isAdminLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  const handleSaveClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const clientData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string || undefined,
      address: formData.get("address") as string || undefined,
      city: formData.get("city") as string || undefined,
      postalCode: formData.get("postalCode") as string || undefined,
      notes: formData.get("notes") as string || undefined,
    };

    try {
      if (editingClient) {
        await updateClientMutation.mutateAsync({ id: editingClient.id, ...clientData });
        toast.success("Client modifié avec succès");
      } else {
        await createClientMutation.mutateAsync(clientData);
        toast.success("Client ajouté avec succès");
      }
      setIsClientDialogOpen(false);
      setEditingClient(null);
      clientsQuery.refetch();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error(editingClient ? "Erreur lors de la modification" : "Erreur lors de l'ajout");
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) return;
    try {
      await deleteClientMutation.mutateAsync({ id });
      toast.success("Client supprimé");
      clientsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSaveRepair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      if (editingRepair) {
        await updateRepairMutation.mutateAsync({
          id: editingRepair.id,
          deviceType: formData.get("deviceType") as string || undefined,
          deviceModel: formData.get("deviceModel") as string || undefined,
          issueDescription: formData.get("issueDescription") as string || undefined,
          repairType: formData.get("repairType") as string || undefined,
          status: (formData.get("status") as any) || undefined,
          estimatedCost: formData.get("estimatedCost") as string || undefined,
          actualCost: formData.get("actualCost") as string || undefined,
          notes: formData.get("notes") as string || undefined,
        });
        toast.success("Réparation modifiée avec succès");
      } else {
        await createRepairMutation.mutateAsync({
          clientId: parseInt(formData.get("clientId") as string),
          deviceType: formData.get("deviceType") as string,
          deviceModel: formData.get("deviceModel") as string,
          issueDescription: formData.get("issueDescription") as string,
          repairType: formData.get("repairType") as string || undefined,
          estimatedCost: formData.get("estimatedCost") as string || undefined,
          notes: formData.get("notes") as string || undefined,
        });
        toast.success("Réparation ajoutée avec succès");
      }
      setIsRepairDialogOpen(false);
      setEditingRepair(null);
      repairsQuery.refetch();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error(editingRepair ? "Erreur lors de la modification" : "Erreur lors de l'ajout");
    }
  };

  const handleDeleteRepair = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réparation ?")) return;
    try {
      await deleteRepairMutation.mutateAsync({ id });
      toast.success("Réparation supprimée");
      repairsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  // Filter clients based on search term
  const filteredClients = clientsQuery.data?.filter(client =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(clientSearchTerm.toLowerCase())
  ) || [];

  // Filter repairs based on search term
  const filteredRepairs = repairsQuery.data?.filter(repair => {
    const client = clientsQuery.data?.find(c => c.id === repair.clientId);
    const clientName = client ? `${client.firstName} ${client.lastName}` : "";
    return clientName.toLowerCase().includes(repairSearchTerm.toLowerCase()) ||
           repair.deviceModel.toLowerCase().includes(repairSearchTerm.toLowerCase()) ||
           repair.issueDescription.toLowerCase().includes(repairSearchTerm.toLowerCase());
  }) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord admin</h1>
          <p className="text-muted-foreground">Gérez vos clients, réparations et demandes de devis</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="repairs">Réparations</TabsTrigger>
            <TabsTrigger value="quotes">Demandes de devis</TabsTrigger>
          </TabsList>

          {/* Quote Requests Tab */}
          <TabsContent value="quotes" className="space-y-4">
            <h2 className="text-2xl font-bold">Demandes de devis</h2>
            {quoteRequestsQuery.isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : quoteRequestsQuery.data?.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucune demande de devis pour le moment
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {quoteRequestsQuery.data?.map((quote) => (
                    <Card key={quote.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{quote.name}</h3>
                            <p className="text-sm text-muted-foreground">{quote.email}</p>
                            {quote.phone && <p className="text-sm text-muted-foreground">{quote.phone}</p>}
                            <p className="text-sm text-muted-foreground mt-2"><strong>Appareil :</strong> {quote.device}</p>
                            <p className="text-sm text-muted-foreground"><strong>Problème :</strong> {quote.problem}</p>
                            {quote.message && <p className="text-sm text-muted-foreground mt-2"><strong>Message :</strong> {quote.message}</p>}
                            <div className="mt-2 flex gap-2 flex-wrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                quote.status === "new" ? "bg-blue-100 text-blue-800" :
                                quote.status === "contacted" ? "bg-yellow-100 text-yellow-800" :
                                quote.status === "converted" ? "bg-green-100 text-green-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {quote.status === "new" ? "Nouveau" :
                                 quote.status === "contacted" ? "Contacté" :
                                 quote.status === "converted" ? "Converti" :
                                 "Rejeté"}
                              </span>
                              <span className="text-xs text-muted-foreground">{new Date(quote.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Select value={quote.status} onValueChange={(value) => {
                              updateQuoteRequestMutation.mutateAsync({ id: quote.id, status: value as any }).then(() => {
                                quoteRequestsQuery.refetch();
                                toast.success("Statut mis à jour");
                              }).catch(() => toast.error("Erreur lors de la mise à jour"));
                            }}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Nouveau</SelectItem>
                                <SelectItem value="contacted">Contacté</SelectItem>
                                <SelectItem value="converted">Converti</SelectItem>
                                <SelectItem value="rejected">Rejeté</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => {
                                if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
                                  deleteQuoteRequestMutation.mutateAsync({ id: quote.id }).then(() => {
                                    quoteRequestsQuery.refetch();
                                    toast.success("Demande supprimée");
                                  }).catch(() => toast.error("Erreur lors de la suppression"));
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des clients</h2>
              <Dialog open={isClientDialogOpen} onOpenChange={(open) => {
                setIsClientDialogOpen(open);
                if (!open) setEditingClient(null);
              }}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingClient(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un client
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingClient ? "Modifier le client" : "Ajouter un nouveau client"}</DialogTitle>
                    <DialogDescription>
                      {editingClient ? "Modifiez les informations du client" : "Remplissez les informations du client"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveClient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input id="firstName" name="firstName" defaultValue={editingClient?.firstName} required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input id="lastName" name="lastName" defaultValue={editingClient?.lastName} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" name="phone" type="tel" defaultValue={editingClient?.phone} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={editingClient?.email} />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" name="address" defaultValue={editingClient?.address} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" name="city" defaultValue={editingClient?.city} />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input id="postalCode" name="postalCode" defaultValue={editingClient?.postalCode} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" name="notes" defaultValue={editingClient?.notes} />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingClient ? "Modifier le client" : "Ajouter le client"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search bar for clients */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou téléphone..."
                value={clientSearchTerm}
                onChange={(e) => setClientSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {clientsQuery.isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredClients.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  {clientSearchTerm ? "Aucun client trouvé" : "Aucun client pour le moment"}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredClients.map((client) => (
                  <Card key={client.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold">{client.firstName} {client.lastName}</h3>
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                          {client.email && <p className="text-sm text-muted-foreground">{client.email}</p>}
                          {client.address && <p className="text-sm text-muted-foreground">{client.address}</p>}
                          {client.city && <p className="text-sm text-muted-foreground">{client.city} {client.postalCode}</p>}
                          {client.notes && <p className="text-sm text-muted-foreground mt-2"><strong>Notes :</strong> {client.notes}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setEditingClient(client);
                              setIsClientDialogOpen(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Repairs Tab */}
          <TabsContent value="repairs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des réparations</h2>
              <Dialog open={isRepairDialogOpen} onOpenChange={(open) => {
                setIsRepairDialogOpen(open);
                if (!open) setEditingRepair(null);
              }}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingRepair(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une réparation
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingRepair ? "Modifier la réparation" : "Ajouter une nouvelle réparation"}</DialogTitle>
                    <DialogDescription>
                      {editingRepair ? "Modifiez les informations de la réparation" : "Remplissez les informations de la réparation"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSaveRepair} className="space-y-4">
                    {!editingRepair && (
                      <>
                        <div>
                          <Label htmlFor="clientId">Client *</Label>
                          <div className="space-y-2">
                            <Input
                              placeholder="Rechercher un client..."
                              value={clientSearchTerm}
                              onChange={(e) => setClientSearchTerm(e.target.value)}
                            />
                            <Select name="clientId" value={selectedClientForRepair?.toString() || ""} onValueChange={(value) => setSelectedClientForRepair(parseInt(value))} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un client" />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredClients.map((client) => (
                                  <SelectItem key={client.id} value={client.id.toString()}>
                                    {client.firstName} {client.lastName} ({client.phone})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="deviceType">Type d'appareil *</Label>
                            <Input id="deviceType" name="deviceType" placeholder="iPhone, Samsung..." required />
                          </div>
                          <div>
                            <Label htmlFor="deviceModel">Modèle *</Label>
                            <Input id="deviceModel" name="deviceModel" placeholder="iPhone 14..." required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="issueDescription">Description du problème *</Label>
                          <Textarea id="issueDescription" name="issueDescription" required />
                        </div>
                        <div>
                          <Label htmlFor="repairType">Type de réparation *</Label>
                          <Select value={selectedRepairType} onValueChange={(value) => {
                            setSelectedRepairType(value);
                            setCustomRepairType("");
                          }} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              {REPAIR_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <input type="hidden" name="repairType" value={selectedRepairType === "Autre" ? customRepairType : selectedRepairType} />
                        </div>
                        {selectedRepairType === "Autre" && (
                          <div>
                            <Label htmlFor="customRepairType">Précisez le type de réparation *</Label>
                            <Input 
                              id="customRepairType" 
                              placeholder="Ex: Remplacement microphone" 
                              value={customRepairType}
                              onChange={(e) => setCustomRepairType(e.target.value)}
                              required
                            />
                          </div>
                        )}
                        <div>
                          <Label htmlFor="estimatedCost">Coût estimé</Label>
                          <Input id="estimatedCost" name="estimatedCost" type="number" step="0.01" />
                        </div>
                      </>
                    )}
                    {editingRepair && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="deviceType">Type d'appareil</Label>
                            <Input id="deviceType" name="deviceType" defaultValue={editingRepair?.deviceType} />
                          </div>
                          <div>
                            <Label htmlFor="deviceModel">Modèle</Label>
                            <Input id="deviceModel" name="deviceModel" defaultValue={editingRepair?.deviceModel} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="issueDescription">Description du problème</Label>
                          <Textarea id="issueDescription" name="issueDescription" defaultValue={editingRepair?.issueDescription} />
                        </div>
                        <div>
                          <Label htmlFor="repairType">Type de réparation</Label>
                          <Input id="repairType" name="repairType" defaultValue={editingRepair?.repairType} />
                        </div>
                        <div>
                          <Label htmlFor="status">Statut *</Label>
                          <Select name="status" defaultValue={editingRepair?.status} required>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="waiting_for_repair">En attente de réparation</SelectItem>
                              <SelectItem value="waiting_for_client">En attente du client</SelectItem>
                              <SelectItem value="in_progress">En cours</SelectItem>
                              <SelectItem value="completed">Complétée</SelectItem>
                              <SelectItem value="ready_for_pickup">Prête à récupérer</SelectItem>
                              <SelectItem value="cancelled">Annulée</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="estimatedCost">Coût estimé</Label>
                            <Input id="estimatedCost" name="estimatedCost" type="number" step="0.01" defaultValue={editingRepair?.estimatedCost} />
                          </div>
                          <div>
                            <Label htmlFor="actualCost">Coût réel</Label>
                            <Input id="actualCost" name="actualCost" type="number" step="0.01" defaultValue={editingRepair?.actualCost} />
                          </div>
                        </div>
                      </>
                    )}
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" name="notes" defaultValue={editingRepair?.notes} />
                    </div>
                    <Button type="submit" className="w-full">
                      {editingRepair ? "Modifier la réparation" : "Ajouter la réparation"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search bar for repairs */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par client, modèle ou problème..."
                value={repairSearchTerm}
                onChange={(e) => setRepairSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {repairsQuery.isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredRepairs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  {repairSearchTerm ? "Aucune réparation trouvée" : "Aucune réparation pour le moment"}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredRepairs.map((repair) => {
                  const client = clientsQuery.data?.find(c => c.id === repair.clientId);
                  return (
                    <Card key={repair.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{repair.deviceType} {repair.deviceModel}</h3>
                            <p className="text-sm text-muted-foreground">Client: {client?.firstName} {client?.lastName}</p>
                            <p className="text-sm text-muted-foreground">{repair.issueDescription}</p>
                            <div className="mt-2 flex gap-4 text-sm flex-wrap">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                repair.status === "completed" ? "bg-green-100 text-green-800" : 
                                repair.status === "ready_for_pickup" ? "bg-green-100 text-green-800" :
                                repair.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                                repair.status === "cancelled" ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {repair.status === "waiting_for_repair" ? "En attente de réparation" :
                                 repair.status === "waiting_for_client" ? "En attente du client" :
                                 repair.status === "in_progress" ? "En cours" :
                                 repair.status === "completed" ? "Complétée" :
                                 repair.status === "ready_for_pickup" ? "Prête à récupérer" :
                                 repair.status === "cancelled" ? "Annulée" : repair.status}
                              </span>
                              {repair.repairType && <span><strong>Type:</strong> {repair.repairType}</span>}
                              {repair.estimatedCost && <span>Coût estimé: {repair.estimatedCost}€</span>}
                              {repair.actualCost && <span>Coût réel: {repair.actualCost}€</span>}
                            </div>
                            {repair.notes && <p className="text-sm text-muted-foreground mt-2"><strong>Notes:</strong> {repair.notes}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setEditingRepair(repair);
                                setIsRepairDialogOpen(true);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteRepair(repair.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

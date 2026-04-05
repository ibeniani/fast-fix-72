/* ============================================================
   FAST FIX 72 — Admin Dashboard
   Gestion des clients et des réparations
   ============================================================ */

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
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
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [selectedTab, setSelectedTab] = useState("clients");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Queries
  const clientsQuery = trpc.clients.list.useQuery();
  const repairsQuery = trpc.repairs.list.useQuery();

  // Mutations
  const createClientMutation = trpc.clients.create.useMutation();
  const updateClientMutation = trpc.clients.update.useMutation();
  const deleteClientMutation = trpc.clients.delete.useMutation();
  const createRepairMutation = trpc.repairs.create.useMutation();
  const updateRepairMutation = trpc.repairs.update.useMutation();
  const deleteRepairMutation = trpc.repairs.delete.useMutation();

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Vous n'avez pas les permissions pour accéder au tableau de bord admin.
            </p>
            <Button onClick={() => navigate("/")} className="w-full">
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createClientMutation.mutateAsync({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        postalCode: formData.get("postalCode") as string,
        notes: formData.get("notes") as string,
      });
      toast.success("Client ajouté avec succès");
      setIsDialogOpen(false);
      clientsQuery.refetch();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Erreur lors de l'ajout du client");
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await deleteClientMutation.mutateAsync({ id });
      toast.success("Client supprimé");
      clientsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleAddRepair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createRepairMutation.mutateAsync({
        clientId: parseInt(formData.get("clientId") as string),
        deviceType: formData.get("deviceType") as string,
        deviceModel: formData.get("deviceModel") as string,
        issueDescription: formData.get("issueDescription") as string,
        repairType: formData.get("repairType") as string,
        estimatedCost: formData.get("estimatedCost") as string,
        notes: formData.get("notes") as string,
      });
      toast.success("Réparation ajoutée avec succès");
      setIsDialogOpen(false);
      repairsQuery.refetch();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la réparation");
    }
  };

  const handleDeleteRepair = async (id: number) => {
    try {
      await deleteRepairMutation.mutateAsync({ id });
      toast.success("Réparation supprimée");
      repairsQuery.refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord admin</h1>
          <p className="text-muted-foreground">Gérez vos clients et vos réparations</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList>
            <TabsTrigger value="clients">Clients ({clientsQuery.data?.length || 0})</TabsTrigger>
            <TabsTrigger value="repairs">Réparations ({repairsQuery.data?.length || 0})</TabsTrigger>
          </TabsList>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des clients</h2>
              <Dialog open={isDialogOpen && selectedTab === "clients"} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setSelectedTab("clients"); setEditingId(null); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un client
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau client</DialogTitle>
                    <DialogDescription>Remplissez les informations du client</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddClient} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input id="firstName" name="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input id="lastName" name="lastName" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Input id="address" name="address" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input id="city" name="city" />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input id="postalCode" name="postalCode" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" name="notes" />
                    </div>
                    <Button type="submit" className="w-full">Ajouter le client</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {clientsQuery.isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : clientsQuery.data?.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucun client pour le moment
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {clientsQuery.data?.map((client) => (
                  <Card key={client.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{client.firstName} {client.lastName}</h3>
                          <p className="text-sm text-muted-foreground">{client.phone}</p>
                          {client.email && <p className="text-sm text-muted-foreground">{client.email}</p>}
                          {client.address && <p className="text-sm text-muted-foreground">{client.address}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteClient(client.id)}>
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
              <Dialog open={isDialogOpen && selectedTab === "repairs"} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setSelectedTab("repairs"); setEditingId(null); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une réparation
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Ajouter une nouvelle réparation</DialogTitle>
                    <DialogDescription>Remplissez les informations de la réparation</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddRepair} className="space-y-4">
                    <div>
                      <Label htmlFor="clientId">Client *</Label>
                      <Select name="clientId" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un client" />
                        </SelectTrigger>
                        <SelectContent>
                          {clientsQuery.data?.map((client) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.firstName} {client.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="repairType">Type de réparation</Label>
                      <Input id="repairType" name="repairType" placeholder="Remplacement écran..." />
                    </div>
                    <div>
                      <Label htmlFor="estimatedCost">Coût estimé</Label>
                      <Input id="estimatedCost" name="estimatedCost" type="number" step="0.01" />
                    </div>
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" name="notes" />
                    </div>
                    <Button type="submit" className="w-full">Ajouter la réparation</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {repairsQuery.isLoading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : repairsQuery.data?.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Aucune réparation pour le moment
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {repairsQuery.data?.map((repair) => {
                  const client = clientsQuery.data?.find(c => c.id === repair.clientId);
                  return (
                    <Card key={repair.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{repair.deviceType} {repair.deviceModel}</h3>
                            <p className="text-sm text-muted-foreground">Client: {client?.firstName} {client?.lastName}</p>
                            <p className="text-sm text-muted-foreground">{repair.issueDescription}</p>
                            <div className="mt-2 flex gap-4 text-sm">
                              <span className={`px-2 py-1 rounded ${repair.status === "completed" ? "bg-green-100 text-green-800" : repair.status === "in_progress" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                                {repair.status}
                              </span>
                              {repair.estimatedCost && <span>Coût estimé: {repair.estimatedCost}€</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteRepair(repair.id)}>
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

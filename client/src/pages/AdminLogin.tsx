import { useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function AdminLogin() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: "#0D1117" }}>
        <Card>
          <CardContent className="p-8">
            <p style={{ color: "rgba(230, 237, 243, 0.7)" }}>Chargement...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: "#0D1117" }}>
      <Card className="w-full max-w-md" style={{ background: "rgba(13, 17, 23, 0.8)", border: "1px solid rgba(0, 212, 255, 0.2)" }}>
        <CardHeader>
          <CardTitle style={{ color: "#00D4FF" }}>Accès Admin</CardTitle>
          <CardDescription style={{ color: "rgba(230, 237, 243, 0.6)" }}>
            Connectez-vous pour accéder au tableau de bord d'administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAuthenticated && user?.role !== "admin" ? (
            <div className="text-center">
              <p className="text-sm mb-4" style={{ color: "rgba(230, 237, 243, 0.7)" }}>
                Votre compte n'a pas les permissions d'administrateur.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="w-full"
                style={{ background: "#00D4FF", color: "#0D1117" }}
              >
                Retour à l'accueil
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm mb-6" style={{ color: "rgba(230, 237, 243, 0.7)" }}>
                Veuillez vous connecter avec votre compte administrateur
              </p>
              <a
                href={getLoginUrl()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                  color: "#0D1117",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <LogIn size={16} />
                Se connecter
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

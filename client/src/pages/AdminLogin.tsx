import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Vérifier si déjà connecté
  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession");
    if (adminSession) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Identifiants de démonstration
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminSession", JSON.stringify({ username, loginTime: new Date() }));
      navigate("/admin/dashboard");
    } else {
      setError("Identifiant ou mot de passe incorrect");
      setLoading(false);
    }
  };

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
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded" style={{ background: "rgba(255, 59, 48, 0.1)", border: "1px solid rgba(255, 59, 48, 0.3)" }}>
                <AlertCircle size={16} style={{ color: "#FF3B30" }} />
                <p className="text-sm" style={{ color: "#FF3B30" }}>
                  {error}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2" style={{ color: "rgba(230, 237, 243, 0.8)" }}>
                Identifiant
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  background: "rgba(13, 17, 23, 0.5)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  color: "rgba(230, 237, 243, 0.9)",
                }}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: "rgba(230, 237, 243, 0.8)" }}>
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded text-sm"
                style={{
                  background: "rgba(13, 17, 23, 0.5)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  color: "rgba(230, 237, 243, 0.9)",
                }}
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                color: "#0D1117",
                fontWeight: 600,
              }}
              disabled={loading}
            >
              <LogIn size={16} />
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <p className="text-xs mt-4 text-center" style={{ color: "rgba(230, 237, 243, 0.5)" }}>
            Identifiants de démonstration : admin / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

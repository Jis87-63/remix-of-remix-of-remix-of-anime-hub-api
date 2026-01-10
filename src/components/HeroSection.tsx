import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="pt-24 pb-12">
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Descubra e explore animes
          </h1>
          <p className="text-muted-foreground mb-6">
            Acesse nossa API para integrar dados de animes em seu projeto.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar anime..."
              className="w-full h-10 pl-9 pr-4 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

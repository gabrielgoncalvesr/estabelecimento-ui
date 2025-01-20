import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CampanhaCardProps {
  campanha: {
    id: number;
    nome: string;
    descricao: string;
    estabelecimentoNome?: string;
    dataInicio: string;
    dataFim: string;
    dataCadastro: string;
    status: string;
    imagemUrl: string;
  };
}

export function CampanhaCard({ campanha }: CampanhaCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={campanha.imagemUrl}
          alt={campanha.nome}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-purple-600 mb-1 truncate">{campanha.nome}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{campanha.descricao}</p>
        {campanha.estabelecimentoNome && (
          <p className="text-gray-600 text-sm mb-2">
            Estabelecimento: {campanha.estabelecimentoNome}
          </p>
        )}
        <p className="text-gray-600 text-sm mb-2">
          Período: {new Date(campanha.dataInicio).toLocaleDateString()} - {new Date(campanha.dataFim).toLocaleDateString()}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span 
            className={`px-2 py-1 text-xs rounded-full ${
              campanha.status === "Ativa" 
                ? "bg-green-100 text-green-800"
                : campanha.status === "Inativa"
                ? "bg-gray-100 text-gray-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {campanha.status}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(campanha.dataCadastro).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

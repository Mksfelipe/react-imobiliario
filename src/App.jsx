import { useEffect, useState } from "react";

function App() {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    fetch("/api/imoveis") // 🔥 Pega os dados do Worker
      .then((res) => res.json())
      .then((data) => setImoveis(data.imoveis))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Lista de Imóveis</h1>
      <ul>
        {imoveis.map((imovel) => (
          <li key={imovel.id}>
            {imovel.nome} - R$ {imovel.preco.toLocaleString("pt-BR")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

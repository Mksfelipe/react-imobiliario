import React, { useEffect, useState } from 'react';
import './App.css'; // Opcional: Adicione um arquivo CSS para estilização

function App() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImoveis() {
      try {
        setLoading(true);
        // Faça a chamada para o seu endpoint de API que busca os imóveis
        const response = await fetch('/api/imoveis'); 

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setImoveis(data.imoveis); // Assumindo que a API retorna um objeto { imoveis: [...] }
      } catch (err) {
        setError("Não foi possível carregar os imóveis. " + err.message);
        console.error("Erro ao buscar imóveis:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImoveis();
  }, []); // O array vazio garante que o useEffect rode apenas uma vez ao montar o componente

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Você pode substituir o src da imagem pelo seu próprio logo */}
        <img src="https://img.icons8.com/ios-filled/100/2e86de/home.png" alt="Logo Imobiliária Sonho" className="app-logo" />
        <h1>Imobiliária Sonho</h1>
        <p>Encontre seu lar perfeito, com facilidade e segurança!</p>
      </header>

      <nav className="app-nav">
        <a href="#imoveis">Imóveis Disponíveis</a>
        <a href="#sobre">Sobre Nós</a>
        <a href="#contato">Contato</a>
      </nav>

      <main className="app-main">
        <section id="imoveis" className="imoveis-list-section">
          <h2>Imóveis Disponíveis</h2>
          {loading && <p>Carregando imóveis...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="imoveis-grid">
            {imoveis.length === 0 && !loading && !error && (
              <p>Nenhum imóvel encontrado no momento.</p>
            )}
            {imoveis.map(imovel => (
              <div key={imovel.id} className="imovel-card">
                <h3>{imovel.titulo}</h3>
                <p><strong>Tipo:</strong> {imovel.tipo}</p>
                <p><strong>Preço:</strong> R$ {parseFloat(imovel.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>Endereço:</strong> {imovel.endereco}, {imovel.cidade} - {imovel.estado}</p>
                {imovel.quartos && <p><strong>Quartos:</strong> {imovel.quartos}</p>}
                {imovel.banheiros && <p><strong>Banheiros:</strong> {imovel.banheiros}</p>}
                {imovel.area_m2 && <p><strong>Área:</strong> {imovel.area_m2} m²</p>}
                <p className="imovel-status">Status: {imovel.status}</p>
                <p className="imovel-descricao">{imovel.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seções "Sobre Nós" e "Contato" podem ser componentes separados ou expandidos aqui */}
        <section id="sobre" className="about-section">
          <h2>Sobre a Imobiliária Sonho</h2>
          <p>Somos especialistas em transformar sonhos em realidade! Com mais de 10 anos de experiência, oferecemos atendimento personalizado, transparência e uma ampla variedade de imóveis para compra, venda e aluguel. Nossa missão é ajudar você a encontrar o lar perfeito, com facilidade e segurança.</p>
        </section>

        <section id="contato" className="contact-form-section">
            <h2>Entre em Contato</h2>
            <p>Preencha o formulário e um de nossos consultores entrará em contato!</p>
            {/* Aqui você pode incluir o formulário que criamos anteriormente */}
            {/* Ou criar um novo componente <ContactForm /> */}
            <form className="contact-form">
              <input type="text" placeholder="Seu nome" required />
              <input type="email" placeholder="Seu e-mail" required />
              <textarea placeholder="Sua mensagem ou tipo de imóvel desejado"></textarea>
              <button type="submit">Enviar Mensagem</button>
            </form>
        </section>

      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Imobiliária Sonho. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
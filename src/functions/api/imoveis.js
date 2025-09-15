export async function onRequestGet({ env }) {
  try {
    // Consulta todos os imóveis da tabela 'imoveis'
    const { results } = await env.DB.prepare(
      "SELECT * FROM imoveis"
    ).all();

    return new Response(JSON.stringify({ imoveis: results }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    return new Response(JSON.stringify({ error: "Erro interno do servidor ao buscar imóveis." }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

// Pages Functions exporta uma função default com o handler do método HTTP
export default {
  onRequestGet
};
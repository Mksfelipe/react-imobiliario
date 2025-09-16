export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      if (url.pathname === "/api/imoveis") {
        const res = await env.IMOVEIS_DB.prepare("SELECT * FROM imoveis").all();
        return new Response(JSON.stringify({ imoveis: res.results }), {
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response("Not Found", { status: 404 });
    },
  };
  
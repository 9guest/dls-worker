export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const path = url.pathname;
  
      // 首页
      if (path === "/" || path === "/index") {
        return new Response(
          `
          <html>
            <head><title>Dlsite Worker</title></head>
            <body style="font-family: sans-serif; padding: 2em;">
              <h2>✅ DLsite API Worker 部署成功！</h2>
              <p>可用路径：</p>
              <ul>
                <li><code>/full/:rjc</code> - 原始 DLSite API 回传</li>
                <li><code>/pretty/:rjc</code> - 精简美化过的数据</li>
              </ul>
            </body>
          </html>
          `,
          { headers: { "Content-Type": "text/html; charset=UTF-8" } }
        );
      }
  
      // 原始 /full/:rjc 路由
      if (path.startsWith("/full/")) {
        const rjc = path.split("/").pop().toUpperCase();
        const apiUrl = `https://www.dlsite.com/maniax/api/=/product.json?workno=${rjc}`;
  
        try {
          const res = await fetch(apiUrl);
          const data = await res.json();
  
          if (data.length > 0) {
            return new Response(JSON.stringify(data), {
              headers: { "Content-Type": "application/json" },
            });
          } else {
            return new Response(JSON.stringify({ message: "Not Found" }), { status: 404 });
          }
        } catch (e) {
          return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
        }
      }
  
      // 精简 /pretty/:rjc 路由
      if (path.startsWith("/pretty/")) {
        const rjc = path.split("/").pop().toUpperCase();
        const apiUrl = `https://www.dlsite.com/maniax/api/=/product.json?workno=${rjc}`;
  
        try {
          const res = await fetch(apiUrl);
          const data = await res.json();
  
          if (data.length > 0) {
            const thisData = data[0];
  
            const createdBy = thisData.creaters?.created_by?.map(c => c.name) || [];
            const scenarioBy = thisData.creaters?.scenario_by?.map(c => c.name) || [];
            const illustBy = thisData.creaters?.illust_by?.map(c => c.name) || [];
            const voiceBy = thisData.creaters?.voice_by?.map(c => c.name) || [];
            const genres = thisData.genres?.map(g => g.name) || [];
  
            const refined = {
              age_category: thisData.age_category_string,
              product_id: thisData.workno,
              product_name: thisData.product_name,
              product_image: thisData.image_main.url,
              product_price: thisData.price,
              product_official_price: thisData.official_price,
              created_by: createdBy,
              scenario_by: scenarioBy,
              illust_by: illustBy,
              voice_by: voiceBy,
              genres: genres,
              update_date: thisData.update_date,
              regist_date: thisData.regist_date,
            };
  
            return new Response(JSON.stringify(refined), {
              headers: { "Content-Type": "application/json" },
            });
          } else {
            return new Response(JSON.stringify({ message: "Not Found" }), { status: 404 });
          }
        } catch (e) {
          return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
        }
      }
  
      // Fallback
      return new Response("404 Not Found", { status: 404 });
    },
  };
  
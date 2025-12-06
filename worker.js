const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST",
};

const TARGETS = {
  users: "https://users.roblox.com",
  groups: "https://groups.roblox.com",
  friends: "https://friends.roblox.com",
  thumbnails: "https://thumbnails.roblox.com",
  www: "https://www.roblox.com",
};

async function handleProxy(request, env) {
  const url = new URL(request.url);
  const [, , service, ...rest] = url.pathname.split("/");

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (!TARGETS[service]) {
    return new Response("Unknown proxy service", { status: 400, headers: CORS_HEADERS });
  }

  if (!["GET", "HEAD", "POST"].includes(request.method)) {
    return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
  }

  const targetUrl = new URL(`/${rest.join("/")}${url.search}`, TARGETS[service]);
  const outboundInit = {
    method: request.method,
    headers: request.headers,
    redirect: "follow",
  };

  if (request.method === "POST") {
    outboundInit.body = request.body;
  }

  const outbound = new Request(targetUrl.toString(), outboundInit);

  const response = await fetch(outbound);
  const headers = new Headers(response.headers);
  Object.entries(CORS_HEADERS).forEach(([key, value]) => headers.set(key, value));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/proxy/")) {
      return handleProxy(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

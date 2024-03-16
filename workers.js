addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const requestUrl = new URL(request.url)
  let targetUrl;

  if (requestUrl.hostname === 'apitmdb.prisma.ws') {
    targetUrl = `https://api.themoviedb.org/3${requestUrl.pathname}${requestUrl.search}`
  } else if (requestUrl.hostname === 'img.prisma.ws') {
    targetUrl = `https://image.tmdb.org/t/p/original${requestUrl.pathname}`
  } else {
    return new Response('Invalid hostname', { status: 400 }) 
  }

  const init = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, init)
  }

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  })

  const responseHeaders = new Headers(response.headers)
  responseHeaders.set('Access-Control-Allow-Origin', '*')

  return new Response(response.body, {
    headers: responseHeaders,
    status: response.status,
    statusText: response.statusText,
  })
}

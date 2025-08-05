
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const slug = url.pathname.slice(1)

    if (!slug) return new Response("Not found", { status: 404 })

    const apiUrl = `https://shortlink.lrb.dev.br/${slug}`

    try {
      const res = await fetch(apiUrl)

      if (res.status !== 200) return new Response("Link not found", { status: 404 })

      const data = await res.json()
      const originalUrl = data.originalUrl || data.url

      return Response.redirect(originalUrl, 302)
    } catch (err) {
      return new Response("Internal error", { status: 500 })
    }
  }
}
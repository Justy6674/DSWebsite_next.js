import { NextResponse } from 'next/server'

const MUX_TOKEN_ID = process.env.MUX_TOKEN_ID
const MUX_TOKEN_SECRET = process.env.MUX_TOKEN_SECRET

export async function POST(req: Request) {
  try {
    if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
      return NextResponse.json({ error: 'Mux credentials not configured' }, { status: 500 })
    }

    const body = await req.json().catch(() => ({}))
    const corsOrigin = body?.corsOrigin || 'https://www.downscale.com.au'

    const res = await fetch('https://api.mux.com/video/v1/uploads', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cors_origin: corsOrigin,
        new_asset_settings: { playback_policy: ['signed'] },
        timeout: 3600
      })
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: 500 })
    }

    const json = await res.json()
    return NextResponse.json({ id: json.data?.id, url: json.data?.url })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}



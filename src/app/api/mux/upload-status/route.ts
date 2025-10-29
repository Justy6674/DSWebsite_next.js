import { NextResponse } from 'next/server'

const MUX_TOKEN_ID = process.env.MUX_TOKEN_ID
const MUX_TOKEN_SECRET = process.env.MUX_TOKEN_SECRET

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const uploadId = searchParams.get('uploadId')
    if (!uploadId) return NextResponse.json({ error: 'uploadId required' }, { status: 400 })
    if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) return NextResponse.json({ error: 'Mux not configured' }, { status: 500 })

    const auth = 'Basic ' + Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString('base64')
    const up = await fetch(`https://api.mux.com/video/v1/uploads/${uploadId}`, { headers: { Authorization: auth } })
    const upJson = await up.json()

    const status = upJson?.data?.status
    const assetId = upJson?.data?.asset_id

    let playbackId: string | null = null
    if (assetId) {
      const assetRes = await fetch(`https://api.mux.com/video/v1/assets/${assetId}`, { headers: { Authorization: auth } })
      const assetJson = await assetRes.json()
      playbackId = assetJson?.data?.playback_ids?.[0]?.id || null
    }

    return NextResponse.json({ status, assetId, playbackId })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}



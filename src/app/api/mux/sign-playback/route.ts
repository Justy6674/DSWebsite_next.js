import { NextResponse } from 'next/server'
import crypto from 'crypto'

const MUX_SIGNING_KEY_ID = process.env.MUX_SIGNING_KEY_ID
const MUX_SIGNING_PRIVATE_KEY = process.env.MUX_SIGNING_PRIVATE_KEY // PEM

function base64url(input: Buffer | string) {
  return Buffer.from(input).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const playbackId = searchParams.get('playbackId')
    const aud = searchParams.get('aud') || 'https://www.downscale.com.au'
    if (!playbackId) return NextResponse.json({ error: 'playbackId required' }, { status: 400 })

    if (!MUX_SIGNING_KEY_ID || !MUX_SIGNING_PRIVATE_KEY) {
      // Fallback: unsigned public URL
      return NextResponse.json({ url: `https://stream.mux.com/${playbackId}.m3u8`, token: null })
    }

    const header = { alg: 'RS256', typ: 'JWT', kid: MUX_SIGNING_KEY_ID }
    const now = Math.floor(Date.now() / 1000)
    const payload = { sub: playbackId, aud, exp: now + 300 } // 5 min TTL

    const encHeader = base64url(JSON.stringify(header))
    const encPayload = base64url(JSON.stringify(payload))
    const signingInput = `${encHeader}.${encPayload}`
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(signingInput)
    sign.end()
    const signature = base64url(sign.sign(MUX_SIGNING_PRIVATE_KEY))
    const token = `${signingInput}.${signature}`

    return NextResponse.json({ url: `https://stream.mux.com/${playbackId}.m3u8?token=${token}`, token })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 })
  }
}



import type { VercelRequest, VercelResponse } from '@vercel/node';

const WHMCS_PROXY_URL = process.env.WHMCS_PROXY_URL || 'http://92.113.38.153:3099/api/whmcs';
const WHMCS_PROXY_SECRET = process.env.WHMCS_PROXY_SECRET || 'mvdstudio-proxy-2024-secret';
const WHMCS_IDENTIFIER = process.env.WHMCS_IDENTIFIER!;
const WHMCS_SECRET = process.env.WHMCS_SECRET!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, ...params } = req.body;

  if (!action) {
    return res.status(400).json({ error: 'Missing action' });
  }

  try {
    const body = new URLSearchParams({
      identifier: WHMCS_IDENTIFIER,
      secret: WHMCS_SECRET,
      action,
      responsetype: 'json',
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ),
    });

    const response = await fetch(WHMCS_PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-proxy-secret': WHMCS_PROXY_SECRET,
      },
      body: body.toString(),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Proxy returned an error', status: response.status });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('WHMCS proxy error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

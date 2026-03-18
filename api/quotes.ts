import type { VercelRequest, VercelResponse } from '@vercel/node';

const PRESUPUESTOS_URL = process.env.PRESUPUESTOS_URL || 'https://presupuestos.mvdstudio.com.uy';
const PRESUPUESTOS_API_TOKEN = process.env.PRESUPUESTOS_API_TOKEN || '11f6f4d754fe8a3365130171649ca748eb2c6f063bfc7cfb9f4fe8d763371cd1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { whmcs_client_id } = req.query;

  if (!whmcs_client_id) {
    return res.status(400).json({ error: 'Missing whmcs_client_id' });
  }

  try {
    const response = await fetch(
      `${PRESUPUESTOS_URL}/api/presupuestos?whmcs_client_id=${encodeURIComponent(String(whmcs_client_id))}`,
      {
        headers: {
          'X-API-Token': PRESUPUESTOS_API_TOKEN,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'Upstream error', details: text });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Quotes API error:', message);
    return res.status(502).json({ error: 'Service unavailable', message });
  }
}

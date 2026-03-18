import type { VercelRequest, VercelResponse } from '@vercel/node';

const WHMCS_PROXY_URL = process.env.WHMCS_PROXY_URL || 'http://92.113.38.153:3099/api/whmcs';
const WHMCS_PROXY_SECRET = process.env.WHMCS_PROXY_SECRET || 'mvdstudio-proxy-2024-secret';
const WHMCS_IDENTIFIER = process.env.WHMCS_IDENTIFIER!;
const WHMCS_SECRET = process.env.WHMCS_SECRET!;

async function callWhmcs(params: Record<string, string>) {
  const body = new URLSearchParams({
    identifier: WHMCS_IDENTIFIER,
    secret: WHMCS_SECRET,
    responsetype: 'json',
    ...params,
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
    throw new Error(`Proxy returned ${response.status}`);
  }

  return response.json();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  try {
    // Step 1: Validate login
    const loginData = await callWhmcs({
      action: 'ValidateLogin',
      email,
      password2: password,
    });

    if (loginData.result !== 'success') {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const clientId = loginData.userid;

    // Step 2: Get client details
    const detailsData = await callWhmcs({
      action: 'GetClientsDetails',
      clientid: String(clientId),
      stats: 'true',
    });

    const client = detailsData.client || {};

    return res.status(200).json({
      clientId,
      email: client.email || email,
      firstName: client.firstname || '',
      lastName: client.lastname || '',
      company: client.companyname || '',
      phone: client.phonenumber || '',
      token: `whmcs_${clientId}_${Date.now()}`,
    });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}

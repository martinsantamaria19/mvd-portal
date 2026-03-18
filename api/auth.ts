import type { VercelRequest, VercelResponse } from '@vercel/node';

const WHMCS_API_URL = process.env.WHMCS_API_URL!;
const WHMCS_IDENTIFIER = process.env.WHMCS_IDENTIFIER!;
const WHMCS_SECRET = process.env.WHMCS_SECRET!;

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
    const loginBody = new URLSearchParams({
      identifier: WHMCS_IDENTIFIER,
      secret: WHMCS_SECRET,
      action: 'ValidateLogin',
      responsetype: 'json',
      email,
      password2: password,
    });

    const loginResponse = await fetch(WHMCS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: loginBody.toString(),
    });

    const loginData = await loginResponse.json();

    if (loginData.result !== 'success') {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const clientId = loginData.userid;

    // Step 2: Get client details
    const detailsBody = new URLSearchParams({
      identifier: WHMCS_IDENTIFIER,
      secret: WHMCS_SECRET,
      action: 'GetClientsDetails',
      responsetype: 'json',
      clientid: String(clientId),
      stats: 'true',
    });

    const detailsResponse = await fetch(WHMCS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: detailsBody.toString(),
    });

    const detailsData = await detailsResponse.json();
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

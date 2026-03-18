const API_BASE = '/api';

async function whmcsRequest(action: string, params: Record<string, string> = {}) {
  const response = await fetch(`${API_BASE}/whmcs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...params }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  if (data.result === 'error') {
    throw new Error(data.message || 'WHMCS API error');
  }

  return data;
}

export async function validateLogin(email: string, password: string) {
  return whmcsRequest('ValidateLogin', { email, password });
}

export async function getClientDetails(clientId: string) {
  return whmcsRequest('GetClientsDetails', { clientid: clientId, stats: 'true' });
}

export async function getInvoices(clientId: string) {
  return whmcsRequest('GetInvoices', { userid: clientId, limitstart: '0', limitnum: '100' });
}

export async function getClientProducts(clientId: string) {
  return whmcsRequest('GetClientsProducts', { clientid: clientId, limitstart: '0', limitnum: '100' });
}

export async function getClientDomains(clientId: string) {
  return whmcsRequest('GetClientsDomains', { clientid: clientId, limitstart: '0', limitnum: '100' });
}

export async function getTickets(clientId: string) {
  return whmcsRequest('GetTickets', { clientid: clientId, limitstart: '0', limitnum: '100' });
}

export async function openTicket(params: {
  clientId: string;
  deptId: string;
  subject: string;
  message: string;
  priority: string;
}) {
  return whmcsRequest('OpenTicket', {
    clientid: params.clientId,
    deptid: params.deptId,
    subject: params.subject,
    message: params.message,
    priority: params.priority,
  });
}

export async function updateClientDetails(clientId: string, fields: Record<string, string>) {
  return whmcsRequest('UpdateClientDetails', { clientid: clientId, ...fields });
}

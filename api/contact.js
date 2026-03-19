import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { name, email, business, industry, invoices, message } = req.body;

  try {
    await resend.emails.send({
      from: 'Veyroniq Website <contact@veyroniq-limited.com>',
      to: 'contact@veyroniq-limited.com',
      subject: `New Audit Request — ${business}`,
      html: `
        <h2>New Audit Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Business:</strong> ${business}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Invoices/month:</strong> ${invoices}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
      `,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
}


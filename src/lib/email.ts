import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  const isQuote = data.subject.includes('[TEKLİF TALEBİ]');
  
  const emailSubject = isQuote
    ? `🔴 Yeni Teklif Talebi: ${data.subject.replace('[TEKLİF TALEBİ] ', '')}`
    : `📩 Yeni İletişim Mesajı: ${data.subject}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#1A1E24;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;">
                ÖZENSAN
              </h1>
              <div style="width:40px;height:3px;background-color:#C61A1A;margin:12px auto 0;border-radius:2px;"></div>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding:32px 40px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:${isQuote ? '#C61A1A' : '#1A1E24'};color:#ffffff;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;letter-spacing:1px;">
                    ${isQuote ? '💰 TEKLİF TALEBİ' : '📩 İLETİŞİM MESAJI'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:24px 40px 32px;">
              <h2 style="margin:0 0 24px;color:#1A1E24;font-size:22px;font-weight:700;">
                ${data.name} size mesaj gönderdi
              </h2>
              
              <!-- Info Cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:16px 20px;background-color:#f8f9fa;border-radius:8px;border-left:4px solid #C61A1A;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Ad Soyad</span><br>
                          <span style="color:#1A1E24;font-size:15px;font-weight:600;">${data.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">E-Posta</span><br>
                          <a href="mailto:${data.email}" style="color:#C61A1A;font-size:15px;font-weight:600;text-decoration:none;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">
                          <span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Telefon</span><br>
                          <a href="tel:${data.phone}" style="color:#C61A1A;font-size:15px;font-weight:600;text-decoration:none;">${data.phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Konu</span><br>
                          <span style="color:#1A1E24;font-size:15px;font-weight:600;">${data.subject}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="background-color:#f8f9fa;border-radius:8px;padding:20px;margin-bottom:24px;">
                <span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:8px;">Mesaj</span>
                <p style="margin:0;color:#1A1E24;font-size:15px;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
              </div>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#C61A1A;border-radius:8px;">
                    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" 
                       style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">
                      ↩ Yanıtla
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8f9fa;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                Bu e-posta <a href="https://www.ozensanas.com" style="color:#C61A1A;text-decoration:none;">ozensanas.com</a> web sitesi üzerinden otomatik gönderilmiştir.
              </p>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:12px;">
                Tüm mesajlar ayrıca <a href="https://www.ozensanas.com/admin" style="color:#C61A1A;text-decoration:none;">Admin Paneli</a>'nde de kayıtlıdır.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const { error } = await resend.emails.send({
      from: 'Özensan Web <bildirim@ozensanas.com>',
      to: ['info@ozensanas.com'],
      subject: emailSubject,
      replyTo: data.email,
      html,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Email send exception:', error);
    return { success: false, error };
  }
}

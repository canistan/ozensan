"use server";

import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function submitContactMessage(data: { name: string; email: string; phone: string; subject: string; message: string }) {
  try {
    const payload = await getPayload({ config: configPromise });
    await payload.create({
      collection: 'contact-messages',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error submitting contact message:", error);
    return { success: false, error: error.message || 'Mesaj gönderilirken bir hata oluştu.' };
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Check if already subscribed
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: {
          equals: email,
        }
      }
    });

    if (existing.totalDocs > 0) {
      return { success: true }; // Already subscribed, fail silently with success
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: email,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: 'Abone olunurken bir hata oluştu.' };
  }
}

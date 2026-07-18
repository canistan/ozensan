"use server";

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { sendContactNotification } from '@/lib/email';

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

    // Send email notification (don't block the response if it fails)
    sendContactNotification(data).catch((err) => {
      console.error('Email notification failed:', err);
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error submitting contact message:", error);
    return { success: false, errorKey: 'contactError' };
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
      return { success: false, errorKey: 'alreadySubscribed' };
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
    return { success: false, errorKey: 'subError' };
  }
}

export async function unsubscribeNewsletter(email: string) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Check if subscribed
    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: {
          equals: email,
        }
      }
    });

    if (existing.totalDocs === 0) {
      return { success: false, errorKey: 'notSubscribed' };
    }

    // Delete the subscriber
    const subscriberId = existing.docs[0].id;
    await payload.delete({
      collection: 'newsletter-subscribers',
      id: subscriberId,
    });

    return { success: true };
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    return { success: false, errorKey: 'unsubscribeError' };
  }
}

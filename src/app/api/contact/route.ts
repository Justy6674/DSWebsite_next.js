import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly at office@downscale.com.au' },
        { status: 500 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: 'Downscale Website <noreply@downscale.com.au>',
      to: ['office@downscale.com.au'],
      subject: subject || `Website Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
          <div style="background-color: #334155; color: #f7f2d3; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">From Downscale Website</p>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
              <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h2>
              <p style="margin: 8px 0; color: #4b5563;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #4b5563;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; color: #4b5563;"><strong>Subject:</strong> ${subject || 'Website Contact'}</p>
            </div>

            <div style="margin-top: 20px;">
              <h2 style="color: #334155; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #b68a71;">
                <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This email was sent from the contact form on downscale.com.au
              </p>
              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                Reply directly to this email to respond to ${name}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json(
      { message: 'Email sent successfully', id: emailData.data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
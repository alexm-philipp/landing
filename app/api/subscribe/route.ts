import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';


// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!, 
});

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX || !process.env.MAILCHIMP_LIST_ID) {
      console.error('Missing Mailchimp environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { email, name } = await request.json();

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Add subscriber to Mailchimp
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_LIST_ID!,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: name,
        },
      }
    );

    return NextResponse.json(
      { 
        message: 'Successfully subscribed!',
        id: response.id 
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Mailchimp subscription error:', error);
    
    // Log more details about the error
    if (error && typeof error === 'object' && 'response' in error) {
      const mailchimpError = error as { response?: { body?: unknown } };
      console.error('Mailchimp error details:', mailchimpError.response?.body);
    }
    
    // Handle specific Mailchimp errors
    if (error && typeof error === 'object' && 'status' in error && error.status === 400) {
      const mailchimpError = error as { response?: { body?: { title?: string, detail?: string } } };
      
      if (mailchimpError.response?.body?.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      }
      
      // Handle permanently deleted emails
      if (mailchimpError.response?.body?.detail?.includes('permanently deleted')) {
        return NextResponse.json(
          { error: 'This email was previously unsubscribed and cannot be re-added. Please use a different email address.' },
          { status: 400 }
        );
      }
      
      // Return the actual error message from Mailchimp
      return NextResponse.json(
        { error: mailchimpError.response?.body?.detail || 'Invalid request to Mailchimp' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// Make sure this runs on server only
const resend = new Resend(process.env.RESEND_API_KEY);

// Send a single invite email
async function sendInviteEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const inviteLink = `${baseUrl}/protected/invite?token=${token}`;

  console.log("Sending to:", email);
  console.log("Invite link:", inviteLink);

  const { data, error } = await resend.emails.send({
    from: 'Your App <onboarding@resend.dev>',
    to: email,
    subject: "You're invited!",
    html: `
      <h2>You’ve been invited 🎉</h2>
      <p>Click below to accept:</p>
      <a href="${inviteLink}">Accept Invite</a>
    `,
  });

  if (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }

  console.log("EMAIL SENT:", data);
}

// Create a single invite in Supabase and send email
async function createInvite(email: string, project_id: string) {
  const token = randomUUID();
  const supabase = await createServerSupabaseClient();

  await supabase.from("invites").insert({
    email,
    token,
    status: "pending",
    project_id,
    expires_at: new Date(Date.now() + 2*24*60*60*1000).toISOString()
  });

  // TODO: Uncomment this when the email service is working
  // await sendInviteEmail(email, token);

  // Print the invite link to the console (for testing purposes)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  console.log("Invite link:", `${baseUrl}/protected/invite?token=${token}`); 
}

// Invite multiple emails sequentially
async function inviteAll(emails: string[], project_id: string) {
  for (const email of emails) {
    await createInvite(email, project_id);
  }
}

// The actual API route handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const emails: string[] = body.emails;
    const project_id: string = body.project_id

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: "Please provide an array of emails" }, { status: 400 });
    }

    await inviteAll(emails, project_id);

    return NextResponse.json({ success: true, invited: emails.length });
  } catch (error: any) {
    console.error("Error in /api/send_invite:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
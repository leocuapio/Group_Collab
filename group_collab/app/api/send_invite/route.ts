import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/client";
import { Resend } from "resend";

// Make sure this runs on server only
const resend = new Resend(process.env.RESEND_API_KEY);
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY); // should print your key

// Send a single invite email
async function sendInviteEmail(email: string, token: string) {
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/protected/invite?token=${token}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "You're invited!",
      html: `
        <h2>You’ve been invited 🎉</h2>
        <p>Click below to accept:</p>
        <a href="${inviteLink}">Accept Invite</a>
      `,
    });
  } catch (error) {
    console.error(`Failed to send invite to ${email}:`, error);
  }
}

// Create a single invite in Supabase and send email
async function createInvite(email: string) {
  const token = randomUUID();
  const supabase = createClient();

  await supabase.from("invites").insert({
    email,
    token,
    status: "pending",
  });

  await sendInviteEmail(email, token);
}

// Invite multiple emails sequentially
async function inviteAll(emails: string[]) {
  for (const email of emails) {
    await createInvite(email);
  }
}

// The actual API route handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const emails: string[] = body.emails;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: "Please provide an array of emails" }, { status: 400 });
    }

    await inviteAll(emails);

    return NextResponse.json({ success: true, invited: emails.length });
  } catch (error: any) {
    console.error("Error in /api/send_invite:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
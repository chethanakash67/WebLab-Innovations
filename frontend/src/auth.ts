import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// The Lab chat's sign-in gate is entirely optional: it only activates once
// AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET are set. With no Google credentials, the
// provider list is empty and the chat works without requiring a sign-in.
export const isLabAuthEnabled = Boolean(
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET,
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: isLabAuthEnabled ? [Google] : [],
  trustHost: true,
});

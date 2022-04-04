import { SupabaseClient } from "@supabase/supabase-js";

export class AuthService {
  private context: SupabaseClient;

  constructor(context: SupabaseClient) {
    this.context = context;
  }

  async loginAsync(args: { email: string; password: string }) {
    return await this.context.auth.signIn(args);
  }

  async registerAsync(args: { email: string; password: string }) {
    return await this.context.auth.signUp(args);
  }

  async logout() {
    return await this.context.auth.signOut();
  }
}

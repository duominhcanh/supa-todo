import { SupabaseClient } from "@supabase/supabase-js";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

export class TodoService {
  private context: SupabaseClient;

  constructor(context: SupabaseClient) {
    this.context = context;
  }

  async fetchAsync(): Promise<Todo[]> {
    const { data, error } = await this.context
      .from<Todo>("todos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return [];
    }

    return data;
  }

  async addAsync(todo: string, userId: string): Promise<Todo> {
    const { data, error } = await this.context
      .from<Todo>("todos")
      .insert({ task: todo, user_id: userId })
      .single();

    return data!;
  }

  async deleteAsync(id: number): Promise<void> {
    const { error } = await this.context
      .from<Todo>("todos")
      .delete()
      .eq("id", id);
  }
}

import { SupabaseClient } from "@supabase/supabase-js";

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

  async setDoneAsync(id: number, isComplete: boolean): Promise<void> {
    const { data, error } = await this.context
      .from<Todo>("todos")
      .update({ is_complete: isComplete })
      .eq("id", id)
      .single();
  }

  async deleteAsync(id: number): Promise<void> {
    const { error } = await this.context
      .from<Todo>("todos")
      .delete()
      .eq("id", id);
  }
}

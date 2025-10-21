export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_diary: {
        Row: {
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean
          featured_image: string | null
          id: string
          meta_description: string | null
          published: boolean
          reading_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          published?: boolean
          reading_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          published?: boolean
          reading_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      clinical_tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          id: string
          patient_id: string
          priority: string | null
          status: string | null
          task_data: Json | null
          task_type: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          patient_id: string
          priority?: string | null
          status?: string | null
          task_data?: Json | null
          task_type: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          patient_id?: string
          priority?: string | null
          status?: string | null
          task_data?: Json | null
          task_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      crawled_pages: {
        Row: {
          content: string | null
          crawl_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          title: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          crawl_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          title?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          crawl_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          title?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crawled_pages_crawl_id_fkey"
            columns: ["crawl_id"]
            isOneToOne: false
            referencedRelation: "website_crawls"
            referencedColumns: ["id"]
          },
        ]
      }
      documents_index: {
        Row: {
          created_at: string | null
          document_type: string
          halaxy_document_id: string
          id: string
          is_new: boolean | null
          patient_user_id: string
          shared_at: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          halaxy_document_id: string
          id?: string
          is_new?: boolean | null
          patient_user_id: string
          shared_at?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          halaxy_document_id?: string
          id?: string
          is_new?: boolean | null
          patient_user_id?: string
          shared_at?: string | null
          title?: string | null
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string | null
          description: string | null
          flag_name: string
          id: string
          is_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          flag_name: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          flag_name?: string
          id?: string
          is_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      halaxy_links: {
        Row: {
          access_token: string | null
          created_at: string | null
          expires_at: string | null
          halaxy_patient_id: string
          id: string
          last_sync_at: string | null
          refresh_token: string | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: string | null
          halaxy_patient_id: string
          id?: string
          last_sync_at?: string | null
          refresh_token?: string | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          expires_at?: string | null
          halaxy_patient_id?: string
          id?: string
          last_sync_at?: string | null
          refresh_token?: string | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_data_cache: {
        Row: {
          created_at: string | null
          data: Json
          data_type: string
          expires_at: string
          id: string
          patient_id: string
        }
        Insert: {
          created_at?: string | null
          data: Json
          data_type: string
          expires_at: string
          id?: string
          patient_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json
          data_type?: string
          expires_at?: string
          id?: string
          patient_id?: string
        }
        Relationships: []
      }
      portal_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          session_token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          session_token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          session_token?: string
          user_id?: string
        }
        Relationships: []
      }
      practitioner_panels: {
        Row: {
          assigned_at: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          patient_user_id: string
          practitioner_user_id: string
        }
        Insert: {
          assigned_at?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          patient_user_id: string
          practitioner_user_id: string
        }
        Update: {
          assigned_at?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          patient_user_id?: string
          practitioner_user_id?: string
        }
        Relationships: []
      }
      quick_script_requests: {
        Row: {
          clinician_notes: string | null
          created_at: string | null
          id: string
          patient_id: string
          request_data: Json | null
          request_type: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          clinician_notes?: string | null
          created_at?: string | null
          id?: string
          patient_id: string
          request_data?: Json | null
          request_type: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          clinician_notes?: string | null
          created_at?: string | null
          id?: string
          patient_id?: string
          request_data?: Json | null
          request_type?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          external_subscription_id: string | null
          id: string
          source: string
          status: string
          tier: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          external_subscription_id?: string | null
          id?: string
          source: string
          status: string
          tier: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          external_subscription_id?: string | null
          id?: string
          source?: string
          status?: string
          tier?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      telecheck_logs: {
        Row: {
          check_type: string
          created_at: string | null
          id: string
          inputs: Json
          medicare_eligible: boolean | null
          outcome: Json
          private_eligible: boolean | null
          user_id: string
        }
        Insert: {
          check_type: string
          created_at?: string | null
          id?: string
          inputs: Json
          medicare_eligible?: boolean | null
          outcome: Json
          private_eligible?: boolean | null
          user_id: string
        }
        Update: {
          check_type?: string
          created_at?: string | null
          id?: string
          inputs?: Json
          medicare_eligible?: boolean | null
          outcome?: Json
          private_eligible?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      tracking_daily: {
        Row: {
          created_at: string | null
          hydration_ml: number | null
          id: string
          notes: string | null
          patient_user_id: string
          tracking_date: string
          updated_at: string | null
          waist_cm: number | null
          weight_kg: number | null
        }
        Insert: {
          created_at?: string | null
          hydration_ml?: number | null
          id?: string
          notes?: string | null
          patient_user_id: string
          tracking_date: string
          updated_at?: string | null
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Update: {
          created_at?: string | null
          hydration_ml?: number | null
          id?: string
          notes?: string | null
          patient_user_id?: string
          tracking_date?: string
          updated_at?: string | null
          waist_cm?: number | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          patient_id: string | null
          phone: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          patient_id?: string | null
          phone?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          patient_id?: string | null
          phone?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      website_crawls: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          id: string
          job_id: string | null
          status: string
          url: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_id?: string | null
          status?: string
          url: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          job_id?: string | null
          status?: string
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_user: {
        Args: { email: string; password: string }
        Returns: undefined
      }
      decrypt_token: {
        Args: { encrypted_token: string }
        Returns: string
      }
      encrypt_token: {
        Args: { token_value: string }
        Returns: string
      }
      get_halaxy_tokens: {
        Args: { p_user_id: string }
        Returns: {
          access_token: string
          expires_at: string
          is_expired: boolean
          refresh_token: string
        }[]
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
      get_user_subscription_tier: {
        Args: { user_uuid: string }
        Returns: string
      }
      has_active_subscription: {
        Args: { required_tier?: string; user_uuid: string }
        Returns: boolean
      }
      insert_halaxy_link: {
        Args: {
          p_access_token: string
          p_expires_at: string
          p_halaxy_patient_id: string
          p_refresh_token: string
          p_user_id: string
        }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ping_search_engines: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      trigger_sitemap_update: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_halaxy_tokens: {
        Args: {
          p_access_token: string
          p_expires_at: string
          p_refresh_token: string
          p_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

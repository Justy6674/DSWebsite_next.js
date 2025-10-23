export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Metadata type definitions for user_profiles
export interface UserMetadata {
  saved_resources?: Array<{
    id: string
    resource_id: string
    saved_at: string
    notes?: string
  }>
  subscription?: {
    id: string
    tier: 'freemium' | 'basic' | 'premium' | 'vip'
    status: 'active' | 'inactive' | 'cancelled' | 'past_due'
    current_period_end: string
    source: 'shopify' | 'stripe'
  }
  preferences?: Record<string, any>
  custom_notes?: string[]
}

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          category: string
          tags: string[] | null
          author: string
          published: boolean
          featured: boolean
          meta_description: string | null
          reading_time: number | null
          created_at: string
          updated_at: string
          featured_image: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          category?: string
          tags?: string[] | null
          author?: string
          published?: boolean
          featured?: boolean
          meta_description?: string | null
          reading_time?: number | null
          created_at?: string
          updated_at?: string
          featured_image?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          category?: string
          tags?: string[] | null
          author?: string
          published?: boolean
          featured?: boolean
          meta_description?: string | null
          reading_time?: number | null
          created_at?: string
          updated_at?: string
          featured_image?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          role: 'patient' | 'admin' | 'practitioner'
          patient_id: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          date_of_birth: string | null
          subscription_tier: string | null
          is_active: boolean | null
          last_sign_in_at: string | null
          metadata: UserMetadata | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          role: 'patient' | 'admin' | 'practitioner'
          patient_id?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          subscription_tier?: string | null
          is_active?: boolean | null
          last_sign_in_at?: string | null
          metadata?: UserMetadata | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'patient' | 'admin' | 'practitioner'
          patient_id?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          subscription_tier?: string | null
          is_active?: boolean | null
          last_sign_in_at?: string | null
          metadata?: UserMetadata | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      portal_content: {
        Row: {
          id: string
          pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication'
          content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide'
          title: string
          description: string | null
          content_data: Json
          tags: string[]
          is_published: boolean
          created_by: string | null
          created_at: string
          updated_at: string
          view_count: number
          search_vector: unknown
        }
        Insert: {
          id?: string
          pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication'
          content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide'
          title: string
          description?: string | null
          content_data?: Json
          tags?: string[]
          is_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
          search_vector?: unknown
        }
        Update: {
          id?: string
          pillar?: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop'
          content_type?: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide'
          title?: string
          description?: string | null
          content_data?: Json
          tags?: string[]
          is_published?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
          view_count?: number
          search_vector?: unknown
        }
        Relationships: [
          {
            foreignKeyName: "portal_content_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      jb_bb_feed: {
        Row: {
          id: string
          title: string
          content: string
          media_urls: string[]
          tags: string[]
          author: 'JB' | 'BB'
          is_published: boolean
          created_at: string
          updated_at: string
          view_count: number
          search_vector: unknown
        }
        Insert: {
          id?: string
          title: string
          content: string
          media_urls?: string[]
          tags?: string[]
          author: 'JB' | 'BB'
          is_published?: boolean
          created_at?: string
          updated_at?: string
          view_count?: number
          search_vector?: unknown
        }
        Update: {
          id?: string
          title?: string
          content?: string
          media_urls?: string[]
          tags?: string[]
          author?: 'JB' | 'BB'
          is_published?: boolean
          created_at?: string
          updated_at?: string
          view_count?: number
          search_vector?: unknown
        }
        Relationships: []
      }
      patient_notifications: {
        Row: {
          user_id: string
          jb_bb_feed_alerts: boolean
          content_alerts_by_pillar: Json
          last_portal_visit: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          jb_bb_feed_alerts?: boolean
          content_alerts_by_pillar?: Json
          last_portal_visit?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          jb_bb_feed_alerts?: boolean
          content_alerts_by_pillar?: Json
          last_portal_visit?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      content_analytics: {
        Row: {
          id: string
          user_id: string | null
          content_type: string
          content_id: string
          action: 'view' | 'download' | 'export_pdf' | 'search' | 'share'
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          content_type: string
          content_id: string
          action: 'view' | 'download' | 'export_pdf' | 'search' | 'share'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          content_type?: string
          content_id?: string
          action?: 'view' | 'download' | 'export_pdf' | 'search' | 'share'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_analytics_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      search_analytics: {
        Row: {
          id: string
          user_id: string | null
          search_query: string
          results_count: number | null
          clicked_result_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          search_query: string
          results_count?: number | null
          clicked_result_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          search_query?: string
          results_count?: number | null
          clicked_result_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "search_analytics_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      file_storage: {
        Row: {
          id: string
          name: string
          type: string
          size: number
          url: string
          thumbnail_url: string | null
          folder: string
          uploaded_by: string | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          size: number
          url: string
          thumbnail_url?: string | null
          folder?: string
          uploaded_by?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          size?: number
          url?: string
          thumbnail_url?: string | null
          folder?: string
          uploaded_by?: string | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_storage_uploaded_by_fkey"
            columns: ["uploaded_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      health_metrics: {
        Row: {
          id: string
          user_id: string
          age: number
          sex: 'male' | 'female'
          height_cm: number
          weight_kg: number
          waist_cm: number | null
          activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'
          goal: 'lose-safe' | 'lose-preserve' | 'lose-build' | 'build'
          bmr: number
          tdee: number
          goal_calories: number
          bmi: number
          bmi_category: string
          waist_risk: string | null
          protein_g: number
          fat_g: number
          carbs_g: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          age: number
          sex: 'male' | 'female'
          height_cm: number
          weight_kg: number
          waist_cm?: number | null
          activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'
          goal: 'lose-safe' | 'lose-preserve' | 'lose-build' | 'build'
          bmr: number
          tdee: number
          goal_calories: number
          bmi: number
          bmi_category: string
          waist_risk?: string | null
          protein_g: number
          fat_g: number
          carbs_g: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          age?: number
          sex?: 'male' | 'female'
          height_cm?: number
          weight_kg?: number
          waist_cm?: number | null
          activity_level?: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra'
          goal?: 'lose-safe' | 'lose-preserve' | 'lose-build' | 'build'
          bmr?: number
          tdee?: number
          goal_calories?: number
          bmi?: number
          bmi_category?: string
          waist_risk?: string | null
          protein_g?: number
          fat_g?: number
          carbs_g?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "health_metrics_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      daily_tracking_extended: {
        Row: {
          id: string
          user_id: string
          tracking_date: string
          weight_kg: number | null
          waist_cm: number | null
          blood_pressure_systolic: number | null
          blood_pressure_diastolic: number | null
          heart_rate: number | null
          sleep_hours: number | null
          sleep_quality: number | null
          energy_level: number | null
          mood: number | null
          stress_level: number | null
          calories_consumed: number | null
          protein_g: number | null
          carbs_g: number | null
          fat_g: number | null
          water_ml: number | null
          steps: number | null
          exercise_minutes: number | null
          activity_type: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tracking_date: string
          weight_kg?: number | null
          waist_cm?: number | null
          blood_pressure_systolic?: number | null
          blood_pressure_diastolic?: number | null
          heart_rate?: number | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          energy_level?: number | null
          mood?: number | null
          stress_level?: number | null
          calories_consumed?: number | null
          protein_g?: number | null
          carbs_g?: number | null
          fat_g?: number | null
          water_ml?: number | null
          steps?: number | null
          exercise_minutes?: number | null
          activity_type?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tracking_date?: string
          weight_kg?: number | null
          waist_cm?: number | null
          blood_pressure_systolic?: number | null
          blood_pressure_diastolic?: number | null
          heart_rate?: number | null
          sleep_hours?: number | null
          sleep_quality?: number | null
          energy_level?: number | null
          mood?: number | null
          stress_level?: number | null
          calories_consumed?: number | null
          protein_g?: number | null
          carbs_g?: number | null
          fat_g?: number | null
          water_ml?: number | null
          steps?: number | null
          exercise_minutes?: number | null
          activity_type?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_tracking_extended_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      track_content_view: {
        Args: {
          p_content_type: string
          p_content_id: string
          p_user_id?: string
        }
        Returns: undefined
      }
      log_search: {
        Args: {
          p_query: string
          p_results_count: number
          p_user_id?: string
        }
        Returns: string
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
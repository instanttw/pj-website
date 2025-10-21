export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          icon?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          icon?: string
          created_at?: string
        }
      }
      plugins: {
        Row: {
          id: string
          name: string
          slug: string
          tagline: string
          description: string
          icon_url: string
          category_id: string | null
          price: number
          version: string
          wordpress_compatibility: string
          download_count: number
          active_installations: number
          rating: number
          review_count: number
          last_updated: string
          demo_url: string
          documentation_url: string
          features: Json
          screenshots: Json
          changelog: Json
          faq: Json
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          tagline?: string
          description?: string
          icon_url?: string
          category_id?: string | null
          price?: number
          version?: string
          wordpress_compatibility?: string
          download_count?: number
          active_installations?: number
          rating?: number
          review_count?: number
          last_updated?: string
          demo_url?: string
          documentation_url?: string
          features?: Json
          screenshots?: Json
          changelog?: Json
          faq?: Json
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          tagline?: string
          description?: string
          icon_url?: string
          category_id?: string | null
          price?: number
          version?: string
          wordpress_compatibility?: string
          download_count?: number
          active_installations?: number
          rating?: number
          review_count?: number
          last_updated?: string
          demo_url?: string
          documentation_url?: string
          features?: Json
          screenshots?: Json
          changelog?: Json
          faq?: Json
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      plugin_pricing: {
        Row: {
          id: string
          plugin_id: string
          name: string
          price: number
          billing_period: string
          features: Json
          site_limit: number
          is_popular: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          plugin_id: string
          name: string
          price: number
          billing_period?: string
          features?: Json
          site_limit?: number
          is_popular?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          plugin_id?: string
          name?: string
          price?: number
          billing_period?: string
          features?: Json
          site_limit?: number
          is_popular?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          plugin_id: string
          user_id: string
          rating: number
          title: string
          content: string
          is_verified_purchase: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plugin_id: string
          user_id: string
          rating: number
          title?: string
          content?: string
          is_verified_purchase?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plugin_id?: string
          user_id?: string
          rating?: number
          title?: string
          content?: string
          is_verified_purchase?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      licenses: {
        Row: {
          id: string
          license_key: string
          plugin_id: string
          pricing_id: string | null
          user_id: string
          status: string
          purchase_date: string
          expiration_date: string | null
          activations_used: number
          activations_limit: number
          activated_domains: Json
          order_id: string
          created_at: string
        }
        Insert: {
          id?: string
          license_key: string
          plugin_id: string
          pricing_id?: string | null
          user_id: string
          status?: string
          purchase_date?: string
          expiration_date?: string | null
          activations_used?: number
          activations_limit?: number
          activated_domains?: Json
          order_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          license_key?: string
          plugin_id?: string
          pricing_id?: string | null
          user_id?: string
          status?: string
          purchase_date?: string
          expiration_date?: string | null
          activations_used?: number
          activations_limit?: number
          activated_domains?: Json
          order_id?: string
          created_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          ticket_number: string
          user_id: string
          plugin_id: string | null
          license_id: string | null
          subject: string
          category: string
          priority: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ticket_number: string
          user_id: string
          plugin_id?: string | null
          license_id?: string | null
          subject: string
          category?: string
          priority?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ticket_number?: string
          user_id?: string
          plugin_id?: string | null
          license_id?: string | null
          subject?: string
          category?: string
          priority?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      ticket_messages: {
        Row: {
          id: string
          ticket_id: string
          user_id: string
          message: string
          attachments: Json
          is_staff_reply: boolean
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          user_id: string
          message: string
          attachments?: Json
          is_staff_reply?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          user_id?: string
          message?: string
          attachments?: Json
          is_staff_reply?: boolean
          created_at?: string
        }
      }
      documentation: {
        Row: {
          id: string
          plugin_id: string | null
          title: string
          slug: string
          content: string
          category: string
          sort_order: number
          parent_id: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          plugin_id?: string | null
          title: string
          slug: string
          content?: string
          category?: string
          sort_order?: number
          parent_id?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          plugin_id?: string | null
          title?: string
          slug?: string
          content?: string
          category?: string
          sort_order?: number
          parent_id?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

import { createClient } from "@/lib/supabase/server";
import type { Service, SiteSettings } from "@/types";

// Fallback content used only if the database hasn't been seeded yet or the
// request fails — keeps the site from breaking, and makes it obvious in the
// UI that real content isn't loading.
const fallbackSettings: SiteSettings = {
  id: "fallback",
  company_name: "NEIVCE Trading PLT",
  introduction:
    "[Unable to load from database — check Supabase connection.]",
  announcement: "",
  phone: "03-8737 8770",
  address:
    "B5 - B7, Block B, Jalan TKS 1, Taman Kajang Sentral, 43000 Kajang, Selangor",
  updated_at: new Date().toISOString(),
};

const fallbackServices: Service[] = [];

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) return fallbackSettings;
    return data as SiteSettings;
  } catch {
    return fallbackSettings;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data) return fallbackServices;
    return data as Service[];
  } catch {
    return fallbackServices;
  }
}

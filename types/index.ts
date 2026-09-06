export type SiteSettings = {
  id: string;
  company_name: string;
  introduction: string;
  announcement: string;
  phone: string;
  address: string;
  updated_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  display_order: number;
  updated_at: string;
};

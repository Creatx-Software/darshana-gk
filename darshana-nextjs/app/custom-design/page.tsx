import { fetchCustomDesignItems, fetchCustomDesignPage } from '@/lib/api/strapi';
import CustomDesignClient from './CustomDesignClient';

export default async function CustomDesignPage() {
  const [designItems, pageSettings] = await Promise.all([
    fetchCustomDesignItems(),
    fetchCustomDesignPage(),
  ]);

  return <CustomDesignClient designItems={designItems} pageSettings={pageSettings} />;
}

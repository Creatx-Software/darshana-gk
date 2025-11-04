// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    // Enable public API permissions for all content types
    const contentTypes = [
      'portfolio-category',
      'portfolio-subcategory',
      'gallery-item',
      'hero-slide',
      'service',
      'testimonial',
      'granite-color',
      'site-setting'
    ];

    try {
      // Get the public role
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) {
        console.log('⚠️  Public role not found');
        return;
      }

      // Get all existing permissions for the public role
      const publicPermissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: { role: publicRole.id },
        });

      // Check if permissions already exist for our content types
      const existingActions = publicPermissions.map((p: any) => p.action);

      // Add permissions for each content type
      for (const contentType of contentTypes) {
        const findAction = `api::${contentType}.${contentType}.find`;
        const findOneAction = `api::${contentType}.${contentType}.findOne`;

        // Create find permission if it doesn't exist
        if (!existingActions.includes(findAction)) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: findAction,
              role: publicRole.id,
            },
          });
        }

        // Create findOne permission if it doesn't exist
        if (!existingActions.includes(findOneAction)) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: findOneAction,
              role: publicRole.id,
            },
          });
        }
      }

      console.log('✅ Public API permissions enabled successfully');
    } catch (error) {
      console.error('❌ Error enabling public permissions:', error);
    }
  },
};

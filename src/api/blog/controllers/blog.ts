/**
 * blog controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog.blog', () => ({
  async findBySlug(ctx) {
    const slug = ctx.params.slug;
    const existingFilters =
      typeof ctx.query.filters === 'object' && ctx.query.filters !== null ? ctx.query.filters : {};

    ctx.query = {
      ...ctx.query,
      filters: {
        ...existingFilters,
        slug: {
          $eq: slug,
        },
      },
      pagination: {
        page: 1,
        pageSize: 1,
      },
    };

    const response = await super.find(ctx);

    if (!Array.isArray(response?.data) || response.data.length === 0) {
      return ctx.notFound('Blog not found');
    }

    return {
      data: response.data[0],
      meta: {
        ...response.meta,
        matchedBy: 'slug',
      },
    };
  },
}));

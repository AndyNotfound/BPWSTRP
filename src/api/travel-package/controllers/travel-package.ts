/**
 * travel-package controller
 */

import { factories } from '@strapi/strapi';
import { Context } from 'koa';
import slugify from 'slugify';

interface TravelPackage {
    thumbnail?: string;
    name?: string;
    desc?: string;
    brief?: string;
    price?: number;
    images?: string[];
    slug?: string;
}

export default factories.createCoreController('api::travel-package.travel-package', ({ strapi }) => ({
    async homepage(ctx: Context) {
        try {
            console.log('Fetching travel packages...');

            const entries = await strapi.entityService.findMany('api::travel-package.travel-package', {
                fields: ['name', 'brief', 'price', 'slug'],
                populate: {
                    thumbnail: true,
                    images: true 
                },
            });

            const formattedEntries = entries.map((entry: any) => ({
                ...entry,
                thumbnail: entry.thumbnail?.url || null,
                images: entry.images?.map((img: any) => img.url) || [],
                // Use slugify if the slug is not present
                slug: entry.slug || slugify(entry.name || '', { lower: true, strict: true }), 
            }));

            console.log('Formatted entries:', formattedEntries);

            if (!formattedEntries || formattedEntries.length === 0) {
                ctx.status = 404;
                ctx.body = { message: 'No travel packages found' };
                return;
            }

            ctx.body = formattedEntries;
        } catch (err) {
            console.error('Error fetching travel packages:', err);
            ctx.throw(500, 'Failed to fetch travel packages');
        }
    },
}));

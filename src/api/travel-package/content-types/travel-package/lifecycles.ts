import slugify from 'slugify';

export default {
    beforeCreate(event: any) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
    },

    beforeUpdate(event: any) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
    },
};

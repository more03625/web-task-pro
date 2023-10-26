import * as yup from 'yup';

const get = yup.object({
    query: yup.object({
        pageUrl: yup.string().trim(),
        page: yup.number(),
        limit: yup.number(),
    })
});

export default {
    get,
};

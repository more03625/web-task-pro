import * as yup from 'yup';


const seoSchema = yup.object().shape({
    id: yup.number().integer(),
    ogSiteName: yup.string().trim().required(),
    ogType: yup.string().trim(),
    ogUrl: yup.string().trim(),
    ogTitle: yup.string().trim().required(),
    ogDescription: yup.string().trim().required(),
    ogKeywords: yup.string().trim(),
    ogImage: yup.number().integer(),
    ogImageUrl: yup.string().trim(),
    ogImageAlt: yup.string().trim(),
    ogImageType: yup.string().trim(),
    ogImageWidth: yup.string().trim(),
    ogImageHeight: yup.string().trim(),
    twitterCard: yup.string().trim(),
    twitterTitle: yup.string().trim(),
    twitterDescription: yup.string().trim(),
    twitterImage: yup.string().trim(),
    twitterImageAlt: yup.string().trim(),
    canonicalURL: yup.string().trim(),
    robots: yup.string().trim().required(),
    googleBot: yup.string().trim().required(),
});

const getSeo = yup.object({
    body: yup.object({
        pageUrl: yup.string().url().required().trim(),
        siteName: yup.string().required().trim(),
    })
});
export default {
    seoSchema,
    getSeo
};

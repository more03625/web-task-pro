import * as yup from 'yup';

const addSeo = yup.object().shape({
    siteUrl: yup.string().url().trim().required(),
    canonicalURL: yup.string().url().trim(),
    robots: yup.string().trim(),
    googleBot: yup.string().trim(),
    openGraph: yup.object({
        type: yup.string().trim().required(),
        url: yup.string().url().trim().required(),
        title: yup.string().trim().required(),
        description: yup.string().trim().required(),
        keywords: yup.string().trim().required(),
        image: yup.object({
            url: yup.string().url().trim().required(),
            alt: yup.string().trim().required(),
            type: yup.string().trim().required(),
            width: yup.string().trim().required(),
            height: yup.string().trim().required(),
        }),
    }).required(),
    twitter: yup.object({
        card: yup.string().trim().required(),
        title: yup.string().trim().required(),
        description: yup.string().trim().required(),
        image: yup.object({
            url: yup.string().url().trim().required(),
            alt: yup.string().trim().required(),
            type: yup.string().trim().required(),
            width: yup.string().trim().required(),
            height: yup.string().trim().required(),
        }),
    }).required(),
});
const getSeo = yup.object({
    body: yup.object({
        pageUrl: yup.string().url().trim(),
        siteName: yup.string().trim(),
    })
});
export default {
    addSeo,
    getSeo
};

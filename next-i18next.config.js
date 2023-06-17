module.exports = {
    i18n: {
        defaultLocale: 'ru',
        locales: ['ru', 'en'],
        localeDetection: false,
    },
    reloadOnPrerender: true,
    //vercel deployment fix
    localePath:
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
    ns: ['home', 'projects'],
};

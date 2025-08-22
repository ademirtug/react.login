import enTranslations from './en/translation.json';
import trTranslations from './tr/translation.json';

// Export translations under the 'login' namespace
export const packageTranslations = {
    en: {
        login: enTranslations.login
    },
    tr: {
        login: trTranslations.login
    }
};

export const initPackageTranslations = (i18nInstance) => {
    Object.keys(packageTranslations).forEach(lang => {
        const ns = 'login'; // Define namespace
        i18nInstance.addResourceBundle(
            lang,
            ns,
            packageTranslations[lang][ns],
            true, // deep merge
            true  // overwrite
        );
    });
    return i18nInstance;
};
interface IErrorMessage {
    ALREADY_EXIST: string;
    NOT_FOUND: string;
    SEO_DELETE_SUCCESS: string
}

interface ILanguageMessages {
    en: IErrorMessage;
    hi: IErrorMessage;
}

export {
    IErrorMessage,
    ILanguageMessages
}
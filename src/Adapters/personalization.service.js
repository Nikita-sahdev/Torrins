import { post, get } from "./xhr";

export const personalizationService = {
    fetchPersonalization,
    savePersonalization,
};

function fetchPersonalization(url, headers) {
    return get(url, headers);
}

function savePersonalization(url, params, headers) {
    return post(url, params, headers);
}
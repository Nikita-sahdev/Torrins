import { post, get } from "./xhr";

export const homepageService = {
    fetchHomepageData,
    fetchAllCourses,
};

function fetchHomepageData(url, headers) {
    return get(url, headers);
}

function fetchAllCourses(url, headers) {
    return get(url, headers);
}
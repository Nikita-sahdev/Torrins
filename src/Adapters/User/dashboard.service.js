import { post, get } from "../xhr";

export const dashboardService = {
    fetchRecommendedSongs,
    lessonHistory,
    userActivity,
    learningPath,
};

function fetchRecommendedSongs(url, headers) {
    return get(url, headers);
}

function lessonHistory(url, headers) {
    return get(url, headers);
}

function userActivity(url, headers) {
    return get(url, headers);
}

function learningPath(url, headers) {
    return get(url, headers);
}
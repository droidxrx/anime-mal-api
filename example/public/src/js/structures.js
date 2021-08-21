const data = {
    anime: {
        animeFull: [
            "id",
            "title",
            "main_picture",
            "alternative_titles",
            "start_date",
            "end_date",
            "synopsis",
            "mean",
            "rank",
            "popularity",
            "num_list_users",
            "num_scoring_users",
            "nsfw",
            "genres",
            "created_at",
            "updated_at",
            "media_type",
            "status",
            "my_list_status",
            "num_episodes",
            "start_season",
            "broadcast",
            "source",
            "average_episode_duration",
            "rating",
            "studios",
            "pictures",
            "background",
            "related_anime",
            "related_manga",
            "recommendations",
            "statistics",
        ],
        animeInList: [
            "id",
            "title",
            "main_picture",
            "alternative_titles",
            "start_date",
            "end_date",
            "synopsis",
            "mean",
            "rank",
            "popularity",
            "num_list_users",
            "num_scoring_users",
            "nsfw",
            "genres",
            "created_at",
            "updated_at",
            "media_type",
            "status",
            "my_list_status",
            "num_episodes",
            "start_season",
            "broadcast",
            "source",
            "average_episode_duration",
            "rating",
            "studios",
        ],
    },
};

createFieldFilter(data);

function createFieldFilter(data) {
    const animefields = data.anime;

    animefields.animeFull.forEach((item) => createTagLi("#advanceSearchAnimeById", item));
    animefields.animeInList.forEach((item) => createTagLi("#advanceAnimeByQuery", item));
    animefields.animeInList.forEach((item) => createTagLi("#advanceAnimeByRangking", item));
}

function createTagLi(element, item) {
    const li = $(`<li><input class="form-check-input" type="checkbox" value="${item}"> ${item}</li>`);
    $(`${element} .checkboxes ul`).append(li);
}

import { TMDBFetch } from "@/services/tmdb/api";

const getPopularPeople = async (page = 1, signal) =>
  TMDBFetch(
    "/person/popular",
    {
      language: "en-US",
      page,
    },
    signal,
  );

const getPersonDetailsById = async (personId, signal) =>
  TMDBFetch(
    `/person/${personId}`,
    {
      language: "en-US",
      append_to_response: "combined_credits,external_ids",
    },
    signal,
  );

export { getPopularPeople, getPersonDetailsById };

import { Icon } from "@iconify/react";
import { getTmdbImageUrl } from "@/utils/tmdbImage";
import { handleImageError } from "@/utils/onImageError";
import { formatDuration } from "@/utils/format";
import { cn } from "@/utils/clsx";

const SeasonEpisode = ({ episode, fallbackImage }) => (
  <article
    className={cn(
      `p-5 not-last:mb-5 md:mb-0 bg-dark-08 rounded-lg flex flex-col md:flex-row gap-5 md:bg-transparent md:border-b md:border-dark-15 md:py-10 md:px-0 md:rounded-none last-of-type:border-b-0 ${episode ? "md:pe-4" : ""}`,
    )}
  >
    <div className="flex items-center gap-4.5 w-full md:w-4/12 md:flex-row-reverse">
      {/* EPISODE IMAGE */}
      <div className="grow relative w-full h-auto aspect-video bg-black rounded-xl border border-dark-15 overflow-hidden">
        {(episode.still_path || fallbackImage) && (
          <img
            src={getTmdbImageUrl(episode.still_path || fallbackImage, "w300")}
            alt=""
            className="cover-image"
            loading="lazy"
            onError={handleImageError}
          />
        )}
        <div className="absolute inset-0 flex-center bg-black/20">
          <span className="flex size-12.5 items-center justify-center rounded-full bg-black/55 text-white sm:size-12.5">
            <Icon icon="bi:play-circle" className="size-5 sm:size-6" />
          </span>
        </div>
      </div>
      <span className="typo text-xl text-neutral-60 sm:text-2xl 2xl:text-[30px]">
        {String(episode.episode_number).padStart(2, "0")}
      </span>
    </div>
    <div className="flex flex-col gap-2 w-full md:gap-2.5 md:w-8/12">
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:gap-x-5 sm:flex-nowrap sm:items-center gap-2">
        <h3 className="typo min-w-0 text-base font-semibold sm:text-lg 2xl:text-[20px]">
          {episode.name || `Episode ${episode.episode_number}`}
        </h3>
        {episode.runtime > 0 && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-dark-15 bg-dark-08 p-1.5 sm:px-2.5 sm:py-2 text-xs text-neutral-60 sm:text-sm w-fit 2xl:text-base">
            <Icon icon="lucide:clock-3" className="size-5 sm:size-6" />{" "}
            {formatDuration(episode.runtime)}
          </span>
        )}
      </div>
      <div className="hidden md:block">
        <p className="body-text line-clamp-3 text-xs sm:text-sm lg:text-base">
          {episode.overview || "No episode description is available."}
        </p>
      </div>
    </div>
  </article>
);

export default SeasonEpisode;

// <article className="grid min-w-0 grid-cols-[32px_minmax(0,1fr)] items-center gap-x-3 gap-y-4 border-b border-dark-15 py-5 last:border-b-0 sm:grid-cols-[52px_150px_minmax(0,1fr)] sm:gap-x-5 sm:gap-y-0 sm:py-6 lg:grid-cols-[68px_196px_minmax(0,1fr)] lg:gap-x-6 lg:py-7">
{
  /* <span className="typo text-base text-neutral-60 sm:text-xl lg:text-2xl">
  {String(episode.episode_number).padStart(2, "0")}
</span>; */
}

//   <div className="relative col-start-2 row-start-1 aspect-[1.45] overflow-hidden rounded-lg border border-dark-15 bg-dark-06 sm:col-start-auto">
//     {(episode.still_path || fallbackImage) && (
//       <img
//         src={getTmdbImageUrl(episode.still_path || fallbackImage, "w300")}
//         alt=""
//         className="cover-img"
//         loading="lazy"
//         onError={handleImageError}
//       />
//     )}
//     <div className="absolute inset-0 flex-center bg-black/20">
//       <span className="flex size-9 items-center justify-center rounded-full border border-white/70 bg-black/55 text-white sm:size-11">
//         <Icon icon="gravity-ui:play-fill" className="size-4 sm:size-5" />
//       </span>
//     </div>
//   </div>

//   <div className="col-span-2 col-start-1 row-start-2 min-w-0 sm:col-span-1 sm:col-start-3 sm:row-start-1">
//     <div className="mb-2 flex flex-wrap items-center justify-between gap-2 lg:mb-3">
//       <h3 className="typo min-w-0 text-sm font-semibold sm:text-base lg:text-lg">
//         {episode.name || `Episode ${episode.episode_number}`}
//       </h3>
//       {episode.runtime > 0 && (
//         <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-dark-15 bg-dark-08 px-2.5 py-1.5 text-xs text-neutral-60 sm:text-sm">
//           <Icon icon="lucide:clock-3" className="size-4" /> {formatDuration(episode.runtime)}
//         </span>
//       )}
//     </div>
// <p className="body-text line-clamp-3 text-xs sm:text-sm lg:text-base">
//   {episode.overview || "No episode description is available."}
// </p>
//   </div>
// </article>

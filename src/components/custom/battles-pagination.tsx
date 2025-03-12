import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BattlesPerPage } from "@/constants";
import {
  WordPlays,
  WordPlaysDatabasePostgreSQL,
} from "@/modules/word-plays/word-plays";
import { generateFromObj } from "@bramus/pagination-sequence";
import {
  LetterPlays,
  LetterPlaysDatabasePostgreSQL,
} from "@/modules/letter-plays/letter-plays";

export default async function BattlesPagination({
  battleLeaguesFilter,
  emceesFilter,
  urlPrefix,
  currentPage,
}: {
  battleLeaguesFilter?: string;
  emceesFilter?: string;
  urlPrefix: string;
  currentPage: number;
}) {
  let controller: LetterPlays | WordPlays | null = null;

  switch (urlPrefix) {
    case "/letter-plays":
      controller = new LetterPlays(new LetterPlaysDatabasePostgreSQL());
      break;
    case "/word-plays":
      controller = new WordPlays(new WordPlaysDatabasePostgreSQL());
      break;
    default:
      throw new Error("Invalid URL prefix");
  }

  const totalCount = await controller.getUniqueVideosCount({
    filters: {
      battleLeagues: battleLeaguesFilter ? battleLeaguesFilter.split(",") : [],
      emcees: emceesFilter ? emceesFilter.split(",") : [],
    },
  });
  const totalPages = Math.ceil(totalCount / BattlesPerPage);

  if (totalPages === 0) {
    return null;
  }

  const sequence = generateFromObj({
    curPage: currentPage,
    numPages: totalPages,
  });

  const generateQueryParameters = (page: number | string) => {
    const searchParams = new URLSearchParams();

    if (battleLeaguesFilter) {
      searchParams.set("battleLeagues", battleLeaguesFilter);
    }

    if (emceesFilter) {
      searchParams.set("emcees", emceesFilter);
    }

    searchParams.set("page", page.toString());

    return searchParams.toString();
  };

  console.log(generateQueryParameters(1));

  return (
    <>
      <Pagination>
        <PaginationContent>
          {currentPage - 1 > 0 && (
            <PaginationItem>
              <PaginationPrevious
                href={`${urlPrefix}?${generateQueryParameters(
                  Math.max(currentPage - 1, 1)
                )} `}
              />
            </PaginationItem>
          )}
          {sequence.map((page) => {
            if (page === "...") {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`${urlPrefix}?${generateQueryParameters(page)}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}
          {currentPage + 1 <= totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`${urlPrefix}?${generateQueryParameters(
                  currentPage + 1
                )}`}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

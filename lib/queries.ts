import { allGuides } from "@/.content-collections/generated";

const PER_PAGE = 20;

export const getSearchResults = async (searchTerm: string, page: number) => {
  let guides;
  if (page === 0) page = 1;

  guides = allGuides
    .filter((guide) => guide.published)
    .sort((a, b) =>
      a.publishedAt.getTime() < b.publishedAt.getTime() ? 1 : -1
    );

  if (searchTerm) {
    guides = guides.filter((guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const guidesLength = guides.length;
  const maxPages = Math.ceil(guidesLength / PER_PAGE);

  const startIndex = (page - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  guides = guides.slice(startIndex, endIndex);

  return {
    currentPage: page,
    maximumPages: maxPages,
    guidesPerPage: PER_PAGE,
    guidesLength,
    guides,
  };
};

// export const getSearchResults =
//     async (searchTerm: string) => {
//       let results;

//       // do we really need to do this hybrid search pattern?

//       if (searchTerm.length <= 2) {
//         // If the search term is short (e.g., "W"), use ILIKE for prefix matching
//         results = await db
//           .select()
//           .from(products)
//           .where(sql`${products.name} ILIKE ${searchTerm + "%"}`) // Prefix match
//           .limit(5)
//           .innerJoin(
//             subcategories,
//             sql`${products.subcategory_slug} = ${subcategories.slug}`,
//           )
//           .innerJoin(
//             subcollections,
//             sql`${subcategories.subcollection_id} = ${subcollections.id}`,
//           )
//           .innerJoin(
//             categories,
//             sql`${subcollections.category_slug} = ${categories.slug}`,
//           );
//       } else {
//         // For longer search terms, use full-text search with tsquery
//         const formattedSearchTerm = searchTerm
//           .split(" ")
//           .filter((term) => term.trim() !== "") // Filter out empty terms
//           .map((term) => `${term}:*`)
//           .join(" & ");

//         results = await db
//           .select()
//           .from(products)
//           .where(
//             sql`to_tsvector('english', ${products.name}) @@ to_tsquery('english', ${formattedSearchTerm})`,
//           )
//           .limit(5)
//           .innerJoin(
//             subcategories,
//             sql`${products.subcategory_slug} = ${subcategories.slug}`,
//           )
//           .innerJoin(
//             subcollections,
//             sql`${subcategories.subcollection_id} = ${subcollections.id}`,
//           )
//           .innerJoin(
//             categories,
//             sql`${subcollections.category_slug} = ${categories.slug}`,
//           );
//       }

//       return results;
//     }

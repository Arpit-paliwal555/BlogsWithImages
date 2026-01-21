import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from "react";
import type { IBlogpost } from "../interfaces/IBlogPost";
import BlogCard from "./BlogCard";
interface BlogListProps {
  list: IBlogpost[];
}

//sort fiels as union type
type SortFields = "title" | "viewCount" | "publishedAt";
type SortOrder = "asc" | "dsc";

// function to include check-insensitivity
const includesCI = (heystack: string, needle: string) => {
  return heystack.toLowerCase().includes(needle.toLowerCase());
};

//comparator factory
const makeComparator = (field: SortFields, order: SortOrder) => {
  const dir = order==="asc"?1:-1;
  return (a:IBlogpost, b:IBlogpost)=>{
    switch(field){
      case "title":
        return a.title.localeCompare(b.title)*dir;
      case "viewCount":
        return (a.viewCount-b.viewCount)*dir;
      case "publishedAt":
        return (new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())*dir;
      default:
        return 0;
  }
  }
};
const BlogList: FunctionComponent<BlogListProps> = ({ list }) => {
  // ui--states
  const [query, setQuery] = useState<string>("");
  const [sortFields, setSortFields] = useState<SortFields>("publishedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  //debounce query
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  //handlers--stable
  const onQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const onSortFieldChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortFields(e.target.value as SortFields);
    },
    []
  );

  const onSortOrderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOrder(e.target.value as SortOrder);
    },
    []
  );

  // --Derrived list : filter + sort
  const filteredAndSorted = useMemo(() => {
    const q = debouncedQuery.trim();
    const filtered = q.length
      ? list.filter(
          (b) => includesCI(b.title, q) || includesCI(b.description, q)
        )
      : list;
    const comparator = makeComparator(sortFields, sortOrder);
    return [...filtered].sort(comparator);
  }, [list, debouncedQuery, sortFields, sortOrder]);

  return (
    <div>
    <div className="w-full max-w-full flex justify-between sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Search by title or description"
          className="p-1 border-2 w-full"
          aria-label="Search blog posts"
        />
        <div className="flex gap-2">
          <label className="flex items-center gap-2 border p-1">
            <span className="text-sm">Sort By</span>
            <select
              value={sortFields}
              onChange={onSortFieldChange}
              className="select select-bordered"
              aria-label="Sort field"
            >
              <option value="publishedAt">Published date</option>
              <option value="title">Title</option>
              <option value="viewCount">Views</option>
            </select>
          </label>

          <label className="flex items-center gap-2 border p-1">
            <span className="text-sm">Order</span>
            <select
              value={sortOrder}
              onChange={onSortOrderChange}
              className="select select-bordered"
              aria-label="Sort order"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </label>
        </div>
      </div>
    <div className="border-2 border-gray-600 rounded-xl p-5 mt-0.5 gap-5 flex flex-col items-center">
      {/* Results */}
      <div className="w-full max-w-2xl gap-2 flex flex-col">
        {filteredAndSorted.length === 0 ? (
          <p className="text-center text-sm text-gray-500 mt-4">
            No results for “{debouncedQuery}”.
          </p>
        ) : (
          filteredAndSorted.map((blog) => <BlogCard key={blog.id} {...blog} />)
        )}
      </div>
    </div>
    </div>
  );
};

export default BlogList;

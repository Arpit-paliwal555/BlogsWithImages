import type { IImagePost } from "../interfaces/IImagePost";
import { useEffect, useMemo, useState, type FunctionComponent } from "react";
import ImageCard from "./ImageCard";

interface ImageListProps{
    images: IImagePost[]
}

type SortField = "caption" | "publishedAt";
type SortOrder = "asc" | "dsc";

// case sensitivity includes
const includesCI = ( heystack: string, needle: string)=>{
    return heystack.toLowerCase().includes(needle.toLowerCase());
}

//comparator factory
const makeComparator = (field: SortField, order: SortOrder)=>{
    const dir = order==="asc"? 1:-1;
    return (a:IImagePost, b:IImagePost)=>{
        switch(field){
            case "caption":
                return (a.caption.localeCompare(b.caption))*dir;
            case "publishedAt":
                return (new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
            default:
                return 0;
        }
    }
};
export const ImageList: FunctionComponent<ImageListProps> = ({images})=>{
    const [query, setQuery] = useState<string>('');
    const [debounceQuery, setDebouncedQuery] = useState<string>("");
    const [sortField, setSortField] = useState<SortField>("caption");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

    useEffect(()=>{
        const id = setTimeout(()=>setDebouncedQuery(query), 250);
        return ()=>clearTimeout(id);
    },[query]);

    const onQueryChange = (e:React.ChangeEvent<HTMLInputElement>)=>{setQuery(e.target.value)};
    const onSortFieldChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{setSortField(e.target.value as SortField)};
    const onSortOrderChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{setSortOrder(e.target.value as SortOrder)};

    const filteredAndSorted = useMemo(()=>{
        const q = debounceQuery.trim();
        const filtered = q.length? 
            images.filter((b:IImagePost)=>
                includesCI(b.caption, q)
            ):images;
        const comparator = makeComparator(sortField, sortOrder);
        return [...filtered].sort(comparator);
    },[images, debounceQuery, sortField, sortOrder]);
    return(
        <div className="border-2 p-5 mt-0.5 gap-5 flex flex-col items-center">
            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <input type="text"
                value={query}
                onChange={onQueryChange}
                placeholder="Search by caption of the image"
                className="p-1 border-2 w-full"
                aria-label="Search by caption of the image" />
                <div className="flex gap-2">
                    <label className="flex items-center gap-2 border p-1">
                        <span  className="text-sm">Sort By</span>
                        <select 
                            value={sortField}
                            onChange={onSortFieldChange}
                            aria-label="Sort Field"
                            className="block w-full rounded-lg border border-gray-300bg-white px-3 py-2 text-sm
                            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="publishedAt">Published At</option>
                            <option value="caption">Caption</option>
                        </select>
                    </label>
                    <label className="flex items-center gap-2 border p-1">
                        <span className="text-sm">Order</span>
                        <select 
                            value={sortOrder}
                            onChange={onSortOrderChange}
                            aria-label="Sort Order"
                            className="block w-full rounded-lg border border-gray-300bg-white px-3 py-2 text-sm
                            focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="asc">Asc</option>
                            <option value="dsc">Dsc</option>
                        </select>
                    </label>
                </div>
            </div>
            {/*results*/}
            <div className="w-full max-w-2xl mt-4 flex flex-col gap-4 items-center">
                {filteredAndSorted.length===0? (<p>
                    No Results For "{debounceQuery}".
                </p>):(
                    filteredAndSorted.map((i:IImagePost)=>(
                        <ImageCard key={i.id}{...i}></ImageCard>
                    ))
                )}
            </div>
        </div>
    )
}
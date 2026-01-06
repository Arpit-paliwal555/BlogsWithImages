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
        <div className="flex flex-col items-center">
            <div>
                <input type="text"
                value={query}
                onChange={onQueryChange}
                placeholder="Search by caption of the image" />
                <div>
                    <label>
                        <span>Sort By</span>
                        <select 
                            value={sortField}
                            onChange={onSortFieldChange}
                            aria-label="Sort Field"
                        >
                            <option value="publishedAt">Published At</option>
                            <option value="caption">Caption</option>
                        </select>
                    </label>
                    <label>
                        <span>Order</span>
                        <select 
                            value={sortOrder}
                            onChange={onSortOrderChange}
                            aria-label="Sort Order"
                        >
                            <option value="asc">Asc</option>
                            <option value="dsc">Dsc</option>
                        </select>
                    </label>
                </div>
            </div>
            {/*results*/}
            <div>
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
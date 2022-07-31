import React from "react";
import MangaListSkeleton from "./components/MangaListSkeleton";
import Skeleton, { SkeletonTheme} from 'react-loading-skeleton';
export default function SkeletonMain () {
    
    return (
        <div style={{marginTop: "70px"}}>
         <SkeletonTheme baseColor="rgb(32, 32, 32)" highlightColor="rgb(80, 80, 80)" duration={2}>
            <Skeleton style={{height: "150px", zIndex: "0"}}/>

            { createSkeletonManga() }
            { createSkeletonManga() }
            { createSkeletonManga() }
         </SkeletonTheme>
        </div>
    )
}

function createSkeletonManga () {
    let li = [];
    for (let i = 0; i <= 10; ++i) {
        li.push(<li>
            <MangaListSkeleton />
        </li>);
    }

    return (
       <ul style={{display: "flex", overflowX: "scroll", overflowY: "hidden", listStyleType: "none"}}>
        {li}
       </ul>
    )
}
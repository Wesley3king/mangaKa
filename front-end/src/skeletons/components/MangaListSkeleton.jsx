import react from "react";
import Skeleton, { SkeletonTheme} from 'react-loading-skeleton';
import  'react-loading-skeleton/dist/skeleton.css';

export default function MangaListSkeleton () {


    return (
        <div style={{width: "150px", margin: "10px 2px 20px 2px"}}>
         <SkeletonTheme baseColor="rgb(32, 32, 32)" highlightColor="rgb(80, 80, 80)" duration={2.3}>
            <Skeleton width="150px" height="230px" style={{zIndex: "0"}}/>
            <Skeleton style={{zIndex: "0"}} />
         </SkeletonTheme>
        </div>
    )
};
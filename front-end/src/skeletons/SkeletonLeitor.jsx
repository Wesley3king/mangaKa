import React from "react";
import Skeleton, { SkeletonTheme} from 'react-loading-skeleton';
export default function SkeletonLeitor () {

    return (
        <div style={{marginTop: "0px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>

         <SkeletonTheme baseColor="rgb(32, 32, 32)" highlightColor="rgb(80, 80, 80)" duration={2}>

         <div style={{width: "96%",marginTop:"7px", boxShadow: "1.5px 1.5px 3px hsl(0deg 0% 96% / 45%)", padding: "5px", display: "flex", backgroundColor: "black"}}>
             <Skeleton height="150px" width="100px" style={{boxShadow: "2px 2px 4px black"}}/>

             <div style={{width: "96%", margin: "5px"}}>
                 <div style={{width: "100%"}}>
                    <Skeleton height="30px" style={{boxShadow: "2px 2px 4px black", marginBottom: "4px"}}/>
                 </div>

             <div>
                 <Skeleton height="17px" />
                 <Skeleton height="17px" />
                 <Skeleton height="17px" />
                 <Skeleton height="17px" />
                 <Skeleton height="17px" />
             </div>
             </div>
         </div>

            <div style={{width:"100%", margin: "10px 0 0 0 "}}>
    
             <Skeleton height="600px" />
             <Skeleton height="600px" />
            </div>

            <div style={{width: "98%", height: "100px", margin: "5px", display: "flex", alignItems: "center", backgroundColor: "black",boxShadow: "1.5px 1.5px 3px hsl(0deg 0% 96% / 45%)"}}>
                 <Skeleton height="40px" width="30vw" style={{margin: "5px"}}/>
                 <Skeleton height="40px" width="30vw" style={{margin: "5px"}}/>
                 <Skeleton height="40px" width="30vw" style={{margin: "5px"}}/>
             </div>
         </SkeletonTheme>
        </div>
    )
};
import React from "react";
import Skeleton, { SkeletonTheme} from 'react-loading-skeleton';
export default function SkeletonInfo () {

    const miniSkelecton = () => {
        let li =[];

        for( let i =0; i < 7 ; ++i) {
            li.push( <li><Skeleton height="20px" width="100px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", margin: "20px 4px 0 4px", borderRadius: "15px"}}/></li>);
        };
        return <ul style={{width: "100%",display: "flex", overflowX: "scroll", overflowY: "hidden", listStyleType: "none"}}>{ li }</ul>
    }
   
    return (
        <div style={{marginTop: "0px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div style={{height: "70px"}}></div>
         <SkeletonTheme baseColor="rgb(32, 32, 32)" highlightColor="rgb(80, 80, 80)" duration={2}>

            <Skeleton height="450px" width="300px" style={{zIndex: "0", boxShadow: "2px 2px 4px black"}}/>
            
            <Skeleton height="40px" width="330px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "18px"}}/>
            
            <Skeleton height="45px" width="320px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "20px", borderRadius: "25px"}}/>
            
            { miniSkelecton() }

            <div style={{width: "95%"}}>
                <Skeleton height="20px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "15px"}}/>
                <Skeleton height="20px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "5px"}}/>
                <Skeleton height="20px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "5px"}}/>
                <Skeleton height="20px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "5px"}}/>
                <Skeleton height="20px" style={{zIndex: "0", boxShadow: "2px 2px 4px black", marginTop: "5px"}}/>
            </div>
         </SkeletonTheme>
        </div>
    )
};
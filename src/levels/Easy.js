import "../App.css";

export default function Easy ({cardImages, setGridCSS}){


return(

    cardImages = [
        { "src": "/memory-match/img/trophy.jpg", matched: false },
        { "src": "/memory-match/img/helmet-1.png", matched: false },
        { "src": "/memory-match/img/ring-1.png", matched: false },
        { "src": "/memory-match/img/scroll-1.png", matched: false },
        { "src": "/memory-match/img/shield-1.png", matched: false },
        { "src": "/memory-match/img/potion-1.png", matched: false }],
        setGridCSS("card-grid easy")

)

}
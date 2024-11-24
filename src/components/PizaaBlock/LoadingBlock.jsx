import React from "react";
import ContentLoader from "react-content-loader";

function LoadingBlock() {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={280}
            height={456}
            viewBox="0 0 280 456"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="140" cy="119" r="119" />
            <rect x="2" y="294" rx="6" ry="6" width="280" height="84" />
            <rect x="3" y="400" rx="6" ry="6" width="101" height="31" />
            <rect x="0" y="257" rx="6" ry="6" width="280" height="26" />
            <rect x="149" y="388" rx="22" ry="22" width="131" height="46" />
        </ContentLoader>
    );
}

export default LoadingBlock;

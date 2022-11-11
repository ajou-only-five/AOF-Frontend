import React from "react";

import quotelist from "./quotelist.json";
import "../../styles/Quotes.css";

function Quotes() {
  const [quote] = React.useState(
    quotelist[Math.floor(Math.random() * quotelist.length)]
  );
  return (
    <div className="quote-container">
      <div style={{ marginBottom: 10 }}>
        {quote.author} - {quote.authorProfile}
      </div>
      <div>{quote.message}</div>
    </div>
  );
}

export default Quotes;

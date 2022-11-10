import React from "react";

import quotelist from "./quotelist.json";
import "../../styles/Quotes.css";

function Quotes() {
  console.log(quotelist[Math.floor(Math.random() * quotelist.length)]);
  return (
    <div className="quote-container">
      <div style={{ marginBottom: 10 }}>
        {quotelist[Math.floor(Math.random() * quotelist.length)].author}
      </div>
      <div>
        {quotelist[Math.floor(Math.random() * quotelist.length)].message}
      </div>
    </div>
  );
}

export default Quotes;

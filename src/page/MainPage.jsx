import React, { useState } from "react";

import MyModal from "../components/Modal/MyModal";
import MyComponent from "../components/MyComponent";
import CalendarNavigator from "../components/CalendarNavigator/CalendarNavigator";

function Mainpage() {
  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={showModal}>모달창 열기</button>
          {isOpen && <MyModal setIsOpen={setIsOpen} el={<MyComponent />} />}
        </div>
        <div>
          <CalendarNavigator />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;

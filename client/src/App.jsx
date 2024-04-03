/* eslint-disable no-unused-vars */

import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AllRooms from "./pages/AllRooms";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/seller-dashboard" element={<DashBoard />} />
        <Route path="/bookrooms" element={<AllRooms />} />
      </Routes>
    </>
  );
};

export default App;








// import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// //import AllRooms from '.pages/AllRooms';
// import DashBoard from "./pages/DashBoard";
// //import AdminButton from './components/AdminButton';
// import AllRooms  from './pages/AllRooms';

// const App = () => {
//   return (
//     <Router>
//       <Switch>
//       <Route>
// //         <Route path="/Pages/seller-dashboard" element={<DashBoard />} />
// //         <Route path="/bookrooms" element={<AllRooms />} />
// //       </Route>
// //    
//         <Route path="/all-rooms">
//           <AllRooms />
//         </Route>
//       </Switch>
//     </Router>
//   );
// };

// export default App;


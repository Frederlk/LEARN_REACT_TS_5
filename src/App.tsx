import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./_components/Navigation";
import FavouritesPage from "./_pages/FavouritesPage";
import HomePage from "./_pages/HomePage";

const App: FC = () => {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
            </Routes>
        </>
    );
};

export default App;

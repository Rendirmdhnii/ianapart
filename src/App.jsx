import React, { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import PropertyDetail from "./pages/PropertyDetail";

export default function App() {
  // Simple State Router: 'home' | 'search' | 'detail'
  const [currentPage, setCurrentPage] = useState("home");
  const [routeParams, setRouteParams] = useState({});
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    rentType: "Harian",
  });

  // Handle page transitions & smooth scroll
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search triggers
  const handleSearch = (filters) => {
    setSearchFilters(filters);
    handleNavigate("search");
  };

  // Render active page based on state router
  const renderPage = () => {
    switch (currentPage) {
      case "search":
        return (
          <SearchResults
            onNavigate={handleNavigate}
            searchFilters={searchFilters}
            onSearch={handleSearch}
          />
        );
      case "detail":
        return (
          <PropertyDetail
            apartmentId={routeParams.id}
            initialRentType={searchFilters.rentType}
            onBack={() => handleNavigate("search")}
          />
        );
      case "home":
      default:
        return (
          <Home
            onNavigate={handleNavigate}
            onSearch={handleSearch}
          />
        );
    }
  };

  return (
    <Layout onNavigate={handleNavigate} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}

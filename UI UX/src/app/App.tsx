import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { CreateEventPage } from "./pages/CreateEventPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { MyEventsPage } from "./pages/MyEventsPage";
import { BookingsPage } from "./pages/BookingsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ExplorePage } from "./pages/ExplorePage";

export default function App() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]"
      dir={language === "ar" ? "rtl" : "ltr"}
      style={{
        fontFamily:
          language === "ar"
            ? "Cairo, sans-serif"
            : "Inter, sans-serif",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/event/:id"
            element={
              <EventDetailsPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/create-event"
            element={
              <CreateEventPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchResultsPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/my-events"
            element={
              <MyEventsPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/bookings"
            element={
              <BookingsPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <ExplorePage
                language={language}
                setLanguage={setLanguage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
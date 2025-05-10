import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Suspense,
  startTransition,
} from "react";
import Loader from "../../components/loader";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const preferDarkQuery = "(prefers-color-scheme: dark)";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem("theme") as ThemeMode | null;
      return saved ?? "light";
    } catch (e) {
      return "light";
    }
  });

  const safeSetMode = (newMode: React.SetStateAction<ThemeMode>) => {
    startTransition(() => {
      setMode(newMode);
    });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userPref = window.localStorage.getItem("theme");

    const handleChange = () => {
      let check: ThemeMode = "light";

      if (userPref) {
        check = userPref === "dark" ? "dark" : "light";
      } else {
        check = mediaQuery.matches ? "dark" : "light";
      }

      startTransition(() => {
        setMode(check);
      });

      document.documentElement.classList.toggle("dark", check === "dark");
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode: safeSetMode }}>
      <Suspense
        fallback={
          <div className="h-screen">
            <Loader />
          </div>
        }
      >
        {children}
      </Suspense>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/* THEME MANAGER */
const STORAGE_KEY = "theme";
const button = document.getElementById("theme-toggle");

/* SET THEME */
function setTheme(theme){
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem(STORAGE_KEY, theme);
    if(button){
        button.textContent = isDark ? "☀️" : "🌙";
        button.setAttribute(
            "aria-label",
            isDark
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
        );
        button.setAttribute(
            "title",
            isDark
                ? "Light Mode"
                : "Dark Mode"
        );
    }
}

/* GET INITIAL THEME */
function getInitialTheme(){
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if(savedTheme){
        return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

/* INITIALIZE */
setTheme(getInitialTheme());

/* BUTTON EVENT */
if(button){
    button.addEventListener("click", ()=>{
        const nextTheme =
            document.body.classList.contains("dark")
                ? "light"
                : "dark";
        setTheme(nextTheme);
    });
}

/* SYSTEM THEME CHANGE (only when user has not selected manually) */
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (event)=>{
    const userSelectedTheme = localStorage.getItem(STORAGE_KEY);
    if(userSelectedTheme){
        return;
    }
    setTheme(event.matches ? "dark" : "light");
});
/* THEME MANAGER */
const STORAGE_KEY = "theme";
const body = document.body;
const themeButton = document.getElementById("theme-toggle");

/* SET ICON */
function updateButton(theme){
    if(!themeButton) return;
    themeButton.style.transform = "scale(.8) rotate(180deg)";
    setTimeout(()=>{
        if(theme==="dark"){
            themeButton.textContent="☀️";
            themeButton.title="Light Mode";
            themeButton.setAttribute(
                "aria-label",
                "Switch to Light Mode"
            );
        }else{
            themeButton.textContent="🌙";
            themeButton.title="Dark Mode";
            themeButton.setAttribute(
                "aria-label",
                "Switch to Dark Mode"
            );
        }
        themeButton.style.transform="scale(1) rotate(0deg)";
    },120);
}

/* APPLY THEME */
function applyTheme(theme){
    body.classList.toggle(
        "dark",
        theme==="dark"
    );
    localStorage.setItem(
        STORAGE_KEY,
        theme
    );
    updateButton(theme);
}

/* GET INITIAL THEME */
function getInitialTheme(){
    const savedTheme = 
        localStorage.getItem(STORAGE_KEY);
    if(savedTheme){
        return savedTheme;
    }
    return window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
        ? "dark"
        : "light";
}

/* INITIALIZE */
applyTheme(getInitialTheme());

/* BUTTON EVENT */
if(themeButton){
    themeButton.addEventListener("click", ()=>{
        const nextTheme =
            body.classList.contains("dark")
                ? "light"
                : "dark";
        applyTheme(nextTheme);
    });
}

/* SYSTEM THEME CHANGE (only when user has not selected manually) */
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (event)=>{
    const savedTheme =
            localStorage.getItem(STORAGE_KEY);
        if(savedTheme){
            return;
        }
        applyTheme(
            event.matches
                ? "dark"
                : "light"
        );
    }
);
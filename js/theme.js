const button = document.getElementById("theme-toggle");

function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);

    if (button) {
        button.textContent = theme === "dark" ? "☀️" : "🌙";
        button.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to Light Mode"
                : "Switch to Dark Mode"
        );
    }
}

const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

setTheme(savedTheme);

if (button) {
    button.addEventListener("click", () => {
        const nextTheme =
            document.body.classList.contains("dark")
                ? "light"
                : "dark";

        setTheme(nextTheme);
    });
}
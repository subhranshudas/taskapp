export function reloadWindow() {
    // tmeporary hack for next js cache
    if (typeof window === "object" &&
        typeof window.location === "object" &&
        typeof window.location.reload === "function") {
            window.location.reload()
    }
}
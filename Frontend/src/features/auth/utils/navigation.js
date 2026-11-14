export function navigateToFrontend(path, navigate) {
    const frontendURL = import.meta.env.VITE_FRONTEND_URL ||
        (import.meta.env.PROD ? 'https://productivity-dashboard-4.onrender.com' : window.location.origin)
    const destination = new URL(path, frontendURL)

    if (destination.origin !== window.location.origin) {
        window.location.assign(destination.href)
        return
    }

    navigate(`${destination.pathname}${destination.search}${destination.hash}`)
}

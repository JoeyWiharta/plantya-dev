import { getBaseURL } from "./ApiHelper"

const SseInstance = (service = "management") => {
    return (path) => {
        const baseURL = getBaseURL(service)
        if (!baseURL) throw new Error(`BASE_URL not found for service "${service}"`)
        return new EventSource(`${baseURL}${path}`, { withCredentials: true })
    }
}

export default SseInstance
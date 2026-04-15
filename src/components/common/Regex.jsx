export const capitalizeWords = (text = "") => {
    if (!text) return "";
    return text
        .toLowerCase()
        .split(/[\s_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });
};

// Formatter for timezone raw
export const formatTimeStamp = (isoString) => {
    if (!isoString) return ""
    const date = new Date(isoString)
    if (isNaN(date)) return ""

    const pad = (n) => String(n).padStart(2, "0")
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
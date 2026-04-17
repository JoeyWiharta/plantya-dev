import { ToasterCustom } from "@/components/common/ToasterCustom"

// Handle for token expired
export const handleApiError = (error) => {
    if (error?.isUnauthorized || error?.response?.status === 401) {
        return true
    }

    ToasterCustom.error(
        error?.response?.data?.message ||
        "System is unavailable, please try again later."
    )

    return false
}
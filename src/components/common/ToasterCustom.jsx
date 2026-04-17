import { toast } from "sonner"
import { X, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

const dismissAction = {
    label: <X size={14} />,
    onClick: () => { }
}

export const ToasterCustom = {
    dismiss: (id) => toast.dismiss(id),
    loading: (msg) => toast.loading(msg),
    error: (msg) => toast.error(msg, {
        action: dismissAction,
        icon: <AlertCircle size={16} className="text-red-500" />
    }),
    success: (msg) => toast.success(msg, {
        action: dismissAction,
        icon: <CheckCircle size={16} className="text-green-500" />
    }),
    warning: (msg) => toast.warning(msg, {
        action: dismissAction,
        icon: <AlertTriangle size={16} className="text-yellow-500" />
    }),
    info: (msg, opts) => toast(msg, { ...opts, action: dismissAction }),
    promise: async (promise, msgs) => {
        const loadingId = toast.loading(msgs.loading)
        try {
            const result = await promise
            toast.dismiss(loadingId)
            toast.success(typeof msgs.success === "function" ? msgs.success(result) : msgs.success, {
                icon: <CheckCircle size={16} className="text-green-500" />,
                action: dismissAction,
            })
            return result
        } catch (err) {
            toast.dismiss(loadingId)

            const message =
                typeof msgs.error === "function"
                    ? msgs.error(err)
                    : msgs.error

            if (err?.isUnauthorized || message == null) {
                throw err
            }
            toast.error(message, {
                icon: <AlertCircle size={16} className="text-red-500" />,
                action: dismissAction,
            })

            throw err
        }
    },
}
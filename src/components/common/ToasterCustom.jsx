import { toast } from "sonner"
import { X, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

const dismissAction = {
    label: <X size={14} />,
    onClick: () => { }
}

export const ToasterCustom = {
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
            toast.error(typeof msgs.error === "function" ? msgs.error(err) : msgs.error, {
                icon: <AlertCircle size={16} className="text-red-500" />,
                action: dismissAction,
            })
            throw err
        }
    },
}
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverHeader, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BatteryLow, Bell, BellOff, CheckCheck, CircleHelp, Dot, TriangleAlert } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"
import { getNotication, subscribeNotificationSse, updateNotificationAll, updateNotificationOne } from "@/utils/ListApi";
import toast from "react-hot-toast"

const LIMIT = 5
const Notification = (props) => {

    // Refactor Code 
    const [modalOpen, setModalOpen] = useState(false)
    const [notifData, setNotifData] = useState([])
    const [unreadNotifCount, setUnreadNotifCount] = useState(0)
    const [countNotifVisible, setCountNotifVisible] = useState(LIMIT)
    const [loadingNotif, setLoadingNotif] = useState(false)

    const visibleNotif = notifData.slice(0, countNotifVisible)
    const hasMore = countNotifVisible < notifData.length

    // Fetch API Notification List
    const fetchNotification = useCallback(async () => {
        setLoadingNotif(true)
        try {
            const response = await getNotication()
            const notifData = response?.data?.notifications ?? []
            const unreadNotif = notifData.filter((data) => !data.isRead).length

            setNotifData(notifData)
            setUnreadNotifCount(unreadNotif)
        } catch (error) {
            toast.error("System is unavailable, please try again later.");
        } finally {
            setLoadingNotif(false)
        }
    }, [])

    // Load notif on first render
    useEffect(() => {
        fetchNotification()
    }, [])

    // Fetch using SSE (Event Source)
    useEffect(() => {
        const eventSource = subscribeNotificationSse()

        eventSource.addEventListener("notification", (event) => {
            try {
                const parsedResponse = JSON.parse(event.data)
                setUnreadNotifCount(parsedResponse?.unreadCount)

                if (parsedResponse?.notification) {
                    toast(parsedResponse.notification.message,
                        {
                            icon: parsedResponse?.notification?.notificationType === "BATTERY" ? <BatteryLow /> : <TriangleAlert />,
                        })
                }
                fetchNotification()
            } catch (error) {
                console.log(error)
            }
        })

        eventSource.onerror = (error) => console.log(error)
        return () => eventSource.close()
    }, [])

    // Function Modal Open Then Fetch Notif List
    const handleOpenChange = (open) => {
        if (open) {
            fetchNotification()
        } else {
            setCountNotifVisible(LIMIT)
        }
    }

    const handleScroll = (e) => {
        const el = e.currentTarget
        const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
        if (nearBottom && hasMore) {
            setCountNotifVisible((prev) => prev + LIMIT)
        }
    }

    // Function Read Each Notif
    const markAsRead = useCallback(async (param) => {
        if (!param.isRead) {
            setNotifData((prev) =>
                prev.map((data) => data.id === param.id ? { ...data, isRead: true } : data)
            )
            setUnreadNotifCount((prev) => Math.max(0, prev - 1))
            try {
                await updateNotificationOne(param.id)
            } catch (error) {
                setNotifData((prev) =>
                    prev.map((data) => data.id === param.id ? { ...data, isRead: false } : data)
                )
                setUnreadNotifCount((prev) => prev + 1)
                toast.error("Failed to mark as read.")
            }
        }
    }, [])

    // Function Read All Notif
    const markAsAllRead = useCallback(async () => {
        setNotifData((prev) => prev.map((data) => ({ ...data, isRead: true })))
        setUnreadNotifCount(0)

        try {
            await updateNotificationAll()
        } catch (error) {
            fetchNotification()
            toast.error("Failed to mark all as read.")
        }
    }, [fetchNotification])



    const mapIcon = (type) => {
        switch (type) {
            case "BATTERY":
                return (
                    <div className="bg-red-500/20 p-2 rounded-full">
                        <BatteryLow size={18} className="text-red-500" />
                    </div>
                )
            default:
                return (
                    <div className="bg-yellow-500/20 p-2 rounded-xl">
                        <TriangleAlert size={18} className="text-yellow-500" />
                    </div>
                )
        }
    }

    return (
        <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button className="rounded-full relative" variant="outline" size="icon-sm">
                    <Bell />
                    {unreadNotifCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                            {unreadNotifCount > 99 ? "99+" : unreadNotifCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="sm:w-100 p-0">
                <PopoverHeader className="flex flex-row items-center justify-between px-4 py-2 border-b-2">
                    <div className="flex flex-row items-center gap-2">
                        <Bell size={18} />
                        <span className="text-base">Notifications</span>
                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                tabIndex={-1}
                                disabled={unreadNotifCount === 0}
                                variant="outline"
                                size="icon-sm"
                                onClick={markAsAllRead}
                            >
                                <CheckCheck />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-xs font-medium">Mark All as Read</span>
                        </TooltipContent>
                    </Tooltip>
                </PopoverHeader>

                <div
                    onScroll={handleScroll}
                    className="flex flex-col max-h-72 sm:max-h-64 overflow-y-auto scrollbar-minimal pr-1"
                >
                    {notifData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
                            <BellOff className="opacity-70" />
                            <p className="text-sm">No notifications available</p>
                        </div>
                    ) : (
                        <>
                            {visibleNotif.map((data) => (
                                <div
                                    key={data.id}
                                    className="flex flex-row gap-4 px-4 py-3 cursor-pointer border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                                    onClick={() => markAsRead(data)}
                                >
                                    <div className="flex flex-row gap-4 flex-1 min-w-0">
                                        <div className="flex items-center">
                                            {mapIcon(data.notificationType)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">{data.message}</p>
                                            <span className="text-xs text-muted-foreground/60">{data.time}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        {!data.isRead && <Dot className="text-red-500" />}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {notifData.length > 0 && (
                    <div className="py-2 border-t">
                        <p className="text-xs text-muted-foreground/60 text-center">
                            Showing notifications from the last 14 days
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default Notification
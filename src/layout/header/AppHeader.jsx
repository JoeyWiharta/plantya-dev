import React, { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import BreadcrumbCustom from "@/components/common/BreadcrumbCustom"
import { Bell, CalendarDays } from "lucide-react"
import { formatDate } from "@/components/common/Regex"
import { Button } from "@/components/ui/button"

const AppHeader = () => {
    const [date, setDate] = useState(new Date())

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <BreadcrumbCustom />


            </div>

            <div className="flex flex-row gap-8 items-center">
                <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    <p>{formatDate(date)}</p>
                </div>

                <Button className="rounded-full" variant="outline" size="icon">
                    <Bell />
                </Button>
            </div>

        </header>
    )
}

export default AppHeader
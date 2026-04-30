import React, { useState, useEffect } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronRight, Clock, Leaf, TrendingDown, TrendingUp, CalendarDays } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PotCard from "./PotCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { subscribeDashboardSse } from "@/utils/ListApi";
import { useAuth } from "@/context/AuthContext";
import SummaryCard from "./SummaryCard";



const Dashboard = () => {
    const { loginStatus } = useAuth()

    const [app001p01Page, setApp001p01Page] = useState(true);
    const [allData, setAllData] = useState([])

    const anomaliesToday = allData?.anomalyToday || {};
    const anomaliesLastWeek = allData?.anomalyInAWeek || {};
    const latestAnomaly = allData?.lastDetected || {};

    const onlinePot = allData?.potList?.filter((p) => p.status === "online").length || 0;
    const offlinePot = allData?.potList?.filter((p) => p.status === "offline").length || 0;

    const isIncrease = anomaliesToday.yesterdayPercent > 0;
    const isIncreaseWeek = anomaliesLastWeek.lastWeekPercent < 0;


    const [dashboardData, setDashboardData] = useState([])

    const [potOverviewData, setPotOverviewData] = useState([])

    // Daily Anomaly Card
    const [dailyAnomalyData, setDailyAnomalyData] = useState([])
    const [dailyAnomalyGrowth, setDailyAnomalyGrowth] = useState(0)
    const [dailyAnomalyGrowthFlag, setDailyAnomalyGrowthFlag] = useState("")


    const [weeklyAnomalyData, setWeeklyAnomalyData] = useState([])
    const [latestAnomalyData, setLatestAnomalyData] = useState([])

    // -------------------- Listen SSE Subscribe Dashboard -------------------- //
    useEffect(() => {
        if (!loginStatus) return

        const eventSource = subscribeDashboardSse()

        const handleEvent = (event) => {
            try {
                const jsonResponse = JSON.parse(event.data)
                if (jsonResponse) {
                    setDashboardData(jsonResponse)
                }
            } catch (error) {
                console.log(error)
            }
        }

        eventSource.addEventListener("snapshot", handleEvent)
        eventSource.addEventListener("dashboard-update", handleEvent)

        eventSource.onerror = (error) => {
            if (!loginStatus) {
                eventSource.close()
                return
            }
            console.log(error)
        }

        return () => {
            eventSource.removeEventListener("snapshot", handleEvent)
            eventSource.removeEventListener("dashboard-update", handleEvent)
            eventSource.close()
        }
    }, [loginStatus])
    // -------------------- Listen SSE Subscribe Dashboard -------------------- //

    useEffect(() => {
        console.log("Check Dashboard Data : ", dashboardData)

        const anomalySummary = dashboardData?.anomalySummary || {}
        const current = anomalySummary?.today?.current ?? 0
        const previous = anomalySummary?.today?.previous ?? 0
        const growth = current - previous

        setPotOverviewData(dashboardData?.potStatus || {})
        setDailyAnomalyData(anomalySummary)
        setDailyAnomalyGrowth(growth)

        if (current > previous) {
            setDailyAnomalyGrowthFlag("increase")
        } else if (current < previous) {
            setDailyAnomalyGrowthFlag("decrease")
        } else {
            setDailyAnomalyGrowthFlag("neutral")
        }

    }, [dashboardData])



    return (
        <React.Fragment>
            <RootPageCustom
                title={"Dashboard"}
                desc={"Monitor your plant pots in real-time"}
            >
                {/* Main Wrapper */}
                <div className={`${app001p01Page ? "flex" : "hidden"} flex-col flex-1 gap-6 bg-gray-800`}>
                    <SummaryCard
                        potOnline={potOverviewData.onlineCount}
                        potOffline={potOverviewData.offlineCount}
                        dailyAnomaly
                    />




                    {/* Layout card agak eror bug */}
                    {/* Mapping show for 4 card by data */}

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"> */}
                    <PotCard
                        potData={allData}
                    />
                    {/* </div> */}
                </div>


            </RootPageCustom >
        </React.Fragment >
    );
}
export default Dashboard;

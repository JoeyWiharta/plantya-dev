import React, { useState } from "react";
import RootPageCustom from "../../components/common/RootPageCustom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";


const Dashboard = () => {
    const [firstRender, setFirstRender] = useState(false)
    const [app001p01Page, setApp001p01Page] = useState(true);



    return (
        <React.Fragment>
            <RootPageCustom>
                <div className={`${app001p01Page ? "flex" : "hidden"} flex-col px-6 gap-2`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Monitor your plant pots in real-time</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-amber-100">
                        <Card className="bg-blue-100">Anomalies Today</Card>
                        <Card className="bg-green-100">Anomalies This Week</Card>
                        <Card>Last Detected</Card>
                    </div>

                </div>


            </RootPageCustom>
        </React.Fragment >
    );
}
export default Dashboard;

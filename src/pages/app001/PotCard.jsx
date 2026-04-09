import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import potDashboard from "../../assets/images/potDashboard.webp"
import { Battery, ChevronRight, Droplet, Sprout, Thermometer, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"


const PotCard = (props) => {
    return (
        <>
            <Card className="flex col-span-3">
                <CardContent className="flex flex-col gap-2">
                    <div className="flex justify-end">
                        <Wifi className="text-green-500" />
                    </div>

                    <div className="flex justify-center">
                        <img src={props.image} className="h-35 w-25" />
                    </div>

                    <div className="text-center">
                        <p className="font-semibold text-sm">{props.name}</p>
                        <p className="text-xs text-muted-foreground">{props.status}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Card className="flex flex-row items-center gap-2 px-3 py-2">
                            <Thermometer size={14} className="text-orange-400 flex-shrink-0" />
                            <span className="text-xs">Temp</span>
                            <span className="text-xs">{props.temp}</span>

                        </Card>
                        <Card className="flex flex-row items-center gap-2 px-3 py-2">
                            <Droplet size={14} className="text-blue-400 flex-shrink-0" />
                            <span className="text-xs">Humidity</span>
                        </Card>
                        <Card className="flex flex-row items-center gap-2 px-3 py-2">
                            <Sprout size={14} className="text-green-500 flex-shrink-0" />
                            <span className="text-xs">Soil Moisture</span>
                        </Card>
                        <Card className="flex flex-row items-center gap-2 px-3 py-2">
                            <Battery size={14} className="text-yellow-400 flex-shrink-0" />
                            <span className="text-xs">Battery</span>
                        </Card>
                    </div>

                    <Button variant="outline" className="w-full justify-between px-4">
                        View Detail
                        <ChevronRight />
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}
export default PotCard
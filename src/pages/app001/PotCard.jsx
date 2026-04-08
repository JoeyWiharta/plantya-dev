import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import potDashboard from "../../assets/images/potDashboard.webp"


const PotCard = (props) => {
    return (
        <>
            <Card className="flex col-span-3">
                <img src={props.image} className="h-70 w-60" />

                <div>
                    <CardHeader>
                        <CardTitle>{props.name}</CardTitle>
                        <p>{props.status}</p>
                    </CardHeader>

                    <CardContent className="flex flex-row col-span-12 gap-4">
                        <Card className="col-span-6">Temp</Card>
                        <Card className="col-span-6">Humidity</Card>
                        <Card className="col-span-6">Soil Moisture</Card>
                        <Card className="col-span-6">Battery</Card>
                    </CardContent>
                </div>
            </Card>
        </>
    )
}
export default PotCard
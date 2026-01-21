// menuRoutes.jsx
import LazyLoadRoutes from "./LazyLoadRoutes";
import { mdiAccountOutline, mdiHomeThermometerOutline, mdiAccessPointNetwork, mdiChartBoxOutline } from '@mdi/js';

const DashboardRoute = () => [
    {
        text: "Dashboard",
        icon: mdiViewDashboardOutline,
        path: "/dashboard"
    }
];

const MasterDataRoutes = () => [
    {
        path: "/users",
        text: "Master User",
        icon: mdiAccountOutline,
        component: LazyLoadRoutes(() => import("../pages/app002/MasterUser"))
    },
    {
        path: "/clusters",
        text: "Master Cluster",
        icon: mdiHomeThermometerOutline,
        component: LazyLoadRoutes(() => import("../pages/app003/MasterCluster"))
    },
    {
        path: "/devices",
        text: "Master Device",
        icon: mdiAccessPointNetwork,
        component: LazyLoadRoutes(() => import("../pages/app004/MasterDevice"))
    },
    {
        path: "/master-contoh",
        text: "Master Contoh",
        icon: mdiHomeThermometerOutline,
        component: LazyLoadRoutes(() => import("../pages/app005/MasterContoh"))
    },
];

const ReportsRoutes = () => [
    {
        path: "/reports/table",
        text: "Table Report",
        icon: mdiChartBoxOutline,
        component: LazyLoadRoutes(() => import("../pages/Reports/Table"))
    },
    {
        path: "/reports/graph",
        text: "Graph Report",
        icon: mdiChartBoxOutline,
        component: LazyLoadRoutes(() => import("../pages/Reports/Graph"))
    }
];

const MenuGroups = () => [
    { title: "MAIN", items: [dashboardRoute] }, // Dashboard tetap masuk main
    { title: "Master Data", items: masterDataRoutes },
    { title: "Reports", items: reportsRoutes },
];

export default { DashboardRoute, MasterDataRoutes, ReportsRoutes, MenuGroups }

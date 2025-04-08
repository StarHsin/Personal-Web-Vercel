import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/Components/ui/breadcrumb";
import { MdHome } from "./icon";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CustomBreadcrumb() {
    const navigate = useNavigate();
    const location = useLocation();
    let pathnames = location.pathname.split("/").filter(x => x);

    if (pathnames.includes("Photos") && !pathnames.includes("Activity")) {
        pathnames = ["Activity", "Photos"];
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link to="/" className="text-white hover:text-blue-700">首頁</Link>
                </BreadcrumbItem>
            
                <BreadcrumbItem>
                    {pathnames.map((name, index) => {
                        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                        const isLast = index === pathnames.length - 1;
                        const displayName = convertBreadcrumbName(name);

                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbSeparator className="text-white hover:text-blue-700"/>
                                {!isLast ? (
                                    <Link to={routeTo} className="text-white hover:text-blue-700">{displayName}</Link>
                                ) : (
                                    <span className="text-white hover:text-blue-700">{displayName}</span>
                                )}
                            </BreadcrumbItem>
                        );
                    })}
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

function convertBreadcrumbName(name) {
    const nameMap = {
        "Activity": "活動總覽",
        "Photos": "活動相簿",
        "awards": "獎項",
    };
    return nameMap[name] || name;
}
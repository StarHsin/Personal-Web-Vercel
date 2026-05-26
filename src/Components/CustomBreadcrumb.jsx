import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";

export default function CustomBreadcrumb() {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.includes("Photos") && !pathnames.includes("Activity")) {
    pathnames = ["Activity", "Photos"];
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link to="/" className="font-semibold text-white hover:text-blue-700">
            首頁
          </Link>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const displayName = convertBreadcrumbName(name);

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="font-semibold text-white" />
              <BreadcrumbItem>
                {!isLast ? (
                  <Link
                    to={routeTo}
                    className="font-semibold text-white hover:text-blue-700"
                  >
                    {displayName}
                  </Link>
                ) : (
                  <span className="font-semibold text-white hover:text-blue-700">
                    {displayName}
                  </span>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function convertBreadcrumbName(name) {
  const nameMap = {
    Activity: "活動總覽",
    Photos: "活動相簿",
    awards: "獎項",
  };
  return nameMap[name] || name;
}

import { ChevronRight, HomeOutlined } from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

export const SwitchBanner = ({ pathConfig }) => {
  const { pathname, search } = useLocation();
  const noBanner = new URLSearchParams(search).get("noBanner");

  const getTabs = useMemo(() => {
    let tab = pathname.toLowerCase();
    tab = tab
      .split("/")
      .filter((key) => key && key.toLowerCase() !== pathConfig);
    tab = tab.length ? tab : ["dashboard"];
    return tab;
  }, [pathname, pathConfig]);

  const getTabHrefs = useMemo(() => {
    let tab = `/${pathConfig}`;
    return getTabs.map((key) => {
      tab = `${tab}/${key}`;
      return tab;
    });
  }, [getTabs, pathConfig]);

  console.log("getTabHrefs-->", getTabHrefs);

  const getPathName = useCallback(
    (path) =>
      path
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
    []
  );

  if (noBanner === "true") return null;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRight fontSize="small" />}
      className="pr-4 pl-4 pt-2"
    >
      <Link
        underline="hover"
        sx={{ display: "flex", alignItems: "center" }}
        color="inherit"
        href={`/${pathConfig}`}
      >
        <HomeOutlined sx={{ mr: 0.5 }} fontSize="medium" />
      </Link>
      {getTabs.map((tab) => (
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          key={tab}
          // href={getTabHrefs[idx]}
        >
          {getPathName(tab)}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
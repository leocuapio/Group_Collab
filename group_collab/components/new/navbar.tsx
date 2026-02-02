"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Box,
  Link,
} from "@mui/material";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const NAV_MENU = [
  { name: "Projects", icon: RectangleStackIcon, href: "/projects" },
  { name: "Account", icon: UserCircleIcon, href: "/account" },
  {
    name: "Docs",
    icon: CommandLineIcon,
    href: "https://www.material-tailwind.com/docs/react/installation",
    external: true,
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
}

function NavItem({ children, href, external }: NavItemProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!href) return;
    if (external) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  return (
    <li>
      <Link
        component="button"
        onClick={handleClick}
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 500,
          color: "text.primary",
          cursor: "pointer",
        }}
      >
        {children}
      </Link>
    </li>
  );
}

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, lg: 3 } }}>
        {/* Logo */}
        <Typography
          component="span"
          sx={{ fontWeight: "bold", color: "primary.main", cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          Material Tailwind
        </Typography>

        {/* Desktop Menu */}
        <Box
          component="ul"
          sx={{
            display: { xs: "none", lg: "flex" },
            gap: 4,
            listStyle: "none",
            alignItems: "center",
            m: 0,
            p: 0,
          }}
        >
          {NAV_MENU.map(({ name, icon: Icon, href, external }) => (
            <NavItem key={name} href={href} external={external}>
              <Icon width={20} height={20} />
              {name}
            </NavItem>
          ))}
        </Box>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1, ml: 2 }}>
          <Button variant="text" onClick={() => router.push("/login")}>
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push("/projects")}
            sx={{
              backgroundColor: "#9ca3af",
              color: "#fff",
              "&:hover": { backgroundColor: "#6b7280" },
            }}
          >
            blocks
          </Button>
        </Box>

        {/* Mobile Toggle */}
        <IconButton
          onClick={handleOpen}
          sx={{ display: { xs: "inline-flex", lg: "none" } }}
        >
          {open ? <XMarkIcon width={24} height={24} /> : <Bars3Icon width={24} height={24} />}
        </IconButton>
      </Toolbar>

      {/* Mobile Collapse */}
      <Collapse in={open}>
        <Box sx={{ px: 2, pt: 2, borderTop: "1px solid #e0e0e0" }}>
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              m: 0,
              p: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {NAV_MENU.map(({ name, icon: Icon, href, external }) => (
              <NavItem key={name} href={href} external={external}>
                <Icon width={20} height={20} />
                {name}
              </NavItem>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 1 }}>
            <Button variant="text" onClick={() => router.push("/login")}>
              Sign In
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push("/projects")}
              sx={{
                backgroundColor: "#9ca3af",
                color: "#fff",
                "&:hover": { backgroundColor: "#6b7280" },
              }}
            >
              blocks
            </Button>
          </Box>
        </Box>
      </Collapse>
    </AppBar>
  );
}

export default Navbar;

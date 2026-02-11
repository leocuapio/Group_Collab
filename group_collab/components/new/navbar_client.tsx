"use client";

import React from "react";
import NextLink from "next/link";
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

const NAV_MENU = [
  { name: "Projects", icon: RectangleStackIcon, href: "/protected/projects" },
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
  href: string;
  external?: boolean;
}

function NavItem({ children, href, external }: NavItemProps) {
  return (
    <li>
      <Link
        component={NextLink}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
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

export function NavbarClient({
  authSlot,
}: {
  authSlot: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, lg: 3 },
        }}
      >
        {/* Logo */}
        <Typography
          component={NextLink}
          href="/"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Group Collabs
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

        {/* Auth Buttons (from Server) */}
        {authSlot}

        {/* Mobile Toggle */}
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{ display: { xs: "inline-flex", lg: "none" } }}
        >
          {open ? (
            <XMarkIcon width={24} height={24} />
          ) : (
            <Bars3Icon width={24} height={24} />
          )}
        </IconButton>
      </Toolbar>

      {/* Mobile Menu */}
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
            <Button component={NextLink} href="/auth/login" variant="text">
              Sign In
            </Button>

            <Button
              component={NextLink}
              href="/protected/projects"
              variant="contained"
              sx={{
                backgroundColor: "#9ca3af",
                color: "#fff",
                "&:hover": { backgroundColor: "#6b7280" },
              }}
            >
              Blocks
            </Button>
          </Box>
        </Box>
      </Collapse>
    </AppBar>
  );
}

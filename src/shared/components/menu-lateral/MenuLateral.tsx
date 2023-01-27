import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import { PropsWithChildren } from "react";
import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { useAppDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListItemLinkPropos {
  to: string;
  label: string;
  icon: string;
  onClick: () => void;
}

const ListItemLink: React.FC<IListItemLinkPropos> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, toggleDrawerOpen } = useAppDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://avatars.githubusercontent.com/u/97951537?s=400&u=4f8d3699bd0f3f0a7a3b270229f828c1439ee508&v=4"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              <ListItemLink
                icon="home"
                to="/pagina-inicial"
                label="Página inicial"
                onClick={toggleDrawerOpen}
              />
              <ListItemLink
                icon="star"
                to="/pagina-inicial2"
                label="Página inicial2"
                onClick={toggleDrawerOpen}
              />
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};

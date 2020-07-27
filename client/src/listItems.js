import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const availCourses = (
  <div>
    <ListItem button>
      <ListItemText primary="CS 1331" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="CS 1332" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="CS 2110" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="CS 2050" />
    </ListItem>
  </div>
);

export const resCourses = (
  <div>
    <ListItem button>
      <ListItemText primary="CS 3600" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="MATH 3406" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="PHYS 2212" />
    </ListItem>
  </div>
);
// assets
import { IconDashboard } from '@tabler/icons-react';

const icons = { IconDashboard };

const dashboard = {
  id: 'project',
  title: 'Dashboard Management',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Project',
      type: 'item',
      url: '/',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'add-project',
      title: 'Add Project',
      type: 'item',
      url: '/project/add',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },

    {
      id: 'task',
      title: 'Task',
      type: 'item',
      url: '/task',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },
    {
      id: 'add-task',
      title: 'Add Task',
      type: 'item',
      url: '/task/add',
      icon: icons.IconDashboard,
      breadcrumbs: true
    },
    
  ]
};

export default dashboard;

const initialData = {
    tasks: {
      'task_1': { id: 'task_1', content: 'Take out the garbage' },
      'task_2': { id: 'task_2', content: 'Watch my favorite show' },
      'task_3': { id: 'task_3', content: 'Charge my phone' },
      'task_4': { id: 'task_4', content: 'Cook dinner' },
    },
    columns: {
      'column_1': {
        id: 'column_1',
        title: 'To do', 
        taskIds: ['task_1', 'task_2', 'task_3', 'task_4'],
      },
      'column_2': {
        id: 'column_2',
        title: 'In Progress',
        taskIds: [],
      },
      'column_3': {
        id: 'column_3',
        title: 'Done',
        taskIds: [],
      },
      'column_4': {
        id: 'column_4',
        title: 'Bug',
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column_1', 'column_2', 'column_3', 'column_4'],
  };
  
  export default initialData;
  
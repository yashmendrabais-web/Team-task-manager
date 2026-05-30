import React from 'react';
import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';
import Badge from '../common/Badge';

const TaskStatusBadge = React.memo(({ status }) => {
  const label = STATUS_LABELS[status] || 'Unknown';
  const color = STATUS_COLORS[status] || 'bg-gray-100 text-gray-700';
  return <Badge color={color}>{label}</Badge>;
});

export { TaskStatusBadge };
export default TaskStatusBadge;

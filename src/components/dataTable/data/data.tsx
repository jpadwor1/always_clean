import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@radix-ui/react-icons';
import {
  Target,
  UserRoundCheck,
  PauseCircle,
  Star,
  HeartCrack,
} from 'lucide-react';

export const labels = [
  {
    value: 'lead',
    label: 'lead',
  },
  {
    value: 'inactive',
    label: 'Inactive',
  },
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'vip',
    label: 'VIP',
  },
  {
    value: 'lost',
    label: 'Lost',
  },
];

export const statuses = [
  {
    value: 'LEAD',
    label: 'Lead',
    icon: Target,
  },
  {
    value: 'ACTIVE',
    label: 'Active',
    icon: UserRoundCheck,
  },
  {
    value: 'INACTIVE',
    label: 'Inactive',
    icon: PauseCircle,
  },
  {
    value: 'VIP',
    label: 'VIP',
    icon: Star,
  },
  {
    value: 'LOST',
    label: 'Lost',
    icon: HeartCrack,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];

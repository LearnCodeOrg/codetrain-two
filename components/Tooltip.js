import TooltipBase from '@mui/material/Tooltip';

import styles from '../styles/components/Tooltip.module.css';

export default function Tooltip(props) {
  const { title } = props;

  return (
    <TooltipBase title={title} arrow disableInteractive>
      {props.children}
    </TooltipBase>
  );
}

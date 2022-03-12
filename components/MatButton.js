import Tooltip from './Tooltip';

import styles from '../styles/components/MatButton.module.css';

export default function MatButton(props) {
  const { Icon, tooltip, onClick } = props;

  return (
    tooltip ?
    <Tooltip title={tooltip}>
      <button onClick={onClick}>
        <Icon />
      </button>
    </Tooltip> :
    <button onClick={onClick}>
      <Icon />
    </button>
  );
}

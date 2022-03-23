import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';

import styles from '../styles/components/CodeEditor.module.css';

export default function CodeEditor(props) {
  return (
    <div className={styles.container}>
    <AceEditor
      mode="javascript"
      theme="monokai"
      wrapEnabled={true}
      showPrintMargin={false}
      tabSize={2}
      setOptions={{
        useWorker: false,
        enableLiveAutocompletion: true
      }}
      width="500px"
      height="500px"
      markers={
        (props.marker && props.marker.object === props.currObject) ?
        [{
          startRow: props.marker.row - 1,
          startCol: props.marker.col - 1,
          endRow: props.marker.row,
          endCol: 0,
          className: 'errormarker',
          type: 'text'
        }] :
        []
      }
      {...props}
    />
    </div>
  );
}

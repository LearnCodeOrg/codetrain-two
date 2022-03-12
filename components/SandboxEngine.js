import styles from '../styles/components/SandboxEngine.module.css';

export default function SandboxEngine() {
  return (
    <div>
      <Header {...props} />
      <Dialog open={saving} onClose={() => setSaving(false)}>
        <DialogContent>
          <form
            className={styles.saveform}
            onSubmit={e => {
              e.preventDefault();
              saveSnippet();
            }}
          >
            Save Snippet
            <input
              className="textinput"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <button className="textbutton">
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <div className={
        docsHidden ? `${styles.docs} ${styles.hidden}` : styles.docs
      }>
        <div className={styles.button}>
          {
            docsHidden ?
            <MatButton
              onClick={() => setDocsHidden(false)}
              Icon={ArrowCircleRightIcon}
            /> :
            <MatButton
              onClick={() => setDocsHidden(true)}
              Icon={ArrowCircleLeftIcon}
            />
          }
        </div>
        <div className={styles.docscontent}>
          <h2>Docs</h2>
          <p>log(text): logs given text</p>
          <p>logImage(url): logs given image</p>
          <p>prompt(text): opens prompt and returns input</p>
          <p>alert(text): opens alert</p>
        </div>
      </div>
      <div>
        <Code
          value={code}
          onChange={val => setCode(val)}
        />
        <div className={styles.toolbar}>
          <IconButton
            onClick={compile}
            icon="play"
          />
          <IconButton
            onClick={save}
            icon="save"
          />
        </div>
      </div>
      <div className={styles.console}>
        <div className={styles.head}>
          <span>Console</span>
          <button
            className="textbutton"
            onClick={clear}
          >
            Clear
          </button>
        </div>
        <div className={styles.logs}>
          {
            logs.map((log, i) =>
              <div key={i}>
                {
                  log.type === 'text' ?
                  <p>{log.text}</p> :
                  log.type === 'image' ?
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={log.url} alt={log.url} /> :
                  null
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

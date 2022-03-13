import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

// highlights all javascript code
export default function highlightJs() {
  // highlight blocks
  hljs.registerLanguage('javascript', javascript);
  // highlight lines
  document.querySelectorAll(`.language-javascript`).forEach(el =>
    hljs.highlightElement(el)
  );
}

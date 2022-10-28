import showdown from 'showdown';

const converter = new showdown.Converter();
converter.setFlavor('github');

export default function md(element) {
  const markdown = element.innerText;
  console.log(markdown);
  element.innerHTML = converter.makeHtml(markdown);
}

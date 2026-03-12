import _ from 'lodash';
import Clipboard from 'clipboard';

document.addEventListener('DOMContentLoaded', () => {
  const button = new Clipboard('button');

  function handleSuccess(event: ClipboardJS.Event) {
    console.log('Texto copiado.');
    console.log(event.action);
  }

  button.on('success', handleSuccess);
}); 

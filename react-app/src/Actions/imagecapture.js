import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';

export const saveAs = (blob, fileName) =>{
    var elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
        elem.click();
    } else {
        elem.target = '_blank';
        elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
        }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }

  var node = document.getElementById('root');

  
  export const imageCapture = () =>{
    console.log('hi')
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        saveAs(dataUrl, 'image.png');
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }
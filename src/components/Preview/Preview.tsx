import React, { FC, useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  error: string;
}
const html = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
   </head>
   <body>
      <div id="root"></div>
      <script>
      const handleError = (err) => {
        const root = document.querySelector("#root");
        root.innerHTML = '<div style = "color: red;"><h4>Runtime Error: </h4>' + err + "</div>"

      }

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        })

         window.addEventListener("message", (event) => {
            try {
               eval(event.data)
            } catch(err) {
              handleError(err);
            }
         }, false)
      </script>
   </body>
   </html>
  `;

const Preview: FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 105);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        srcDoc={html}
        sandbox="allow-scripts"
        title="preview"
        ref={iframe}
      ></iframe>
      {error && <div className="preview-error"> {error} </div>}
    </div>
  );
};

export default Preview;

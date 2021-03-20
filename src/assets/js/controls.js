const html2canvas = require("html2canvas");

export const copyToClipboard = (e, item) => {
  e.preventDefault();
  var textField = document.createElement("textarea");
  textField.innerText = `${item}`;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.classList.add("hide");
};

export const downloadQR = async () => {
  const canvas = await html2canvas(document.getElementById("qrbox"));
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "qrcode.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

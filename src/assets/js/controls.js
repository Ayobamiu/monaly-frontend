const html2canvas = require("html2canvas");
const {
  faFacebook,
  faFacebookSquare,
  faInstagramSquare,
  faLinkedin,
  faLinkedinIn,
  faTwitterSquare,
  faWhatsapp,
  faWhatsappSquare,
  faYoutubeSquare,
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} = require("@fortawesome/free-brands-svg-icons");

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

export const socialIcons = [
  {
    name: faFacebookSquare,
    color: "#4267B2",
    type: "Facebook",
    lightIcon: faFacebookF,
  },
  {
    name: faTwitterSquare,
    color: "#1DA1F2",
    type: "Twitter",
    lightIcon: faTwitter,
  },
  {
    name: faWhatsappSquare,
    color: "#25D366",
    type: "WhatsApp",
    lightIcon: faWhatsapp,
  },
  {
    name: faLinkedin,
    color: "#2867B2",
    type: "LinkedIn",
    lightIcon: faLinkedinIn,
  },
  {
    name: faInstagramSquare,
    color: "#C13584",
    type: "Instagram",
    lightIcon: faInstagram,
  },
  {
    name: faYoutubeSquare,
    color: "#FF0000",
    type: "Youtube",
    lightIcon: faYoutube,
  },
];

export const matchLightSocialIcon = (name) => {
  const targertIcon = socialIcons.find((icon) => icon.type === name);
  return targertIcon.lightIcon;
};
export const matchSocialIcon = (name) => {
  const targertIcon = socialIcons.find((icon) => icon.type === name);
  return targertIcon.name;
};
export const matchSocialColor = (name) => {
  const targertIcon = socialIcons.find((icon) => icon.type === name);
  return targertIcon.color;
};

export const checkUserHasSocial = (socialMediaName, userSocials) => {
  const found = userSocials.find(
    (social) =>
      social &&
      social.mediaPlatformSample &&
      social.mediaPlatformSample.name === socialMediaName
  );
  return found ? found.link : found;
};

export const clickThroughRatio = (user) => {
  const viewCount = user.viewCount !== 0 ? user.viewCount : 1; //case where click is > 0 and view is still 0
  const ctratio = user.clickCount / viewCount;
  return Math.ceil(ctratio * 100) || 0;
};

export const siteUrl = "monaly-app.herokuapp.com/";

export function nFormatter(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const getInitialsOnProfile = (user) =>
  user && user.firstName && user.firstName.slice(0, 2).toUpperCase();

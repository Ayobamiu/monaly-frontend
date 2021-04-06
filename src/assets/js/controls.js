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
  const ctratio = user.clickCount / user.viewCount;
  return Math.ceil(ctratio * 100) || 0;
};

export const siteUrl = "monaly-app.herokuapp.com/";

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

export const freePackages = [
  { bold: true, available: true, text: "Add unlimited links" },
  { bold: false, available: true, text: "Add video and image to links⁣" },
  { bold: false, available: true, text: "Add social icons⁣" },
  { bold: false, available: true, text: "Add bio to describe who you are⁣" },
  {
    bold: false,
    available: true,
    text: "Share link with friends using QRCode⁣",
  },
  { bold: false, available: false, text: "Add an e-commerce store ⁣" },
  { bold: false, available: false, text: "Get orders on the App ⁣" },
  { bold: false, available: false, text: "Get payment from customers ⁣" },
  {
    bold: false,
    available: false,
    text: "Link with dispatch riders to deliver your product⁣",
  },
  {
    bold: false,
    available: true,
    text: "Get analytics of total views of your profile⁣",
  },
  {
    bold: false,
    available: true,
    text: "Get analytics of total click of your links⁣",
  },
  {
    bold: false,
    available: true,
    text: "Get visitors to subscribe to your profile⁣",
  },
  {
    bold: false,
    available: true,
    text:
      "Get visitors sign up to receive notification when you add new links ⁣",
  },
];
export const proPackages = [
  { bold: false, available: true, text: "All free packages" },
  { bold: false, available: true, text: "Add multiple monaly accounts⁣" },
  {
    bold: false,
    available: true,
    text: "Get analytics of daily, weekly and monthly views of your profile⁣",
  },
  {
    bold: false,
    available: true,
    text: "Get analytics of daily, weekly and monthly click of your links ⁣",
  },
  {
    bold: false,
    available: true,
    text:
      "Get analytics of countries where your profile is getting attention ⁣",
  },
  {
    bold: false,
    available: true,
    text:
      "Get analytics of devices from which your profile is getting attention ⁣",
  },
  { bold: false, available: true, text: "Download data of analytics ⁣" },
  {
    bold: false,
    available: true,
    text: "Get analytics of clicks on individual links. ⁣",
  },
  {
    bold: false,
    available: true,
    text: "Download and Collect subscribers data",
  },
];

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
  return targertIcon && targertIcon.lightIcon;
};
export const matchSocialIcon = (name) => {
  const targertIcon = socialIcons.find((icon) => icon.type === name);
  return targertIcon && targertIcon.name;
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

export const siteUrl = "https://www.monaly.co/";
export const siteUrlMinusHttps = "monaly.co/";

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

export const exampleNotifications = [
  {
    _id: "0831701skuduo",
    title: "Check analytics of your visitors",
    body:
      "See the number of attention your account is getting. You can see where your lovers are around the world",
    image:
      "https://usman-first-node-app.s3.eu-west-2.amazonaws.com/1618423936679pp.jpg",
    link: "https://www.google.com",
  },
  {
    _id: "0831701skskuduo",
    title: "The new button that will blow your mind",
    body:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur autem cumque aperiam asperiores explicabo, tempora eius distinctio tenetur nam aspernatur quod voluptas harum eveniet placeat, deleniti quo maxime alias voluptatibus.",
    image:
      "https://usman-first-node-app.s3.eu-west-2.amazonaws.com/1618423936679pp.jpg",
    link: "https://www.google.com",
  },
];
export const exampleSubscriptions = [
  {
    _id: "609259720cad263ebcf3cc14",
    startDate: "2021-05-05T08:37:19.336Z",
    endDate: "2021-06-05T08:37:19.336Z",
    user: "606a0bb8ddfb8a45300aafed",
    createdAt: "2021-05-05T08:38:10.355Z",
    updatedAt: "2021-05-05T08:38:10.355Z",
    __v: 0,
  },
  {
    _id: "609259720cad263ebcf3cc14",
    startDate: "2021-04-05T08:37:19.336Z",
    endDate: "2021-05-05T08:37:19.336Z",
    user: "606a0bb8ddfb8a45300aafed",
    createdAt: "2021-05-05T08:38:10.355Z",
    updatedAt: "2021-05-05T08:38:10.355Z",
    __v: 0,
  },
];
export const data1 = [
  {
    foo: "123",
    bar: "456",
    baz: "789",
  },
  {
    foo: "abc",
    bar: "dfg",
    baz: "hij",
  },
  {
    foo: "aaa",
    bar: "bbb",
    baz: "ccc",
  },
];

const data2 = [
  {
    aaa: 1,
    bbb: 2,
    ccc: 3,
  },
  {
    aaa: 4,
    bbb: 5,
    ccc: 6,
  },
];

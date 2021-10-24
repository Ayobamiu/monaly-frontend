import axios from "axios";
export const loadSandBox = async () => {
  const result = await axios.post(
    "https://sandbox.staging.sendbox.co/shipping/shipment_delivery_quote",
    {
      origin_name: "Mrs. Hippo",
      origin_phone: "+2348170441446",
      origin_street: "Clayton St.",
      origin_city: "Ikorodu",
      origin_country: "NIGERIA",
      origin_country_code: "NG",
      origin_state: "Lagos",
      origin_state_code: "LOS",
      destination_name: "Brian",
      destination_phone: "+2348170441446",
      destination_street: "Drydock Ave Suite 610",
      destination_city: "Ikeja",
      destination_country: "NIGERIA",
      destination_country_code: "NG",
      destination_state: "Lagos",
      destination_state_code: "LOS",
      weight: "0.5",
      items: [
        {
          name: "Test Brian Iyoha",
          quantity: "1",
          weight: "1",
          amount: "100",
          value: "120000",
        },
      ],
    },
    {
      headers: {
        Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2MTZkN2YwYTljMjY3ZjAwNDU1MmZmYWYiLCJhaWQiOiI2MTZkN2ZjZTljMjY3ZjAwNDU1MmZmYjQiLCJ0d29fZmEiOmZhbHNlLCJpc3MiOiJzZW5kYm94LmF1dGgiLCJleHAiOjE2Mzk2NjM3MjZ9.YLbKMT2zYp29bwxro3QMAbeaOzZJa9NcVJpdXgGxiNI".trim(),
      },
    }
  );
  console.log("result", result);
};

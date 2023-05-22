import { createContext, useState } from "react";


export const ImageContext = createContext();

export const ImageProvider = ({children}) => {
const [ image, setImage] = useState('');


  const showUploadWidget =
    cloudinary.createUploadWidget(
      {
        cloudName: 'dvogntdp2',
        uploadPreset: 'kysnseyx',
        sources: [
          "local",
          "url",
          "camera",
          "image_search",
          "google_drive",
          "facebook",
          "dropbox",
          "instagram",
          "shutterstock",
          "getty",
          "istock",
          "unsplash",
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#EBA905",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#EBA905",
            action: "#39428D",
            inactiveTabIcon: "#0E165C",
            error: "#F44235",
            inProgress: "#EBA905",
            complete: "#20B832",
            sourceBg: "#FCF7E3",
          },
          fonts: { default: null, "sans-serif": { url: null, active: true } },
        },
      },
      (err, result) => {

        if (!err && result.event === 'success') {
          console.log('esto es result', result)
          setImage(result.info.url);
        }
      }
    );

  const data = { showUploadWidget, image };

  return <ImageContext.Provider value={data}>{children}</ImageContext.Provider>;
};



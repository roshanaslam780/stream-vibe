import Section from "@/layout/Section";
import AvailableDeviceCard from "./AvailableDeviceCard";

const AvailableDevices = () => {
  
  const devicesData = [
    {
      iconName: "bi:phone-fill",
      title: "Smartphones",
      detail:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      iconName: "bi:tablet-fill",
      title: "Tablet",
      detail:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      iconName: "bi:tv-fill",
      title: "Smart TV",
      detail:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      iconName: "bi:laptop-fill",
      title: "Laptops",
      detail:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      iconName: "ph:game-controller-fill",
      title: "Gaming Consoles",
      detail:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
    {
      iconName: "bi:headset-vr",
      title: "VR Headsets",
      detail:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
    },
  ];



  return (
    <Section id="devices">
      <div className="flex flex-col gap-y-10 md:gap-y-12.5 lg:gap-y-15 2xl:gap-y-20">
        <div className="flex items-center justify-start">
          <div className="flex flex-col gap-y-2.5 md:max-w-8/10">
            <h2 className="typo text-2xl font-bold lg:text-[28px] 2xl:text-[38px]">
              We Provide you streaming experience across various devices.
            </h2>
            <p className="body-text">
              With StreamVibe, you can enjoy your favorite movies and TV shows
              anytime, anywhere. Our platform is designed to be compatible with
              a wide range of devices, ensuring that you never miss a moment of
              entertainment.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 2xl:7.5">
          {devicesData.map((device) => (
            <AvailableDeviceCard device={device} key={device.title} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AvailableDevices;

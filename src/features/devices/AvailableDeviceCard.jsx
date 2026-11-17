import { Icon } from "@iconify/react";

const AvailableDeviceCard = ({ device }) => {
  return (
    <div className="bg-dark-06 border border-dark-15 rounded-base 2xl:rounded-xl p-6 lg:p-10 2xl:p-12.5 overflow-hidden relative z-1">
      <div className="absolute inset-0 -z-1 bg-linear-to-bl from-brand-45/10 from-0% to-transparent to-40%"></div>
      <div className="flex flex-col gap-y-5 lg:gap-y-6 2xl:gap-y-7.5">
        <div className="flex items-center justify-start gap-x-2.5 lg:gap-x-3 2xl:gap-x-4">
          <div className="size-11 lg:size-13.5 2xl:size-18 bg-dark-08 flex-center border border-dark-12 rounded-lg lg:rounded-base text-brand-45">
            <Icon
              icon={device.iconName}
              className="size-5 lg:size-6 2xl:size-8.5"
            />
          </div>
          <h3 className="typo text-base lg:text-[20px] 2xl:text-2xl">
            {device.title}
          </h3>
        </div>
        <p className="body-text">{device.detail}</p>
      </div>
    </div>
  );
};

export default AvailableDeviceCard;

import { TbMountainFilled } from "react-icons/tb";
export const Logo = ({fontSize}) => {
  return (
    <div className="logo uppercase font-nerko text-2xl sm:text-3xl flex gap-0.5 items-center">
      <span>
        <TbMountainFilled className={`size-6.5 hidden sm:block`} />
      </span>
      <span className={`text-${fontSize}`}>Traviki</span>
    </div>
  );
};

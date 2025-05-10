import React from "react";

interface CustomIconProps {
  SvgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
  className?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  SvgIcon,
  size = 12,
  color,
  className = "",
}) => {
  return (
    <div style={{ width: size, height: size, color }}>
      <SvgIcon width="100%" height="100%" className={className} />
    </div>
  );
};

export default CustomIcon;

import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";
import "./custom-tooltip.css"; // Import your custom theme CSS

const Tooltip = ({
  content,
  children,
  placement = "top",
  trigger = "mouseenter",
  caret = true,
  maxWidth = 240,
  interactive = true,
  visible,
  width = "w-fit",
  theme = "custom-blue", // Default theme is now custom-blue
}) => {
  const formattedContent = Array.isArray(content) ? (
    <ul className="ps-2 text-[#2D2E33] font-light">
      {content.map((item, index) => (
        <li key={index} className="list-disc">
          {item[0].charAt(0).toUpperCase() + item.slice(1)}
        </li>
      ))}
    </ul>
  ) : (
    <div className={`${width}`}> {content}</div>
  );

  return (
    <Tippy
      content={formattedContent}
      placement={placement}
      theme={theme}
      animation="shift-away"
      trigger={trigger}
      offset={caret ? [0, 10] : [0, 4]}
      arrow={caret}
      maxWidth={maxWidth}
      interactive={interactive}
      visible={visible}
    >
      <div
        role="tooltip"
        aria-label="tooltip"
        aria-controls="tooltip"
        aria-owns="tooltip"
      >
        {children}
      </div>
    </Tippy>
  );
};

export default Tooltip;

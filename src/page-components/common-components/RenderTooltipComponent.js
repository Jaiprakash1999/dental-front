import Tooltip from "./Tooltip";

const STARTING_SUBSTRING_LENGTH = 0;
function RenderTooltipComponent({
  content = "",
  maxLength = 0,
  maxWidth = 300,
}) {
  if (content?.length <= maxLength) {
    return <div>{content || "--"}</div>;
  }
  return (
    <Tooltip maxWidth={maxWidth} interactive placement="top" content={content}>
      <div>{`${content.substring(
        STARTING_SUBSTRING_LENGTH,
        maxLength
      )}...`}</div>
    </Tooltip>
  );
}
export default RenderTooltipComponent;

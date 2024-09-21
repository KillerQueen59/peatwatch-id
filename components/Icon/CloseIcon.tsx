type CloseIconProps = {
  stroke?: string;
};

export const CloseIcon = ({ stroke = "#4B5563" }: CloseIconProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.651521 0.65146C1.12015 0.18283 1.87995 0.18283 2.34858 0.65146L7.50005 5.80293L12.6515 0.65146C13.1202 0.18283 13.8799 0.18283 14.3486 0.65146C14.8172 1.12009 14.8172 1.87989 14.3486 2.34852L9.19711 7.49999L14.3486 12.6515C14.8172 13.1201 14.8172 13.8799 14.3486 14.3485C13.8799 14.8171 13.1202 14.8171 12.6515 14.3485L7.50005 9.19704L2.34858 14.3485C1.87995 14.8171 1.12015 14.8171 0.651521 14.3485C0.182892 13.8799 0.182892 13.1201 0.651521 12.6515L5.80299 7.49999L0.651521 2.34852C0.182892 1.87989 0.182892 1.12009 0.651521 0.65146Z"
        fill={stroke}
      />
    </svg>
  );
};

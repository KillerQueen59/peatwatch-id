const changeTailwindToHex = (color: string) => {
  switch (color) {
    case "bg-indicator-red":
      return "#E51717";
    case "bg-indicator-magenta":
      return "#E91D62";
    case "bg-indicator-purple":
      return "#9C29B2";
    case "bg-indicator-deepPurple":
      return "#663CB5";
    case "bg-indicator-indigo":
      return "#4153B5";
    case "bg-indicator-blue":
      return "#2176F5";
    case "bg-indicator-lightBlue":
      return "#02A9F7";
    case "bg-indicator-cyan":
      return "#01BCD6";
    case "bg-indicator-teal":
      return "#039789";
    case "bg-indicator-green":
      return "#4CB051";
    case "bg-indicator-lightGreen":
      return "#8DC34B";
    case "bg-indicator-lime":
      return "#CBDD38";
    case "bg-indicator-yellow":
      return "#FFE93D";
    case "bg-indicator-amber":
      return "#FCC005";
    case "bg-indicator-grande":
      return "#FF9800";
    case "bg-indicator-deepOrange":
      return "#FE5823";
    case "bg-indicator-brown":
      return "#7B5649";
    case "bg-indicator-grey":
      return "#9E9E9E";
    case "bg-indicator-blueGrey":
      return "#5F7D8C";
    case "bg-indicator-black":
      return "#373232";
    case "bg-primary-50":
      return "#E8EDFB";
    default:
      return "#FFFFFF";
  }
};

export const camel2title = (camelCase: any) =>
  camelCase
    .replace(/([A-Z])/g, (match: any) => ` ${match}`)
    .replace(/^./, (match: any) => match.toUpperCase())
    .trim();

export const numberWithSeparator = (x: any) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const transformColor = (backgroundColor: string[]) => {
  const _background: string[] = [];
  backgroundColor.map((d) => {
    _background.push(changeTailwindToHex(d));
  });
  return _background;
};

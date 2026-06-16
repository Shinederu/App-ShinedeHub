type TitleProps = {
  title: string;
  size: number;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

const Title = (props: TitleProps) => {
  const headingLevel = props.level ?? Math.min(Math.max(Math.round(props.size), 1), 6);
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  const checkSize = () => {
    switch (props.size) {
      case 1:
        return "text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f0f0f0]";
      case 2:
        return "text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f0f0f0]";
      case 3:
        return "text-xl sm:text-2xl font-extrabold tracking-tight text-[#f0f0f0]";
      case 4:
        return "text-lg sm:text-xl font-extrabold tracking-tight text-[#f0f0f0]";
      default:
        return "text-3xl sm:text-4xl font-extrabold tracking-tight text-[#f0f0f0]";
    }
  };

  return (
    <div className="pt-2 pb-3">
      <HeadingTag className={checkSize()}>{props.title}</HeadingTag>
    </div>
  );
};

export default Title;

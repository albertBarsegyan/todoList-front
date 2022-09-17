import SmileIcon from '../icons/smile.icon';

export default function Introduction({ text }: { text: string }) {
  const contentStyle = 'p-5 shadow-md w-1/3 mt-5 ';
  return (
    <>
      <div className={contentStyle}>
        <p className="text-2xl text-center text-purple-500">{text}</p>
      </div>
      <div className={contentStyle}>
        <SmileIcon />
      </div>
    </>
  );
}

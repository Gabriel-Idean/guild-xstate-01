import classnames from 'classnames';

export default function YellowLight({ isActive }: LightProps) {
  return (
    <div
      className={classnames(
        'transition duration-500 ease-in-out rounded-full  w-28 h-28 border-2 border-t-8 border-gray-600 mb-4',
        isActive ? 'bg-yellow-500' : 'bg-gray-500',
      )}
    />
  );
}
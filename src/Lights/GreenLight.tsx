import classnames from 'classnames';

export default function GreenLight({ isActive }: LightProps) {
  return (
    <div
      className={classnames(
        'transition duration-500 ease-in-out rounded-full w-12 md:w-28 h-12 md:h-28 border-2 border-t-8 border-gray-600',
        isActive ? 'bg-green-500' : 'bg-gray-500',
      )}
    />
  );
}

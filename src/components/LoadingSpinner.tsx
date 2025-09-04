
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [

  'pinwheel',

];
const LoadingSpinner = () => (
  <div className="grid h-screen w-full  items-center justify-center gap-8">
    {variants.map((variant) => (
      <div
        className="flex flex-col items-center justify-center gap-4"
        key={variant}
      >
        <Spinner key={variant} variant={variant} className='w-8 h-8' />
        <span className="font-mono text-muted-foreground text-xl">
          {variant}
        </span>
      </div>
    ))}
  </div>
);
export default LoadingSpinner;
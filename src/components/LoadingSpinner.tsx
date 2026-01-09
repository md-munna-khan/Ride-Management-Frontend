
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const LoadingSpinner = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="flex items-center justify-center w-full py-10">
    <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg">
      <Spinner className="w-8 h-8 text-primary" />
      <div className="flex flex-col">
        <span className="font-medium text-sm">{label}</span>
        <span className="text-xs">Please wait a moment</span>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
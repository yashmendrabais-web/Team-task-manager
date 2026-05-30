import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = React.memo(({ fullPage = true, text }) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col items-center justify-center z-50">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-20"></div>
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative" />
        </div>
        {text && <p className="mt-6 text-lg font-medium text-gray-700">{text}</p>}
      </div>
    );
  }
  return <Loader2 className="w-6 h-6 text-blue-600 animate-spin inline-block" />;
});

Loader.displayName = 'Loader';
export default Loader;
export { Loader };


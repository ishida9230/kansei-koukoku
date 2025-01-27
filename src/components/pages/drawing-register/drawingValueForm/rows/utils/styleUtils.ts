export const getFormStyles = (variant: 'form' | 'header', inputClass: string) => {
  const headerInputClass = "w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  const containerClass = variant === 'form' 
    ? "grid grid-cols-4 gap-2" 
    : "flex gap-4";
  
  const currentInputClass = variant === 'form' ? inputClass : headerInputClass;
  const wrapperClass = variant === 'form' ? "" : "w-[120px]";

  return {
    containerClass,
    currentInputClass,
    wrapperClass
  };
}; 
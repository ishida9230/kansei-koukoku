'use client';

interface FormActionButtonsProps {
  isConfirmMode: boolean;
  onConfirm?: (e: React.FormEvent) => void;
  onEdit?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  showConfirmButton?: boolean;
}

export function FormActionButtons({
  isConfirmMode,
  onConfirm,
  onEdit,
  onSubmit,
  showConfirmButton
}: FormActionButtonsProps) {
  return (
    <div className="flex justify-center gap-4 mt-4 pb-2">
      {!isConfirmMode ? (
        <button
          type="button"
          onClick={onConfirm}
          className="px-8 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          確認
        </button>
      ) : (
        <>
          {/* <button
            type="button"
            onClick={onEdit}
            className="px-8 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            修正
          </button> */}
          {showConfirmButton && (
            <button
              type="submit"
              onClick={onSubmit}
            className="px-8 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
              登録
            </button>
          )}
        </>
      )}
    </div>
  );
} 
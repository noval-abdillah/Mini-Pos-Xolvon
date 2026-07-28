export function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[4/3] w-full bg-[#E5E7EB]" />
      <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-[#E5E7EB] rounded w-3/4" />
          <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-[#E5E7EB] rounded w-1/4" />
          <div className="h-8 bg-[#E5E7EB] rounded-lg w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function TransactionSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4"><div className="h-4 bg-[#E5E7EB] rounded w-2/3" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-[#E5E7EB] rounded w-1/2" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-[#E5E7EB] rounded w-1/4" /></td>
      <td className="px-6 py-4"><div className="h-4 bg-[#E5E7EB] rounded w-1/3" /></td>
      <td className="px-6 py-4 text-right"><div className="h-8 bg-[#E5E7EB] rounded-lg w-16 ml-auto" /></td>
    </tr>
  );
}

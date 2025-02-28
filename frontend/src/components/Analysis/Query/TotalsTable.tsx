type TotalsTableProps =  {
    Amounts: Record <string, number>

}
const TotalsTable = ({Amounts}: TotalsTableProps) => {
  const amountsData =  Amounts
  return (
    <div> <table className="w-96 text-sm border-0">
    <thead>
      <tr className="border-b">
        <th className="p-2 border-l-0 text-left">Type</th>
        <th className="p-2 border-r-0 text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(amountsData).reverse().map((entry) => (
        <tr className={`hover:bg-zinc-500 ${entry[0] == "Total" ? "bg-zinc-500 hover:bg-zinc-600" : ""}`} key={entry[0]}>
          <td className="p-2 border-l-0  border-b">{entry[0]}</td>
          <td className="p-2 border-r-0 text-right border-b">
            KES {entry[1].toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table></div>
  )
}

export default TotalsTable
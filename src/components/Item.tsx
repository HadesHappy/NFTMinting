
const Item = ({category, price, amount, limit}: {category: string, price: string, amount: number, limit: string}) => {
  return(
    <div className="border border-gray-500 rounded-xl p-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="px-2 py-1 rounded-md text-green-700 border border-green-700">
            <div className="flex flex-row items-center justify-center">
              {category}
            </div>
          </div>
          <div className="text-sm uppercase">
            ENDED
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="lg:text-lg">Price {price}</div>
          <div className="flex flex-row items-center gap-3">
            <div className="border border-gray-500 rounded-xl px-3 bg-green-700 text-white cursor-pointer">Mint 1</div>
            <div className="border border-gray-500 rounded-xl px-3 bg-green-700 text-white cursor-pointer">Mint 2</div>
          </div>
        </div>
        <div className="text-md">
          {limit}
        </div>
      </div>
    </div>
  )
}

export default Item
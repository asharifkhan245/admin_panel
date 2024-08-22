import React from 'react'

export default function DisableInput({data}) {
  return (
    <div className="w-full md:w-1/2">
      <input
        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-900 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:opacity-50"
        type="email"
        placeholder={data}
        disabled
      ></input>
    </div>
  )
}

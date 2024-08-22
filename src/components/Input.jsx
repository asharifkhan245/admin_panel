import React from 'react'

export default function input({type, placeholder, name , onChange, value}) {
    return (
        <div className="w-full md:w-1/3 p-2" >
            <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3  text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></input>

        </div>
    )
}

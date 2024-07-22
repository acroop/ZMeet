"use client"
import React from 'react'
import { sideBarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

function Sidebar() {
    const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-col gap-6 flex-1'>
            {sideBarLinks.map((svg) => {
                const isActive = pathname === svg.route || pathname.startsWith(`${svg.route}/`)

                return(
                    <Link
                    href={svg.route}
                    key={svg.label}
                    className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                        'bg-blue-1': isActive,
                    })}
                    >
                    <Image 
                    src={svg.imgUrl}
                    alt={svg.label}
                    width="24"
                    height="24"
                    />
                    <p className='text-lg font-semibold max-lg:hidden'>
                    {svg.label}
                    </p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar
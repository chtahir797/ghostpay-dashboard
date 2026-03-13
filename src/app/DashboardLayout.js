import React from 'react'
import Aside from '../components/Aside'
import MobileBottomNav from '../components/MobileBottomNav'

function DashboardLayout({ children }) {
    return (
        <div className='flex min-h-screen bg-[#000] md:flex-row flex-col'>
            {/* Desktop Sidebar - Hidden on mobile, shown at 768px+ */}
            <div className="hidden md:block">
                <Aside />
            </div>
            <main className='flex-grow md:h-screen md:overflow-y-auto pb-[100px] md:pb-0'>{children}</main>
            {/* Mobile Bottom Navigation - Fixed at bottom, shown only below 768px */}
            <MobileBottomNav />
        </div>
    )
}

export default DashboardLayout
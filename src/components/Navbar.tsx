"use client"

import { ClientNavbarContent } from './ClientNavbarContent'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <ClientNavbarContent />
    </nav>
  )
}

export default Navbar

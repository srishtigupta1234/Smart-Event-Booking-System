import React from 'react'

export const Footer = () => {
  return (
    <div>
      <footer className="bg-[#050505] pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="text-3xl font-bold text-white tracking-tighter mb-6">Summitra<span className="text-blue-500">.</span></div>
            <p className="text-gray-400 max-w-sm">Thank you for exploring our world through the lens. Largest 2025 IT Conference in Delaware.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Speakers</a></li>
                <li><a href="#" className="hover:text-white transition">Schedule</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Style Guide</a></li>
                <li><a href="#" className="hover:text-white transition">License</a></li>
                <li><a href="#" className="hover:text-white transition">Changelog</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-sm border-t border-white/10 pt-8">
          © 2025 Summitra Conference. Designed based on Webflow Templates.
        </div>
      </footer>
    </div>
  )
}


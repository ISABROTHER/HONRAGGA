{/* 2. Social Media Block - Tightly packed, now featuring five platforms */}
          <div className="flex space-x-3 flex-shrink-0">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                // *** THIS IS THE IMPLEMENTATION THAT SHOWS THE NAME ON HOVER ***
                title={label} 
                // ***************************************************************
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/80 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
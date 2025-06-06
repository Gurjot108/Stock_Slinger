const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 py-6 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright with subtle gradient */}
          <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium">StockSlinger</span>. All rights
            reserved.
          </p>

          {/* Links with refined hover effects */}
          <div className="flex space-x-6 mt-3 md:mt-0">
            {[
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms of Service", path: "/terms-of-service" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="text-gray-400 hover:text-cyan-400 text-xs font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Optional: Add a subtle disclaimer */}
        <div className="mt-4 text-center md:text-left">
          <p className="text-xs text-gray-500">
            StockSlinger is for informational purposes only and does not
            constitute financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
